import commonModule from '../../../../commonModule';
import ImRoster from '../roster/im-roster';

let xmppEventStrophe;
class XmppCoreEventStropheFactory {

    /*ngInject*/
    constructor($injector, $rootScope, $timeout, ChatBoxes) {
        xmppEventStrophe = this;
        this.injector = $injector;
        this.$rootScope = $rootScope;
        this.ChatBoxes = ChatBoxes;
        this.$timeout = $timeout;
        //this.coreService = $injector.get('XmppCore');
    }

    Connect(status) {
        var coreService = xmppEventStrophe.injector.get('XmppCore')
        xmppEventStrophe.coreService = coreService;
        coreService.setStropheStatus(status);
        switch (status) {
            case Strophe.Status.CONNECTED:
                console.log("[Connection] Connected");
                coreService.storeUserData();
                coreService._connection.addHandler(xmppEventStrophe.onVersion, Strophe.NS.VERSION, 'iq', null, null, null);
                coreService._connection.addHandler(xmppEventStrophe.onRoster, Strophe.NS.ROSTER, 'iq', null, null, null);
                coreService._connection.addHandler(xmppEventStrophe.onMessage, null, 'message', null, null, null);
                //Get roster then announce presence.
                coreService._connection.send($iq({type: 'get', xmlns: Strophe.NS.CLIENT}).c(
                    'query', {xmlns: Strophe.NS.ROSTER}).tree());
                coreService._connection.send($pres().tree());
                break;

            case Strophe.Status.ATTACHED:
                console.log("[Connection] Attached");
                coreService.stanza.Presence();
                break;

            case Strophe.Status.DISCONNECTED:
                console.log("[Connection] Disconnected");
                break;

            case Strophe.Status.AUTHFAIL:
                console.log("[Connection] Authentication failed");
                break;

            case Strophe.Status.CONNECTING:
                console.log("[Connection] Connecting");
                break;

            case Strophe.Status.DISCONNECTING:
                console.log("[Connection] Disconnecting");
                break;

            case Strophe.Status.AUTHENTICATING:
                console.log("[Connection] Authenticating");
                break;

            case Strophe.Status.ERROR:
            case Strophe.Status.CONNFAIL:
                console.log("[Connection] Failed (" + status + ")");
                break;

            default:
                console.log("[Connection] What?!");
                break;
        }
    }

    /** Function: onVersion
     *
     *  jabber:iq:version query handler
     */
    onVersion(msg) {
        console.log("On version:", msg);
        Strophe.debug("Version handler");
        if (msg.getAttribute('type') == 'get') {
            var from = msg.getAttribute('from');
            var to = msg.getAttribute('to');
            var id = msg.getAttribute('id');
            var reply = $iq({type: 'result', to: from, from: to, id: id}).c('query',
                {
                    name: "ChatXmpp", version: "1.0", os: "Javascript-capable browser"
                });
            xmppEventStrophe.coreService._connection.send(reply.tree());
        }
        return true;
    }

    /** Function: onRoster
     *
     *  Roster iq handler
     */
    onRoster(msg) {
        Strophe.debug("Roster handler");
        let roster_items = msg.firstChild.getElementsByTagName('item');
        let roster = new ImRoster();
        console.log("msg", msg);
        //$(msg).find('item').each(function (index, item) {
        //    console.log("item", item);
        //})
        for (var i = 0; i < roster_items.length; i++) {
            var groups = roster_items[i].getElementsByTagName('group');
            var group_array = [];
            for (var g = 0; g < groups.length; g++) {
                group_array[group_array.length] = groups[g].firstChild.nodeValue;
            }
            roster.addContact(roster_items[i].getAttribute('jid'),
                roster_items[i].getAttribute('subscription'),
                roster_items[i].getAttribute('name'), group_array);
        }
        xmppEventStrophe.coreService._user.roster = roster;
        if (msg.getAttribute('type') == 'set') {
            xmppEventStrophe.coreService._connection.send($iq({
                type: 'reply', id: msg.getAttribute('id'), to: msg.getAttribute('from')
            }).tree());
        }
        xmppEventStrophe.coreService._connection.addHandler(xmppEventStrophe.onPresence, null, 'presence', null, null, null);
        xmppEventStrophe.$rootScope.$broadcast('onRoster', {
            roster: roster
        });

        return true;
    }

    /** Function: onPresence
     *
     *  Presence handler
     */
    onPresence(msg) {
        Strophe.debug("Presence handler");
        console.log("msg presence", msg);
        var type = msg.getAttribute('type') ? msg.getAttribute('type') : 'available';
        var show = msg.getElementsByTagName('show').length ? Strophe.getText(msg.getElementsByTagName('show')[0]) : type;
        var status = msg.getElementsByTagName('status').length ? Strophe.getText(msg.getElementsByTagName('status')[0]) : '';
        var priority = msg.getElementsByTagName('priority').length ? parseInt(Strophe.getText(msg.getElementsByTagName('priority')[0])) : 0;
        let from = msg.getAttribute('from');
        xmppEventStrophe.coreService._user.roster.setPresence(from, priority, show, status);
        xmppEventStrophe.$rootScope.$broadcast('onPresence', {
            from: from,
            status: status,
            show: show
        });
        return true;
    }

    /** Function: onMessage
     *
     *  Message handler
     */
    onMessage(msg) {
        Strophe.debug("Message handler");
        let from = msg.getAttribute('from');
        let type = msg.getAttribute('type');
        let elems = msg.getElementsByTagName('body');
        let message = "";
        let user = xmppEventStrophe.coreService._user;
        if ((type == 'chat' || type == 'normal') && elems.length > 0) {
            var barejid = Strophe.getBareJidFromJid(from);
            var jid_lower = barejid.toLowerCase();
            var contact = user.roster.roster[barejid.toLowerCase()]['contact'];
            //console.log("contact", contact);
            if (contact) { //Do we know you?
                message += Strophe.getText(elems[0]);
                xmppEventStrophe.makeChat(from); //Make sure we have a chat window
                xmppEventStrophe.$timeout(() => {
                    xmppEventStrophe.addMessage(message, jid_lower, contact.name || jid_lower);

                }, 50);
            }
        }
        return true;
    }

    makeChat(fullJid) {
        let jid = fullJid.split('/');
        xmppEventStrophe.ChatBoxes.create(jid[0]);
    }

    addMessage(message, jid_lower, from) {
        let id = jid_lower.replace('@', '_');
        let chatbox = xmppEventStrophe.ChatBoxes.getChatBoxByTitle(id);
        xmppEventStrophe.ChatBoxes.addMessage(from, message, chatbox, 'right');
    }

}

commonModule.factory('XmppCoreEventStrophe', ['$injector', '$rootScope', '$timeout', 'ChatBoxes',
    ($injector, $rootScope, $timeout, ChatBoxes) => new XmppCoreEventStropheFactory($injector, $rootScope, $timeout, ChatBoxes)]);

export default commonModule;
