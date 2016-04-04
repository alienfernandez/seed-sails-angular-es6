//import Strophe from 'strophe';
import XmppUtil from '../util/xmpp-util';

class XmppCoreUser {

    constructor(jid, nick, affiliation = "", role = "") {
        /** Constant: ROLE_MODERATOR
         * Moderator role
         */
        this.ROLE_MODERATOR = "moderator";
        /** Constant: AFFILIATION_OWNER
         * Affiliation owner
         */
        this.AFFILIATION_OWNER = "owner";
        /** Object: data
         * User data containing:
         * - jid
         * - nick
         * - affiliation
         * - role
         * - privacyLists
         * - customData to be used by e.g. plugins
         */
        this.data = {
            jid: jid,
            nick: Strophe.unescapeNode(nick),
            affiliation: affiliation,
            role: role,
            privacyLists: {},
            customData: {},
            previousNick: undefined
        };

    }

    set roster(pRoster) {
        this._roster = pRoster;
    }

    get roster() {
        return this._roster;
    }

    /** Function: getJid
     * Gets an unescaped user jid
     *
     * See:
     *   <XmppUtil.unescapeJid>
     *
     * Returns:
     *   (String) - jid
     */
    getJid() {
        if (this.data.jid) {
            return XmppUtil.unescapeJid(this.data.jid);
        }
        return;
    }

    /** Function: getEscapedJid
     * Escapes the user's jid (node & resource get escaped)
     *
     * See:
     *   <XmppUtil.escapeJid>
     *
     * Returns:
     *   (String) - escaped jid
     */
    getEscapedJid() {
        return XmppUtil.escapeJid(this.data.jid);
    }

    /** Function: setJid
     * Sets a user's jid
     *
     * Parameters:
     *   (String) jid - New Jid
     */
    setJid(jid) {
        this.data.jid = jid;
    }

    /** Function: getNick
     * Gets user nick
     *
     * Returns:
     *   (String) - nick
     */
    getNick() {
        return Strophe.unescapeNode(this.data.nick);
    }

    /** Function: setNick
     * Sets a user's nick
     *
     * Parameters:
     *   (String) nick - New nick
     */
    setNick(nick) {
        this.data.nick = nick;
    }

    /** Function: getRole
     * Gets user role
     *
     * Returns:
     *   (String) - role
     */
    getRole() {
        return this.data.role;
    }

    /** Function: getAffiliation
     * Gets user affiliation
     *
     * Returns:
     *   (String) - affiliation
     */
    getAffiliation() {
        return this.data.affiliation;
    }

    /** Function: isModerator
     * Check if user is moderator. Depends on the room.
     *
     * Returns:
     *   (Boolean) - true if user has role moderator or affiliation owner
     */
    isModerator() {
        return this.getRole() === this.ROLE_MODERATOR || this.getAffiliation() === this.AFFILIATION_OWNER;
    }

    /** Function: addToOrRemoveFromPrivacyList
     * Convenience function for adding/removing users from ignore list.
     *
     * Check if user is already in privacy list. If yes, remove it. If no, add it.
     *
     * Parameters:
     *   (String) list - To which privacy list the user should be added / removed from. ChatXMPP supports curently only the "ignore" list.
     *   (String) jid  - User jid to add/remove
     *
     * Returns:
     *   (Array) - Current privacy list.
     */
    addToOrRemoveFromPrivacyList(list, jid) {
        if (!this.data.privacyLists[list]) {
            this.data.privacyLists[list] = [];
        }
        var index = -1;
        if ((index = this.data.privacyLists[list].indexOf(jid)) !== -1) {
            this.data.privacyLists[list].splice(index, 1);
        } else {
            this.data.privacyLists[list].push(jid);
        }
        return this.data.privacyLists[list];
    }

    /** Function: getPrivacyList
     * Returns the privacy list of the listname of the param.
     *
     * Parameters:
     *   (String) list - To which privacy list the user should be added / removed from. ChatXMPP supports curently only the "ignore" list.
     *
     * Returns:
     *   (Array) - Privacy List
     */
    getPrivacyList(list) {
        if (!this.data.privacyLists[list]) {
            this.data.privacyLists[list] = [];
        }
        return this.data.privacyLists[list];
    }

    /** Function: setPrivacyLists
     * Sets privacy lists.
     *
     * Parameters:
     *   (Object) lists - List object
     */
    setPrivacyLists(lists) {
        this.data.privacyLists = lists;
    }

    /** Function: isInPrivacyList
     * Tests if this user ignores the user provided by jid.
     *
     * Parameters:
     *   (String) list - Privacy list
     *   (String) jid  - Jid to test for
     *
     * Returns:
     *   (Boolean)
     */
    isInPrivacyList(list, jid) {
        if (!this.data.privacyLists[list]) {
            return false;
        }
        return this.data.privacyLists[list].indexOf(jid) !== -1;
    }

    /** Function: setCustomData
     * Stores custom data
     *
     * Parameter:
     *   (Object) data - Object containing custom data
     */
    setCustomData(data) {
        this.data.customData = data;
    }

    /** Function: getCustomData
     * Retrieve custom data
     *
     * Returns:
     *   (Object) - Object containing custom data
     */
    getCustomData() {
        return this.data.customData;
    }

    /** Function: setPreviousNick
     * If user has nickname changed, set previous nickname.
     *
     * Parameters:
     *   (String) previousNick - the previous nickname
     */
    setPreviousNick(previousNick) {
        this.data.previousNick = previousNick;
    }

    /** Function: hasNicknameChanged
     * Gets the previous nickname if available.
     *
     * Returns:
     *   (String) - previous nickname
     */
    getPreviousNick() {
        return this.data.previousNick;
    }

}

export default XmppCoreUser;
