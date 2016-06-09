import securityModule from '../securityModule';

class SecurityController {

    /*ngInject*/
    constructor($state, $window, $location, AuthenticationService, SecurityService, LoadMask, toastr,
                localStorageService, $rootScope, FlashService) {

        this.loadMask = LoadMask;
        this.loadMask.create('loadMaskData', "Espere por favor, autenticando ...", 'body');
        this.authentication = AuthenticationService;
        this.security = SecurityService;
        this.$state = $state;
        this.$window = $window;
        this.toastr = toastr;
        this.$rootScope = $rootScope;
        this.localStorageService = localStorageService;

        // If user is signed in then redirect back home
        var credentials = this.authentication;
        if (credentials && credentials.user) {
            $location.path('/');
            //$state.transitionTo('main');
        }
    }

    signup() {
        this.security.signup(this.credentials)
            .then((response) => {
                let defaultRedirect = response.redirect || 'home';
                // And redirect to the previous or home page
                this.$state.transitionTo(this.$state.previous.state.name || defaultRedirect, this.$state.previous.params);
            })
            .catch((error) => {
                this.error = error.message;
                this.toastr.error(error.message.message, 'Error');
            });
    }

    signin() {
        //Show loading
        this.loadMask.show('#loadMaskData');
        this.security.signin(this.credentials).then((response) => {
            console.log("response", response)
            //    message: "Mensaje de prueba"
            //});
            let defaultRedirect = response.redirect || 'home';
            this.loadMask.hide('#loadMaskData');
            // And redirect to the previous or home page
            this.$state.transitionTo(this.$state.previous.state.name || defaultRedirect, this.$state.previous.params);
        }).catch((error) => {
            console.log("error", error);
            //this.toastr.error(error.message.message, 'Error');
            this.loadMask.hide('#loadMaskData');
        });
    }

    callOauthProvider() {
        let url = '';
        if (this.$state.previous && this.$state.previous.href) {
            url += '?redirect_to=' + encodeURIComponent(this.$state.previous.href);
        }

        // Effectively call OAuth authentication route:
        if (url) {
            this.$window.location.href = url;
        }
    }

}

securityModule.controller('SecurityController', SecurityController);

export default securityModule;
