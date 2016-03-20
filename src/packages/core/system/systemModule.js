import angular from 'angular';
//import {commonModule} from 'commons';

//Import all module templates
import * as Templates from './templates';
console.log("Templates", Templates);
//Import config module class
import SystemConfig from './config/system-config';

let systemModule = angular.module("app.system", [
    Templates.Template400.name, Templates.Template403.name, Templates.Template404.name,
    Templates.HomeTemplate.name
]);

systemModule.config(($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) => {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('AuthInterceptor');
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
        $injector.get('$state').transitionTo('not-found', null, {
            location: false
        });
    });
    //Init module routes
    new SystemConfig($stateProvider, Templates).initModuleRoutes();

});
//
//systemModule.run(($rootScope, $state, AuthenticationService, $cookies) => {
//    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
//            var allowed = false;
//            toState.data.roles.forEach(function (role) {
//                if (AuthenticationService.user && AuthenticationService.user.roles !== undefined &&
//                    AuthenticationService.user.roles.indexOf(role) !== -1) {
//                    allowed = true;
//                    return true;
//                }
//            });
//            if (!allowed) {
//                event.preventDefault();
//                if (AuthenticationService.user && AuthenticationService.user._id) {
//                    $state.go('forbidden');
//                } else {
//                    //console.log("$cookies", $cookies);
//                    $state.go('authentication.signin').then(function () {
//                        storePreviousState(toState, toParams);
//                    });
//                }
//            }
//        }
//    });
//
//    // Record previous state
//    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//        storePreviousState(fromState, fromParams);
//    });
//
//    // Store previous state
//    function storePreviousState(state, params) {
//        // only store this state if it shouldn't be ignored
//        if (!state.data || !state.data.ignoreState) {
//            $state.previous = {
//                state: state,
//                params: params,
//                href: $state.href(state, params)
//            };
//        }
//    }
//});

export default systemModule;
