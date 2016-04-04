import commonModule from '../../../../commonModule';
import XmppUtil from '../util/xmpp-util';

let xmppEventJabber;
class XmppCoreEventJabberFactory {

    /*ngInject*/
    constructor($injector) {
        xmppEventJabber = this;
        this.injector = $injector;
        this.log = function (data) {
            console.log(data);
        };
    }

    Version(msg) {
        var coreService = xmppEventJabber.injector.get('XmppCore');
        this.log("[Jabber] Version");
        coreService.stanza.Version($(msg));
        return true;
    }

    Presence(msg) {
        var coreService = xmppEventJabber.injector.get('XmppCore');
        this.log("[Jabber] Presence");
        msg = $(msg);
        /*if (msg.children('x[xmlns^="' + Strophe.NS.MUC + '"]').length > 0) {
         } else {*/
        coreService.stanza.Presence();
        //}
        return true;
    }

    Message(msg) {
        this.log("[Jabber:Room] Message");
        // Room subject
        console.info("msg", msg);
        var roomJid, _message;
        if (msg.children("subject").length > 0) {
            roomJid = XmppUtil.unescapeJid(Strophe.getBareJidFromJid(msg.attr("from")));
            _message = {
                name: Strophe.getNodeFromJid(roomJid),
                body: msg.children("subject").text(),
                type: "subject"
            };
        } else if (msg.attr("type") === "error") {
            var error = msg.children("error");
            if (error.children("text").length > 0) {
                roomJid = msg.attr("from");
                _message = {
                    type: "info",
                    body: error.children("text").text()
                };
            }
        } else if (msg.children("body").length > 0) {
            // Private chat message
            if (msg.attr("type") === "chat" || msg.attr("type") === "normal") {
                roomJid = XmppUtil.unescapeJid(msg.attr("from"));
                var bareRoomJid = Strophe.getBareJidFromJid(roomJid), // if a 3rd-party client sends a direct message to this user (not via the room) then the username is the node and not the resource.
                    _message = {
                        name: name,
                        body: msg.children("body").text(),
                        type: msg.attr("type"),
                        isNoConferenceRoomJid: isNoConferenceRoomJid
                    };
            } else {
                roomJid = XmppUtil.unescapeJid(Strophe.getBareJidFromJid(msg.attr("from")));
                var resource = Strophe.getResourceFromJid(msg.attr("from"));
                // Message from a user
                if (resource) {
                    resource = Strophe.unescapeNode(resource);
                    _message = {
                        name: resource,
                        body: msg.children("body").text(),
                        type: msg.attr("type")
                    };
                } else {
                    // we are not yet present in the room, let's just drop this message (issue #105)
                    //if (!ChatXMPP.View.Pane.Chat.rooms[msg.attr("from")]) {
                    //    return true;
                    //}
                    _message = {
                        name: "",
                        body: msg.children("body").text(),
                        type: "info"
                    };
                }
            }
        } else {
            return true;
        }
        // besides the delayed delivery (XEP-0203), there exists also XEP-0091 which is the legacy delayed delivery.
        // the x[xmlns=jabber:x:delay] is the format in XEP-0091.
        let delay = msg.children("delay") ? msg.children("delay") : msg.children('x[xmlns="' + Strophe.NS.DELAY + '"]'), timestamp = delay !== undefined ? delay.attr("stamp") : null;

        //TODO Ejecutar un evento para cuando entre un mensaje
        return true;
    }

}

commonModule.factory('XmppCoreEventJabber', ['$injector', ($injector) => new XmppCoreEventJabberFactory($injector)]);

