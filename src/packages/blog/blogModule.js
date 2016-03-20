import angular from 'angular';
import agGrid from 'ag-grid';
//console.log("agGrid", agGrid);

//Import all module templates
import * as Templates from './templates';

//Import config module class
import BlogConfig from './config/blog-config';

//import {commonModule} from 'commons';
//agGrid.initialiseAgGridWithAngular1(angular);
import {commonModule} from '../../packages/common/common';

console.log("blog!");
let blogModule = angular.module('app.blog', [
    'agGrid', 'common',
    //Templates
    Templates.AddArticleTpl.name,
    Templates.EditArticleTpl.name,
    Templates.ArticleListTpl.name,
    Templates.BlogArticleListTpl.name
])
    .config(($stateProvider) => {
        //Init module routes
        new BlogConfig($stateProvider, Templates).initModuleRoutes();
    });

/**
 * Run blog module
 */
blogModule.run(() => {

});

export default blogModule;
