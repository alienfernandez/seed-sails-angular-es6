import securityModule from '../securityModule';

class PasswordController {

    /*ngInject*/
    constructor($state, $http, $stateParams, $location, AuthenticationService, SecurityService, toastr) {
        this.authentication = AuthenticationService;
        this.user = AuthenticationService.user;
        this.security = SecurityService;
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.toastr = toastr;
        this.$location = $location;

    }

    /**
     * Send email
     */
    askForPasswordReset() {
        this.security.askForPasswordReset(this.credentials)
            .then((response) => {
                this.credentials = null;
                this.success = response.message;
                this.toastr.success(this.success);
            })
            .catch((error) => {
                // Show user error message and clear form
                this.credentials = null;
                this.toastr.error(error.message.message, 'Error');
            });
    }

    /**
     * Reset user password with email params send
     */
    resetUserPassword() {
        this.security.resetUserPassword(this.passwordDetails, '/api/auth/reset/' + this.$stateParams.token)
            .then((response) => {
                this.passwordDetails = null;
                this.toastr.success("Your password was reset successfully.");
                // Attach user profile
                this.authentication.user = response;
                // And redirect to the index page
                this.$state.go('home');
            })
            .catch((response) => {
                this.toastr.error(response.message.message, 'Error');
            });
    }

    /**
     * Change user password (need login)
     */
    changeUserPassword() {
        // If user is signed in then redirect back home
        if (!this.authentication.user) {
            this.$location.path('/');
        }
        this.$http.post('/api/users/password', this.passwordDetails).success(
            (response) => {
                // If successful show success message and clear form
                this.passwordDetails = null;
                this.$state.transitionTo('settings.profile');
                this.toastr.success("Your password was changed successfully.");
            }).error((response) => {
                this.toastr.error(response.message.message, 'Error');
            });
    }

}

securityModule.controller('PasswordController', PasswordController);

export default securityModule;
