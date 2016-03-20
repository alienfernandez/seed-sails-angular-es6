import commonModule from '../../../commonModule';

/**
 * @ngdoc factory
 * @name DataViewApi
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Factory data view
 *
 */
class DataViewApiFactory {

    constructor(DataView) {
        this.dataView = DataView;
        console.log("DataView", DataView);

    }

    /*ngInject*/
    static instance(DataView) {
        return new DataViewApiFactory(DataView);
    }

    deselect (records) {

    }

    select (index) {
        //this.dataView
    }
}

commonModule.factory('DataViewApi', DataViewApiFactory.instance);

export default commonModule;
