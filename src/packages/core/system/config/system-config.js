/**
 * Module config
 */
class SystemConfig {

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
    this.$stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        templateUrl: this.Templates.HomeTemplate.name
      }).state('components', {
        abstract: true,
        url: '/components',
        templateUrl: this.Templates.ComponentsTpl.name,
        controller: 'ComponentsController',
        controllerAs: 'cmpCtrl'
      }).state('components.dataview', {
        url: '/dataview',
        templateUrl: this.Templates.DataViewTpl.name,
        controller: 'ComponentsController',
        controllerAs: 'cmpCtrl'
      }).state('components.navbar', {
        url: '/navbar',
        templateUrl: this.Templates.NavbarViewTpl.name,
        controller: 'ComponentsController',
        controllerAs: 'cmpCtrl'
      }).state('components.loadmask', {
        url: '/loadmask',
        templateUrl: this.Templates.LoadMaskViewTpl.name,
        controller: 'ComponentsController',
        controllerAs: 'cmpCtrl'
      }).state('components.maskre', {
        url: '/maskre',
        templateUrl: this.Templates.MaskReViewTpl.name,
        controller: 'ComponentsController',
        controllerAs: 'cmpCtrl'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: this.Templates.Template404.name,
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: this.Templates.Template400.name,
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: this.Templates.Template403.name,
        data: {
          ignoreState: true
        }
      }).state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: this.Templates.AdminTpl.name,
        controller: 'AdminController',
        controllerAs: 'adminCtrl'
      }).state('admin.panel', {
        url: '/panel/control',
        templateUrl: this.Templates.CtrlPanelThTpl.name,
        controller: 'ControlPanelController',
        controllerAs: 'controlCtrl'
      }).state('admin.system', {
        url: '/system',
        templateUrl: this.Templates.SystemTpl.name,
        controller: 'SystemController',
        controllerAs: 'systemCtrl'
      });
  }
}

export default SystemConfig;
