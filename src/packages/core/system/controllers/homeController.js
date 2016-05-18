import systemModule from '../systemModule';

class HomeController {

  /*ngInject*/
  constructor(AuthenticationService, DataItem) {
    // This provides Authentication context.
    this.authentication = AuthenticationService;
    this.user = AuthenticationService.user;
    this.options = {
      user: this.user
    };

    this.optionsDv = {
      store: [
        {
          name: "ES6",
          icon: 'app/assets/img/svg/es6.svg',
          group: 1,
          iconCls: 'fa fa-cogs',
          groupName: "Tools",
          description: `Adds significant new syntax for writing complex applications, including classes and modules,
                    but defines them semantically in the same terms as ECMAScript 5 strict mode. Other new
                    features include iterators and for/of loops, Python-style generators and generator
                    expressions, arrow functions, binary data, collections, and proxies.`
        }, {
          name: "Babel",
          icon: 'app/assets/img/babel.png',
          group: 1,
          iconCls: 'fa fa-cogs',
          groupName: "Tools",
          description: `Babel is a transpiler for JavaScript
                    best known for its ability to turn ES6 (The compiler for writing next generation
                    JavaScript) into code that runs in your browser (or on your server) today. Babel has
                    support for the latest version of JavaScript through syntax transformers.`
        }, {
          name: "Jspm.io",
          icon: 'app/assets/img/svg/jspm.svg',
          group: 1,
          iconCls: 'fa fa-cogs',
          groupName: "Tools",
          description: `Jspm is a package manager for the SystemJS universal module loader, built on top of the
                    dynamic ES6 module loader. Load any module format (ES6, AMD, CommonJS and globals) directly from
                    any registry such as npm and GitHub with flat versioned dependency management. Any custom registry
                    endpoints can be created through the Registry API.`
        }],
      overItemCls: 'dv-view-over',
      hideTools: true,
      groupBy: {
        key: 'group',
        name: 'groupName',
        iconCls: 'iconCls'
      },
      template: {
        component: DataItem,
        listeners: {}
      }
    };
  }
}

systemModule.controller('HomeController', HomeController);

export default systemModule;
