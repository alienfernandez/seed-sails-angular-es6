class SecurityController {

    /*ngInject*/
    constructor(AuthenticationService, SecurityService, LoadMask) {
        this.loadMask = LoadMask;
        //Create mask
        this.loadMask.create('exampleLoadMask', "Espere por favor, autenticando ...", 'body');
        this.authentication = AuthenticationService;
        this.security = SecurityService;
    }

    signin() {
        var credentials = {};
        //Show mask
        this.loadMask.show('#exampleLoadMask');
        this.security.signin(credentials).then((response) => {
            //Hide mask
            this.loadMask.hide('#exampleLoadMask');
        }).catch(() => {
            //Hide mask
            this.loadMask.hide('#exampleLoadMask');
        });
    }

}