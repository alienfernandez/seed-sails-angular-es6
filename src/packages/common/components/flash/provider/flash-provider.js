import commonModule from '../../../commonModule';
//import toastr from 'toastr';

/**
 * @ngdoc provider
 * @name FlashProvider
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Provider flash application
 *
 */
class FlashProvider {

    constructor() {
        this.defaultOptions = {
            autoDismiss: false,
            allowHtml: true,
            closeButton: true,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            closeHtml: '<button>&times;</button>',
            onHidden: null,
            onShown: null,
            onTap: null,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            progressBar: true,
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        };
    }

    getDefaultOptions() {
        return this.defaultOptions;
    }

    /*ngInject*/
    $get(toastr, lodash) {
        let _ = lodash;

        return {

        };
    }
}

commonModule.provider('Flash', FlashProvider);

export default commonModule;
