import commonModule from '../../../commonModule';

class i18nLoaderService {

    /*ngInject*/
    constructor($q, $http) {
        //Promise that runs when you have service response

        // return loaderFn
        return (options) => {
            let module = options.module || "system";
            let uri = "app/packages/" + module + "/i18n/locale-";

            return new Promise((resolve, reject) => {
                $http({
                    method: 'GET',
                    url: uri + options.key + '.json'
                }).success((data) => {
                    resolve(data);
                }).error((error) => {
                    reject(error);
                });
            });
        };
    }
}

commonModule.factory('i18nLoader', ['$q', '$http', ($q, $http) => new i18nLoaderService($q, $http)]);

export default commonModule;
