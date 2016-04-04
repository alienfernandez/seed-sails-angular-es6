import commonModule from '../../../../commonModule';
import XmppCoreLog from './xmpp-core-log';
import XmppCoreUser from './xmpp-core-user';
import _ from 'lodash';

class XmppCore {

    constructor($chatConstants, localStorageService, XmppCoreEventStrophe, XmppCoreEventJabber, XmppStanza) {
        this._connection = null;
        this._service = null;
        this._user = null;
        this._storage = [];
        this.about = {
            name: $chatConstants.IM_NAME,
            version: $chatConstants.IM_VERSION
        };
        this._options = {
            debug: false,
            disableWindowUnload: false,
            presencePriority: 1,
            resource: this.about.name
        };
        this.jabberEvent = XmppCoreEventJabber;
        this.stropheEvent = XmppCoreEventStrophe;
        this.stanza = XmppStanza;
        this.localStorageService = localStorageService;
        this.$chatConstants = $chatConstants;
    }

    /*ngInject*/
    static instance($chatConstants, localStorageService, XmppCoreEventStrophe, XmppCoreEventJabber) {
        return new XmppCore($chatConstants, localStorageService, XmppCoreEventStrophe, XmppCoreEventJabber);
    }

    init(service, options) {
        this._service = service;
        // Apply options
        angular.extend({}, this._options, options);
        this.log = new XmppCoreLog(this._options.debug);
        this.addNamespaces();
        // Connect to BOSH/Websocket service
        this._connection = new Strophe.Connection(this._service);
        this._connection.rawInput = (data) => {
            console.log("RECV: " + data);
        };
        this._connection.rawOutput = (data) => {
            console.log("SENT: " + data);
        };
        // Window unload handler... works on all browsers but Opera. There is NO workaround.
        // Opera clients getting disconnected 1-2 minutes delayed.
        if (!this._options.disableWindowUnload) {
            window.onbeforeunload = this.onWindowUnload;
        }
    }

    addNamespace(name, value) {
        Strophe.addNamespace(name, value);
    }

    addNamespaces() {
        this.addNamespace("PRIVATE", "jabber:iq:private");
        this.addNamespace("BOOKMARKS", "storage:bookmarks");
        this.addNamespace("PRIVACY", "jabber:iq:privacy");
        this.addNamespace("DELAY", "jabber:x:delay");
    }

    getEscapedJidFromJid(jid) {
        let node = Strophe.getNodeFromJid(jid), domain = Strophe.getDomainFromJid(jid);
        return node ? Strophe.escapeNode(node) + "@" + domain : domain;
    }

    /** Function: rawInput
     * (Overridden from Strophe.Connection.rawInput)
     *
     * Logs all raw input if debug is set to true.
     */
    rawInput(data) {
        this.log("RECV: " + data);
    }

    /** Function rawOutput
     * (Overridden from Strophe.Connection.rawOutput)
     *
     * Logs all raw output if debug is set to true.
     */
    rawOutput(data) {
        this.log("SENT: " + data);
    }

    /** Function: registerEventHandlers
     * Adds listening handlers to the connection.
     *
     * Use with caution from outside of ChatXMPP.
     */
    registerEventHandlers() {
        //this.addHandler(this.jabberEvent.Version, Strophe.NS.VERSION, "iq");
        //this.addHandler(this.jabberEvent.Presence, null, "presence");
        //this.addHandler(this.jabberEvent.Message, null, "message");
        //this.addHandler(this.jabberEvent.Roster, Strophe.NS.ROSTER, 'iq', null, null, null);
    }

    connect(jid, password) {
        // Reset before every connection attempt to make sure reconnections work after authfail, alltabsclosed, ...
        this._connection.reset();
        this._storage = this.getSessionStorageData();
        let xids;
        if (this._storage) {
            xids = this._storage.split("|");
            this.delStorage(this.$chatConstants.SESSION_STORE_DATA);
        }
        this.registerEventHandlers();
        if (jid && password) {
            // authentication
            this._connection.connect(this.getEscapedJidFromJid(jid) + "/" + this._options.resource, password, this.stropheEvent.Connect);
            this._user = new XmppCoreUser(jid, Strophe.getNodeFromJid(jid));
            if (xids) {
                this.attach(xids[0], xids[1], xids[2], this.stropheEvent.Connect);
            }
        }
    }

    /** Function: addHandler
     * Wrapper for Strophe.Connection.addHandler() to add a stanza handler for the connection.
     *
     * Parameters:
     *   (Function) handler - The user callback.
     *   (String) ns - The namespace to match.
     *   (String) name - The stanza name to match.
     *   (String) type - The stanza type attribute to match.
     *   (String) id - The stanza id attribute to match.
     *   (String) from - The stanza from attribute to match.
     *   (String) options - The handler options
     *
     * Returns:
     *   A reference to the handler that can be used to remove it.
     */

    addHandler(handler, ns, name, type, id, from, options) {
        return this._connection.addHandler(handler, ns, name, type, id, from, options);
    }

    /** Function: attach
     * Attach an already binded & connected session to the server
     *
     * _See_ Strophe.Connection.attach
     *
     * Parameters:
     *   (String) jid - Jabber ID
     *   (Integer) sid - Session ID
     *   (Integer) rid - rid
     */
    attach(jid, sid, rid) {
        this.registerEventHandlers();
        this._connection.attach(jid, sid, rid, this.stropheEvent.Connect);
        this.stropheEvent.Connect(Strophe.Status.CONNECTED);
    }

    /** Function: disconnect
     * Leave all rooms and disconnect
     */
    disconnect() {
        if (this._connection.connected) {
            this._connection.disconnect();
        }
    }


    /** Function: getUser
     * Gets current user
     *
     * Returns:
     *   Instance of ChatXMPP.Core.User
     */
    getUser() {
        return this._user;
    }

    /** Function: setUser
     * Set current user. Needed when anonymous login is used, as jid gets retrieved later.
     *
     * Parameters:
     *   (ChatXMPP.Core.User) user - User instance
     */
    setUser(user) {
        this._user = user;
    }

    /** Function: getConnection
     * Gets Strophe connection
     *
     * Returns:
     *   Instance of Strophe.Connection
     */
    getConnection() {
        return this._connection;
    }

    /** Function: getStropheStatus
     * Get the status set by Strophe.
     *
     * Returns:
     *   (Strophe.Status.*) - one of Strophe's statuses
     */
    getStropheStatus() {
        return this._status;
    }

    /** Function: setStropheStatus
     * Set the strophe status
     *
     * Called by:
     *   this.stropheEvent.Connect
     *
     * Parameters:
     *   (Strophe.Status.*) status - Strophe's status
     */
    setStropheStatus(status) {
        this._status = status;
    }

    /** Function: isAnonymousConnection
     * Returns true if <ChatXMPP.Core.connect> was first called with a domain instead of a jid as the first param.
     *
     * Returns:
     *   (Boolean)
     */
    isAnonymousConnection() {
        return this._anonymousConnection;
    }

    setCookie(name, value) {
        var expire = new Date();
        expire.setDate(expire.getDate() + 365);
        document.cookie = name + "=" + value + "; expires=" + expire.toGMTString();
    }

    delStorage(name) {
        this.localStorageService.remove(name);
    }

    getSessionStorageData() {
        return this.localStorageService.get(this.$chatConstants.SESSION_STORE_DATA);
    }

    storeUserData() {
        if (this._connection && this._connection.connected && this._connection.sid && this._connection.rid) {
            this.localStorageService.set(this.$chatConstants.SESSION_STORE_DATA, this._connection.jid + "|" +
                this._connection.sid + "|" + this._connection.rid)
        }
    }

    /** Function: onWindowUnload
     * window.onbeforeunload event which disconnects the client from the Jabber server.
     */
    onWindowUnload() {
        // Enable synchronous requests because Safari doesn't send asynchronous requests within unbeforeunload events.
        // Only works properly when following patch is applied to strophejs: https://github.com/metajack/strophejs/issues/16/#issuecomment-600266
        if (this._connection) {
            this._connection.options.sync = true;
            this.disconnect();
            this._connection.flush();
        }
    }

}

//export default XmppCore;

commonModule.factory('XmppCore', XmppCore.instance);

export default commonModule;