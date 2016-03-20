import blogModule from '../blogModule';

class BlogService {

    constructor($window, BaseHttpService) {
        this.$window = $window;
        this.http = BaseHttpService;
        this.serverUri = this.http.config.serverUri;
        //console.log("serverUri: ", this.serverUri);
    }

    /*ngInject*/
    static instance($window, BaseHttpService) {
        return new BlogService($window, BaseHttpService);
    }


}

blogModule.service('BlogService', BlogService.instance);

export default blogModule;
