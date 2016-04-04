class ImRoster {

    constructor() {
        this.roster = {};
        this.groups = {};
        this.changes = [];
    }

    /** Function: addContact
     *
     *  Adds given contact to roster
     *
     *  Parameters:
     *    (String) jid - bare jid
     *    (String) subscription - subscription attribute for contact
     *    (String) name - name attribute for contact
     *    (Array) groups - array of groups contact is member of
     */
    addContact(jid, subscription, name, groups) {
        var contact = {jid: jid, subscription: subscription, name: name, groups: groups}
        var jid_lower = jid.toLowerCase();
        if (this.roster[jid_lower]) {
            this.roster[jid_lower]['contact'] = contact;
        } else {
            this.roster[jid_lower] = {contact: contact};
        }
        groups = groups ? groups : [''];
        for (var g = 0; g < groups.length; g++) {
            if (!this.groups[groups[g]]) {
                this.groups[groups[g]] = {};
            }
            this.groups[groups[g]][jid_lower] = jid_lower;
        }
    }

    /** Function: getContact
     *
     *  Returns contact entry for given jid
     *
     *  Parameter: (String) jid - jid to return
     */
    getContact(jid) {
        if (this.roster[jid.toLowerCase()]) {
            return this.roster[jid.toLowerCase()]['contact'];
        }
    }

    /** Function: setPresence
     *
     *  Sets presence
     *
     *  Parameters:
     *    (String) fulljid: full jid with presence
     *    (Integer) priority: priority attribute from presence
     *    (String) show: show attribute from presence
     *    (String) status: status attribute from presence
     */
    setPresence(fulljid, priority, show, status) {
        var barejid = Strophe.getBareJidFromJid(fulljid);
        var resource = Strophe.getResourceFromJid(fulljid);
        var jid_lower = barejid.toLowerCase();
        if (show != 'unavailable') {
            if (!this.roster[jid_lower]) {
                this.addContact(barejid, 'not-in-roster');
            }
            var presence = {
                resource: resource, priority: priority, show: show, status: status
            }
            if (!this.roster[jid_lower]['presence']) {
                this.roster[jid_lower]['presence'] = {}
            }
            this.roster[jid_lower]['presence'][resource] = presence
        } else if (this.roster[jid_lower] && this.roster[jid_lower]['presence']
            && this.roster[jid_lower]['presence'][resource]) {
            delete this.roster[jid_lower]['presence'][resource];
        }
        this.addChange(jid_lower);
        //if (TrophyIM.activeChats['divs'][jid_lower]) {
        //    TrophyIM.setTabPresence(jid_lower,
        //        TrophyIM.activeChats['divs'][jid_lower]['tab']);
        //}
    }

    /** Function: addChange
     *
     *  Adds given jid to this.changes, keeping this.changes sorted and
     *  preventing duplicates.
     *
     *  Parameters
     *    (String) jid : jid to add to this.changes
     */
    addChange(jid) {
        for (var c = 0; c < this.changes.length; c++) {
            if (this.changes[c] == jid) {
                return;
            }
        }
        this.changes[this.changes.length] = jid;
        this.changes.sort();
    }

    /** Function: getPresence
     *
     *  Returns best presence for given jid as Array(resource, priority, show,
     *  status)
     *
     *  Parameter: (String) fulljid - jid to return best presence for
     */
    getPresence(fulljid) {
        var jid = Strophe.getBareJidFromJid(fulljid);
        var current = null;
        if (this.roster[jid.toLowerCase()] &&
            this.roster[jid.toLowerCase()]['presence']) {
            for (var resource in this.roster[jid.toLowerCase()]['presence']) {
                var presence = this.roster[jid.toLowerCase()]['presence'][resource];
                if (current == null) {
                    current = presence;
                } else {
                    if (presence['priority'] > current['priority'] && ((presence['show'] == "chat"
                        || presence['show'] == "available") || (current['show'] != "chat" ||
                        current['show'] != "available"))) {
                        current = presence;
                    }
                }
            }
        }
        return current;
    }

    /** Function: groupHasChanges
     *
     *  Returns true if current group has members in this.changes
     *
     *  Parameters:
     *    (String) group - name of group to check
     */
    groupHasChanges(group) {
        for (var c = 0; c < this.changes.length; c++) {
            if (this.groups[group][this.changes[c]]) {
                return true;
            }
        }
        return false;
    }

    /** Fuction: save
     *
     *  Saves roster data to JSON store
     */
    save() {
        //if (TrophyIM.JSONStore.store_working) {
        //    TrophyIM.JSONStore.setData({
        //        roster: this.roster,
        //        groups: this.groups, active_chat: TrophyIM.activeChats['current'],
        //        chat_history: TrophyIM.chatHistory
        //    });
        //}
    }
}

export default ImRoster;
