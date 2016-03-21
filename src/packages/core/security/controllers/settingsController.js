import securityModule from '../securityModule';

class SettingsController {

    /*ngInject*/
    constructor($location, AuthenticationService) {
        this.authentication = AuthenticationService;
        this.user = this.authentication.user;

        // If user is signed in then redirect back home
        if (this.authentication.user) {
            $location.path('/');
        }
    }
}

securityModule.controller('SettingsController', SettingsController);

export default securityModule;
