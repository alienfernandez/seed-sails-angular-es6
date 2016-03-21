import securityModule from '../securityModule';

class ProfileController {

    /*ngInject*/
    constructor($location, $state, AuthenticationService, UserService, Upload, toastr, lodash) {
        this.authentication = AuthenticationService;
        this.UserService = UserService;
        this.Upload = Upload;
        //this.user = this.authentication.user;
        this.findUser(this.authentication.user._id);
        this.imageURL = this.authentication.user.profileImageURL;
        this.$state = $state;
        this.toastr = toastr;
        this._ = lodash;
        // If user is signed in then redirect back home
        if (!this.authentication.user) {
            $location.path('/');
        }
    }

    findUser(userId) {
        this.user = this.UserService.get({
            userId: userId
        });
    }

    /**
     * Update a user profile
     */
    updateUserProfile() {
        console.log("this.user1", this._.clone(this.user));
        this.user.$update((response) => {
            console.log("response", response);
            this.authentication.user = response;
            this.toastr.success('Profile updated correctly.');
            this.$state.reload();
        }, (response) => {
            this.error = response.data.message;
            this.toastr.error('Error: ' + this.error, 'Error');
        });
    }

    /**
     * Change user profile picture
     */
    uploadProfilePicture(file) {
        if (file) {
            // Start upload
            this.Upload.upload({
                url: 'api/users/picture',
                data: {
                    file: file,
                    user: this.authentication.user
                }
            }).then((response) => {
                console.log("response", response)
                this.authentication.user = response.data;
                this.imageURL = response.data.profileImageURL;
                //Reload state
                this.$state.reload();
                this.toastr.success('Success ' + response.config.data.file.name + ' uploaded.', 'Success');
            }, (responseError) => {
                console.log('Error: ', responseError);
                this.toastr.error('Error status: ' + responseError.status, 'Error');
            }, (evt) => {
                //let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        } else {
            this.toastr.warning('La imagen no cumple con los requisitos.', 'Info');
        }

    }
}

securityModule.controller('ProfileController', ProfileController);

export default securityModule;
