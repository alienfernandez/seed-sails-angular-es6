import securityModule from '../securityModule';

class UserController {

    /*ngInject*/
    constructor($state, $window, $stateParams, $location, AuthenticationService, UserService, toastr) {
        this.authentication = AuthenticationService;
        this.userInstance = UserService;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$location = $location;
        this.$window = $window;
        this.toastr = toastr;
    }

    /**
     * Find all user
     */
    find() {
        this.users = this.userInstance.query();
    }

    /**
     * Find existing Article
     */
    findOne() {
        this.user = this.userInstance.get({
            userId: this.$stateParams.userId
        });
    }

    edit(user) {
        this.$state.transitionTo('useredit', user);
    }

    /**
     * Remove user
     * @param user
     */
    remove(user) {
        if (confirm('Are you sure you want to delete this user?')) {
            if (user) {
                user.$remove();

                this.users.splice(this.users.indexOf(user), 1);
            } else {
                this.user.$remove(() => {
                    this.$state.go('userlist');
                });
            }
        }
    }

    /**
     * Create new user
     */
    create() {
        this.user.provider = "local";
        var user = new this.userInstance(this.user);
        // Redirect after save
        user.$save((response) => {
            this.$state.transitionTo('userlist');
        }, (errorResponse) => {
            console.log("errorResponse", errorResponse);
            this.toastr.error(errorResponse.data.message, 'Error');
        });
    }

    /**
     * Update user
     */
    update() {
        this.user.$update(() => {
            this.$state.go('userlist');
        }, (errorResponse) => {
            this.toastr.error(errorResponse.data.message, 'Error');
        });
    }


}

securityModule.controller('UserController', UserController);

export default securityModule;
