/**
 * Module config
 */
class SecurityConfig {

    constructor($stateProvider, Templates) {
        this.$stateProvider = $stateProvider;
        this.Templates = Templates;
    }

    /**
     * Set state provider
     * @param stateProvider
     */
    setStateProvider(stateProvider) {
        this.$stateProvider = stateProvider;
    }

    /**
     * Init module routes
     */
    initModuleRoutes() {
        this.$stateProvider.state('authentication', {
            abstract: true,
            template: '<ui-view/>'
        }).state('authentication.signin', {
            url: '/signin?err',
            controller: 'SecurityController',
            controllerAs: 'secCtrl',
            templateUrl: this.Templates.SigninTpl.name
        }).state('authentication.signup', {
            url: '/signup',
            controller: 'SecurityController',
            controllerAs: 'secCtrl',
            templateUrl: this.Templates.SignupTpl.name
        }).state('useradd', {
            url: '/users/create',
            controller: 'UserController',
            controllerAs: 'userCtrl',
            templateUrl: this.Templates.AddUserTpl.name,
            data: {
                roles: ['user', 'admin']
            }
        }).state('userlist', {
            url: '/users/list',
            controller: 'UserController',
            controllerAs: 'userCtrl',
            templateUrl: this.Templates.UserListTpl.name,
            data: {
                roles: ['user', 'admin']
            }
        }).state('useredit', {
            url: '/users/edit/:userId',
            controller: 'UserController',
            controllerAs: 'userCtrl',
            templateUrl: this.Templates.UserEditTpl.name,
            data: {
                roles: ['user', 'admin']
            }
        }).state('settings', {
            abstract: true,
            url: '/settings',
            templateUrl: this.Templates.UserSettingsTpl.name,
            controller: 'ProfileController',
            controllerAs: 'profileCtrl',
            data: {
                roles: ['user', 'admin']
            }
        }).state('settings.profile', {
            url: '/profile',
            templateUrl: this.Templates.UserProfileTpl.name,
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
        }).state('settings.password', {
            url: '/password',
            templateUrl: this.Templates.ChangePasswordTpl.name,
            controller: 'PasswordController',
            controllerAs: 'passwordCtrl'
        }).state('settings.accounts', {
            url: '/accounts',
            templateUrl: this.Templates.SocialAccountTpl.name,
            controller: 'SocialAccountController', //TODO change controller
            controllerAs: 'socialCtrl'
        }).state('settings.picture', {
            url: '/picture',
            templateUrl: this.Templates.ChangePictureTpl.name,
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
        }).state('password', {
            abstract: true,
            url: '/password',
            template: '<ui-view/>',
            controller: 'PasswordController',
            controllerAs: 'passwordCtrl',
        }).state('password.forgot', {
            url: '/forgot',
            templateUrl: this.Templates.ForgotPasswordTpl.name,
            controller: 'PasswordController',
            controllerAs: 'passwordCtrl'
        }).state('password.reset', {
            abstract: true,
            url: '/reset',
            template: '<ui-view/>'
        }).state('password.reset.form', {
            url: '/:token',
            templateUrl: this.Templates.ResetPasswordTpl.name,
            controller: 'PasswordController',
            controllerAs: 'passwordCtrl'
        });
    }
}

export default SecurityConfig;
