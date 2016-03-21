import securityModule from '../securityModule';

class AuthenticationService {

    constructor(localStorageService, $http, $cookies) {
        this.localStorageService = localStorageService;
        this._user = null;
        if (localStorageService && localStorageService.get('JWT')) {
            let responseIdentity = {
                token: localStorageService.get('JWT')
            }
            this.onIdentity(responseIdentity);
        } else {
            $http.get('/api/users/me').success((response) => {
                if (!response && $cookies.get('token')) {
                    this.onIdentity({
                        token: $cookies.get('token')
                    });
                    $cookies.remove('token');
                    //$cookies.remove('redirect');
                } else {
                    if (response) {
                        this.onIdentity(response);
                    }
                }
            });
        }

    }

    /*ngInject*/
    static instance(localStorageService, $http, $cookies) {
        return new AuthenticationService(localStorageService, $http, $cookies);
    }

    get user() {
        return this._user;
    }

    set user(pUser) {
        this._user = pUser;
    }

    escape(html) {
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    b64_to_utf8(str) {
        return decodeURIComponent(this.escape(window.atob(str)));
    }

    onIdentity(response) {
        if (!response) return;
        var encodedUser, user, destination;
        if (angular.isDefined(response.token)) {
            this.localStorageService.set('JWT', response.token);
            encodedUser = decodeURI(this.b64_to_utf8(response.token.split('.')[1]));
            user = JSON.parse(encodedUser);
            //console.log("user", user);
        }
        this._user = user || response;
        this.loggedIn = true;
        this.isAdmin = this._user.roles.indexOf('admin') > -1;
        destination = angular.isDefined(response.redirect) ? response.redirect : '';
        return {
            user: this._user,
            redirect: destination
        };

    }

    signOut() {
        this._user = null;
        this.loggedIn = false;
        this.isAdmin = false;
        //Clean JWT user data
        this.localStorageService.remove('JWT');
    }

}

securityModule.service('AuthenticationService', AuthenticationService.instance);

export default securityModule;
