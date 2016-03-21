import securityModule from '../securityModule';

class UsersService {

    constructor(UserService, BaseHttpService) {
        this.UserService = UserService;
        this.httpService = BaseHttpService;
        this.serverUri = this.httpService.config.serverUri;
    }

    /*ngInject*/
    static instance(UserService, BaseHttpService) {
        return new UsersService(UserService, BaseHttpService);
    }

    findUser(userId) {
        return this.UserService.get({
            userId: userId
        });
    }

    /**
     * Get user by jid
     * @param jid
     * @returns {Promise}
     */
    findUserByJid(jid) {
        var url = this.serverUri + '/api/users/getUserByJid';
        return new Promise((resolve, reject) => {
            this.httpService.get(url, {
                jid: jid
            })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

securityModule.service('UserApi', UsersService.instance);

export default securityModule;
