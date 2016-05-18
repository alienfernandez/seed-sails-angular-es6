import angular from 'angular';
//Import angular translate (i18n for your Angular app)
import 'angular-translate';
import 'angular-translate-loader-static';
//import 'angular-relative-date';

//Import all module templates
import * as Templates from './templates';

import {commonModule} from 'commons';
//Import config module class
import ChatConfig from './config/chat-config';

let chatModule = angular.module('app.chat', [
    'common', Templates.ChatTpl.name
]).config(($stateProvider, $translateProvider) => {
    //Init module routes
    new ChatConfig($stateProvider, Templates).initModuleRoutes();

    //------------- $translateProvider i18n config ---------------
    //$translateProvider.useStaticFilesLoader({
    //    prefix: 'app/packages/chat/i18n/locale-',
    //    suffix: '.json'
    //});
    //$translateProvider.useLoader('i18nLoader', {
    //    module: 'chat'
    //});
    //-------------------------------------------------------
});

/**
 * Run module
 */
chatModule.run(() => {

});

export default chatModule;
