import commonModule from '../../../../commonModule';
//import XmppCoreService from '../core/xmpp-core';

class ChatXmppFactory {

    constructor(XmppCore) {
        //this.ChatXmppCore = new XmppCoreService($chatConstants, localStorageService);
        this.XmppCore = XmppCore;
    }

    /*ngInject*/
    static instance(XmppCore) {
        return new ChatXmppFactory(XmppCore);
    }

    init(service, options) {
        this.XmppCore.init(service, options);
    }

    getXmppCore() {
        return this.XmppCore;
    }


}

commonModule.factory('ChatXmpp', ChatXmppFactory.instance);

export default commonModule;
