import commonModule from '../../../commonModule';

class NavbarController {

    /*ngInject*/
    constructor($state) { //, SecurityService
        // This provides Authentication context.
        //this.authentication = AuthenticationService;
        //this.user = AuthenticationService.user;
        this.user = null;
        //this.security = SecurityService;
        this.$state = $state;
    }

    /**
     * Sign out user
     */
    signout() {
        //this.security.signout().then((response) => {
        //    //Clean JWT user data
        //    this.authentication.signOut();
        //    console.log("this.$state.current.name", this.$state.current.name);
        //    if (this.$state.current.name === "home") {
        //        this.$state.reload();
        //    } else {
        //        this.$state.transitionTo('home');
        //    }
        //});
    }
}

commonModule.controller('NavbarController', NavbarController);

export default commonModule;
