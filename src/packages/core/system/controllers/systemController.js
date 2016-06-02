import systemModule from '../systemModule';

class SystemController {

    /*ngInject*/
    constructor(AuthenticationService) {
        // This provides Authentication context.
        this.authentication = AuthenticationService;
        this.user = AuthenticationService.user;
    }
}

systemModule.controller('SystemController', SystemController);

export default systemModule;
