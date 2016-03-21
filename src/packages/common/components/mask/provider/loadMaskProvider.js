import commonModule from '../../../commonModule';

/**
 * @ngdoc provider
 * @name LoadMask
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Provider load mask application
 *
 */
class LoadMaskProvider {

    constructor() {

    }

    setDefaultAppendEl(el) {
        this.defaultAppendEl = el;
    }

    /*ngInject*/
    $get($document, $rootScope, lodash, $q, $compile) {
        let _ = lodash;
        let allExecPromises;

        return {
            show: (selector) => {
                if (angular.element(selector)) {
                    angular.element(selector).show();
                }
            },
            hide: (selector) => {
                if (angular.element(selector)) {
                    angular.element(selector).hide();
                }
            },
            create: (id, message, appendEl, promises) => {
                appendEl = appendEl || this.defaultAppendEl;
                var selector = "#" + id;
                var injector = angular.injector(['ng']),
                    template = angular.element('<load-mask id="' + id + '" el="' + appendEl + '" message="' + message + '"></load-mask>');
                var loadMaskExist = $document.find(selector);
                //Check exist mask in DOM
                if (!loadMaskExist.length) {
                    let compileTpl = $compile(template)($rootScope)
                    $document.find(appendEl).prepend(compileTpl);
                }
                //Check finally promise if apply and hide mask
                if (promises) {
                    allExecPromises = promises;
                    allPromises(allExecPromises).finally(function () {
                        hide(selector);
                    });
                }
            },
            setPromises: (promises) => {
                allExecPromises = promises;
            }
        };

        function allPromises(promises) {
            if (_.isArray(promises)) {
                return $q.all(promises);
            }
            return promises;
        }

    }

}

commonModule.provider('LoadMask', LoadMaskProvider);

export default commonModule;
