import commonModule from '../../../commonModule';

class MessageHandlerService {

    /*ngInject*/
    constructor(lodash) {
        this.tplOptions = {
            interpolate: /{{([\s\S]+?)}}/g
        };
        this.lodash = lodash;
    }

    setConfig() {

    }

    getMessage(key, params) {
        let tplCompiled = this.lodash.template(key, this.tplOptions);
        return tplCompiled(params);
    }
}

commonModule.factory('MessageHandler', ['lodash', (lodash) => new MessageHandlerService(lodash)]);

export default commonModule;
