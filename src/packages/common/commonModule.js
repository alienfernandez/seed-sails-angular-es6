import angular from 'angular';
import Constant from './components/core/Constant';
//Import lodash
import 'ng-lodash';
//import 'focusif';

//Import all module templates
import * as Templates from './templates';

/**
 * Module common
 */
let commonModule = angular.module('common', [
    'ngLodash', Templates.NavBarTpl.name, Templates.AppPanelTpl.name
]);

commonModule.config((localStorageServiceProvider, $appConstants) => {
    //Updating prefix and storage type of localStorage
    localStorageServiceProvider
        .setPrefix($appConstants.local_store.prefix)
        .setStorageType($appConstants.local_store.type.session_storage)
        .setNotify(true, true);
});


//commonModule.run(($http, localStorageService, $appConstants) => {
//
//});

export default commonModule;
