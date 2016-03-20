import blogModule from '../blogModule';

class BlogController {

    /*ngInject*/
    constructor($state, $stateParams, ArticleResource) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.articleResource = ArticleResource;
        //this.user = AuthenticationService.user;
    }

    find() {
        this.articles = this.articleResource.query();
        this.options = {
            store: this.articles
        }
    }

    // Find existing Article
    findOne() {
        this.article = this.articleResource.get({
            articleId: this.$stateParams.articleId
        });
    }

}

blogModule.controller('BlogController', BlogController);

export default blogModule;
