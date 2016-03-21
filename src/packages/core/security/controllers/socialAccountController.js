import securityModule from '../securityModule';

class SocialAccountController {

    /*ngInject*/
    constructor($location, AuthenticationService, UserService, $http) {
        this.authentication = AuthenticationService;
        this.UserService = UserService;
        this.$http = $http;
        this.user = this.authentication.user;
        this.imageURL = this.user.profileImageURL;
        // If user is signed in then redirect back home
        if (!this.authentication.user) {
            $location.path('/');
        }
    }

    hasConnectedAdditionalSocialAccounts() {
        for (var i in this.user.additionalProvidersData) {
            return true;
        }
        return false;
    }

    /**
     * Check if provider is already in use with current user
     * @param provider
     * @returns {boolean|UserSchema.additionalProvidersData|{}|*}
     */
    isConnectedSocialAccount(provider) {
        return this.user.provider === provider || (this.user.additionalProvidersData && this.user.additionalProvidersData[provider]);
    }

    /**
     * Remove a user social account
     * @param provider
     */
    removeUserSocialAccount(provider) {
        this.$http.delete('/api/users/accounts', {
            params: {
                provider: provider
            }
        }).success((response) => {
            // If successful show success message and clear form
            this.success = true;
            $scope.user = Authentication.user = response;
        }).error((response) => {
            this.error = response.message;
        });
    }

}

securityModule.controller('SocialAccountController', SocialAccountController);

export default securityModule;
