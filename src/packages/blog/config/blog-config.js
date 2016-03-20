/**
 * Module config
 */
class BlogConfig {

    constructor($stateProvider, Templates) {
        this.$stateProvider = $stateProvider;
        this.Templates = Templates;
    }

    /**
     * Set state provider
     * @param stateProvider
     */
    setStateProvider(stateProvider) {
        this.$stateProvider = stateProvider;
    }

    /**
     * Init module routes
     */
    initModuleRoutes() {
        this.$stateProvider.state('add-article', {
            url: '/articles/create',
            controller: 'ArticleController',
            controllerAs: 'articleCtrl',
            templateUrl: this.Templates.AddArticleTpl.name,
            //data: {
            //    roles: ['user', 'admin']
            //}
        }).state('article-list', {
            url: '/articles/list',
            controller: 'ArticleController',
            controllerAs: 'articleCtrl',
            templateUrl: this.Templates.ArticleListTpl.name
        }).state('edit-article', {
            url: '/articles/edit/:articleId',
            controller: 'ArticleController',
            controllerAs: 'articleCtrl',
            templateUrl: this.Templates.EditArticleTpl.name,
            //data: {
            //    roles: ['user', 'admin']
            //}
        }).state('blog', {
            url: '/blog',
            controller: 'BlogController',
            controllerAs: 'blogCtrl',
            templateUrl: this.Templates.BlogArticleListTpl.name
        });
    }
}

export default BlogConfig;
