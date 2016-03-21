import securityModule from '../securityModule';

class SecurityService {

    constructor($window, BaseHttpService, AuthenticationService) {
        this.$window = $window;
        this.httpService = BaseHttpService;
        this.authService = AuthenticationService;
        this.serverUri = this.httpService.config.serverUri;
        console.log("serverUri: ", this.serverUri);
    }

    /*ngInject*/
    static instance($window, BaseHttpService, AuthenticationService) {
        return new SecurityService($window, BaseHttpService, AuthenticationService);
    }

    /**
     * Get user data
     * @param credentials
     * @param uri
     * @returns {Promise}
     */
    signup(credentials, uri = '/api/auth/signup') {
        var url = this.serverUri + uri;
        return new Promise((resolve, reject) => {
            this.httpService.post(url, credentials)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Sign in
     * @param credentials
     * @param uri
     * @returns {Promise}
     */
    signin(credentials, uri = '/api/auth/signin') {
        var url = this.serverUri + uri;
        return new Promise((resolve, reject) => {
            this.httpService.post(url, credentials)
                .then((response) => {
                    let identity = this.authService.onIdentity(response);
                    resolve(identity);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    signout() {
        var url = this.serverUri + '/api/auth/signout';
        return new Promise((resolve, reject) => {
            this.httpService.get(url, {})
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    askForPasswordReset(credentials, uri = '/api/auth/forgot') {
        var url = this.serverUri + uri;
        return new Promise((resolve, reject) => {
            this.httpService.post(url, credentials)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Reset user password
     * @param passwordDetails
     * @param uri
     * @returns {Promise}
     */
    resetUserPassword(passwordDetails, uri) {
        var url = this.serverUri + uri;
        return new Promise((resolve, reject) => {
            this.httpService.post(url, passwordDetails)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

securityModule.service('SecurityService', SecurityService.instance);

export default securityModule;
