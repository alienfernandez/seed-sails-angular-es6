import securityModule from '../securityModule';

class UserService {

    constructor($resource) {
        this.$resource = $resource;
        return this.$resource('api/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

    /*ngInject*/
    static instance($resource) {
        return new UserService($resource);
    }
}

securityModule.service('UserService', UserService.instance);

export default securityModule;
