import blogModule from '../blogModule';

class ArticleResourceService {

    constructor($resource) {
        this.$resource = $resource;
        return this.$resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {method: 'GET', isArray: true}
        });
    }

    /*ngInject*/
    static instance($resource) {
        return new ArticleResourceService($resource);
    }
}

blogModule.service('ArticleResource', ArticleResourceService.instance);

export default blogModule;
