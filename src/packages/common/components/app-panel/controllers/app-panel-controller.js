import commonModule from '../../../commonModule';

class AppPanelController {

  /*ngInject*/
  constructor(AuthenticationService, SecurityService, DataItemAppPanel) {
    // This provides Authentication context.
    this.authentication = AuthenticationService;
    this.user = AuthenticationService.user;
    this.security = SecurityService;

    this.options = {
      data: {
        store: [
          {
            name: "Blog",
            iconCls: 'fa fa-university',
            description: "Blog",
            state: "blog"
          }, {
            name: "Components",
            iconCls: 'fa fa-cog',
            description: "Components",
            state: "components.dataview",
            //uri: "#/components/dataview"
          }, {
            name: "Home",
            iconCls: 'fa fa-home',
            description: "Home",
            state: "home"
          }, {
            name: "Chat",
            iconCls: 'fa fa-comment',
            description: "Chat",
            state: "chat"
          }, {
            name: "Panel",
            iconCls: 'fa fa-th',
            description: "Control Panel",
            state: "admin.panel"
          }, {
            name: "Articles",
            iconCls: 'fa fa-bars',
            description: "Articles",
            state: "article-list"
          }
        ],
        overItemCls: 'dv-view-over',
        template: {
          component: DataItemAppPanel,
          listeners: {
            onClick: (item, dataView, index, event) => {
              //console.log("item", item);
              //console.log("dataView", dataView);
              //console.log("index", index);
              //console.log("event", event);
            }
          }
        }
      }
    };
  }
}

commonModule.controller('AppPanelController', AppPanelController);

export default commonModule;
