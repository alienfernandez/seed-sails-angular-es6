import commonModule from '../../../commonModule';

/**
 * @ngdoc controller
 * @name DataViewController
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Directive data view
 *
 */
class DataViewController {

    /*ngInject*/
    constructor(lodash) {
        this._ = lodash;
    }
}

commonModule.controller('DataViewController', DataViewController);

export default commonModule;
