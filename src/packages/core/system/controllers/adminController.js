import systemModule from '../systemModule';

class AdminController {

    /*ngInject*/
    constructor(AuthenticationService) {
        // This provides Authentication context.
        this.authentication = AuthenticationService;
        this.user = AuthenticationService.user;
    }
}

systemModule.controller('AdminController', AdminController);

export default systemModule;
