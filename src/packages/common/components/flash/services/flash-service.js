import commonModule from '../../../commonModule';

class FlashService {

    /*ngInject*/
    constructor(lodash, toastr, $flashConstants, $rootScope) {
        this.toastr = toastr;
        this.lodash = lodash;
        this.constant = $flashConstants;
        this.$rootScope = $rootScope;
        this.events();
    }

    events() {
        console.log("test events")
        this.$rootScope.$on('message:show', (event, args) => {
            let type = (this.lodash.isObject(args) && args.type) ? args.type : this.constant.MESSAGE_TYPE.INFO.CODE;
            this.showMessage(args, type);
        });
        this.$rootScope.$on('message:clear', (event, args) => {
            this.hideMessage();
        });
    }

    //static instance(lodash, toastr, $flashConstants, $rootScope) {
    //    return new FlashService(lodash, toastr, $flashConstants, $rootScope);
    //}

    showMessage(data, type = this.constant.MESSAGE_TYPE.INFO.CODE) {
        let flashConst = this.constant;
        let title = data.title || flashConst.MESSAGE_TYPE.INFO.NAME;
        let _ = this.lodash;
        let messageStr = (_.isObject(data)) ? data.message : data;
        switch (type) {
            case flashConst.MESSAGE_TYPE.SUCCESS.CODE:
                this.toastr[flashConst.MESSAGE_TYPE.SUCCESS.NAME.toLowerCase()](messageStr, title);
                break;
            case flashConst.MESSAGE_TYPE.INFO.CODE:
                this.toastr[flashConst.MESSAGE_TYPE.INFO.NAME.toLowerCase()](messageStr, title);
                break;
            case flashConst.MESSAGE_TYPE.WARNING.CODE:
                this.toastr[flashConst.MESSAGE_TYPE.WARNING.NAME.toLowerCase()](messageStr, title);
                break;
            case flashConst.MESSAGE_TYPE.ERROR.CODE:
                this.toastr[flashConst.MESSAGE_TYPE.ERROR.NAME.toLowerCase()](messageStr, title);
                break;
        }
    }

    showError(message, title) {
        this.toastr.error(message, title);
    }

    showSuccess(message, title) {
        this.toastr.success(message, title);
    }

    /**
     * Hide messages
     */
    hideMessage() {
        this.toastr.clear()
    }

}

commonModule.factory('FlashService', ['lodash', 'toastr', '$flashConstants', '$rootScope',
    (lodash, toastr, $flashConstants, $rootScope) => new FlashService(lodash, toastr, $flashConstants, $rootScope)]);

export default commonModule;
