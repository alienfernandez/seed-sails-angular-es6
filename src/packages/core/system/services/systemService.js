import systemModule from '../systemModule';

class SystemService {

    constructor($resource) {
        //this.$resource = $resource;
        return $resource('api/systems/:systemId', {
            systemId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

    /*ngInject*/
    static instance($resource) {
        return new SystemService($resource);
    }
}

systemModule.service('SystemService', SystemService.instance);

export default systemModule;
