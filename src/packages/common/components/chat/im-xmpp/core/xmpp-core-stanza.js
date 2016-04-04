import commonModule from '../../../../commonModule';
import XmppUtil from '../util/xmpp-util';

let xmppStanza;
class XmppStanzaFactory {

    constructor($injector) {
        xmppStanza = this;
        this.$injector = $injector;
        this.coreService = xmppStanza.injector.get('XmppCore');
    }

    /*ngInject*/
    static instance($injector) {
        return new XmppStanzaFactory($injector);
    }

    Version(msg) {
        this.coreService.getConnection().send($iq({
            type: "result",
            to: XmppUtil.escapeJid(msg.attr("from")),
            from: XmppUtil.escapeJid(msg.attr("to")),
            id: msg.attr("id")
        }).c("query", {
            name: this.coreService.about.name,
            version: this.coreService.about.version,
            os: navigator.userAgent
        }));
    }

    /** Function: Roster
     * Sends a request for a roster
     */
    Roster() {
        this.coreService.getConnection().send($iq({
            type: "get",
            xmlns: Strophe.NS.CLIENT
        }).c("query", {
            xmlns: Strophe.NS.ROSTER
        }).tree());
    }

    /** Function: Presence
     * Sends a request for presence
     *
     * Parameters:
     *   (Object) attr - Optional attributes
     *   (Strophe.Builder) el - Optional element to include in presence stanza
     */
    Presence(attr, el) {
        this.coreService.getConnection().send($iq({
            type: 'get',
            xmlns: Strophe.NS.CLIENT
        }).c('query', {xmlns: Strophe.NS.ROSTER}).tree());
        this.coreService.getConnection().send($pres().tree());
        /*var pres = $pres(attr).c("priority").t(this.coreService.getOptions().presencePriority.toString()).up().c("c", this.coreService.getConnection().caps.generateCapsAttrs()).up();
         if (el) {
         pres.node.appendChild(el.node);
         }
         this.coreService.getConnection().send(pres.tree());*/
    }

    /** Function: Services
     * Sends a request for disco items
     */
    Services() {
        this.coreService.getConnection().send($iq({
            type: "get",
            xmlns: Strophe.NS.CLIENT
        }).c("query", {
            xmlns: Strophe.NS.DISCO_ITEMS
        }).tree());
    }

    sendMessage(to, msg, type) {
        // Trim message
        msg = $.trim(msg);
        if (msg === "") {
            return false;
        }
        this.coreService.getConnection().send($msg({
            to: to,
            from: this.coreService.getConnection().jid,
            type: 'chat'
        }).c('body').t(msg).tree());
        return true;
    }


    /** Function: GetIgnoreList
     * Get existing ignore privacy list when connecting.
     */
    GetIgnoreList() {
        //var iq = $iq({
        //    type: "get",
        //    from: this.coreService.getUser().getEscapedJid()
        //}).c("query", {
        //    xmlns: Strophe.NS.PRIVACY
        //}).c("list", {
        //    name: "ignore"
        //}).tree();
        //var iqId = this.coreService.getConnection().sendIQ(iq);
        //// add handler (<#200 at https://github.com/ChatXMPP-chat/ChatXMPP/issues/200>)
        //this.coreService.addHandler(this.coreService.Event.Jabber.PrivacyList, null, "iq", null, iqId);
    }

    /** Function: UpdatePrivacyList
     * Updates privacy list according to the privacylist in the currentUser
     */
    UpdatePrivacyList() {
        //var currentUser = this.coreService.getUser(),
        //    iq = $iq({
        //        type: "set",
        //        from: currentUser.getEscapedJid()
        //    }).c("query", {
        //        xmlns: "jabber:iq:privacy"
        //    }).c("list", {
        //        name: "ignore"
        //    }),
        //    privacyList = currentUser.getPrivacyList("ignore");
        //if (privacyList.length > 0) {
        //    $.each(privacyList, function (index, jid) {
        //        iq.c("item", {
        //            type: "jid",
        //            value: ChatXMPP.Util.escapeJid(jid),
        //            action: "deny",
        //            order: index
        //        }).c("message").up().up();
        //    });
        //} else {
        //    iq.c("item", {
        //        action: "allow",
        //        order: "0"
        //    });
        //}
        //this.coreService.getConnection().sendIQ(iq.tree());
    }

}

commonModule.factory('XmppStanza', XmppStanzaFactory.instance);
