import commonModule from '../../../commonModule';
import HttpService from '../HttpService';

class BaseHttpService extends HttpService {
    /*ngInject*/
    constructor($http, lodash, $appConstants) {
        //console.log("$appConstants!", $appConstants);
        super($http, lodash);
        this.config = {
            serverUri: $appConstants.server + ':' + $appConstants.port
        }
    }
}

commonModule.service('BaseHttpService', BaseHttpService);

export default commonModule;
