//import Strophe from 'strophe';

class XmppUtil {

    constructor() {
        this.ie();
    }

    static jidToId(jid) {
        return MD5.hexdigest(jid);
    }

    static escapeJid(jid) {
        var node = Strophe.escapeNode(Strophe.getNodeFromJid(jid)), domain = Strophe.getDomainFromJid(jid), resource = Strophe.getResourceFromJid(jid);
        jid = node + "@" + domain;
        if (resource) {
            jid += "/" + resource;
        }
        return jid;
    }


    static unescapeJid(jid) {
        var node = Strophe.unescapeNode(Strophe.getNodeFromJid(jid)), domain = Strophe.getDomainFromJid(jid), resource = Strophe.getResourceFromJid(jid);
        jid = node + "@" + domain;
        if (resource) {
            jid += "/" + resource;
        }
        return jid;
    }


    static crop(str, len) {
        if (str.length > len) {
            str = str.substr(0, len - 3) + "...";
        }
        return str;
    }


    static setCookie(name, value, lifetime_days) {
        var exp = new Date();
        exp.setDate(new Date().getDate() + lifetime_days);
        document.cookie = name + "=" + value + ";expires=" + exp.toUTCString() + ";path=/";
    }


    static cookieExists(name) {
        return document.cookie.indexOf(name) > -1;
    }


    static getCookie(name) {
        if (document.cookie) {
            var regex = new RegExp(escape(name) + "=([^;]*)", "gm"), matches = regex.exec(document.cookie);
            if (matches) {
                return matches[1];
            }
        }
    }

    static deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/";
    }

    ie() {
        var undef, v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i");
        while (// adds innerhtml and continues as long as all[0] is truthy
            div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->", all[0]) {
        }
        return v > 4 ? v : undef;
    }
}

export default XmppUtil;
