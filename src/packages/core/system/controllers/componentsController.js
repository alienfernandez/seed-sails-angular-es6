import systemModule from '../systemModule';

class ComponentsController {

    /*ngInject*/
    constructor(AuthenticationService, DataItemModule, DataItem) {
        // This provides Authentication context.
        this.authentication = AuthenticationService;
        this.DataItemModule = DataItemModule;
        this.DataItem = DataItem;
        this.user = AuthenticationService.user;
        this.options = {
            user: this.user
        };
      this.componentUri = "app/packages/core/system/views/components/";

        this.dataViewComponent();
        this.loadMaskComponent();
        this.maskReComponent();
        this.navbarComponent();

    }

    dataViewComponent() {
        //Data view component
        this.tabsDataView = [{
            iconCls: 'fa fa-th-large',
            name: 'Preview Component',
            highlight: false
        }, {
            iconCls: 'fa fa-code',
            name: 'DataViewController.js',
            uri: this.componentUri + 'data-view/highlight/dataview.js',
            highlight: true
        }, {
            iconCls: 'fa fa-html5',
            name: 'DataView.tpl.html',
            uri: this.componentUri + 'data-view/highlight/dataview-view.tpl.html',
            highlight: true
        }];
        this.currentTabDV = this.tabsDataView[0];

        this.options = {
            store: [
                {
                    name: "Inventory Module",
                    group: 1,
                    groupName: "Logistics Group",
                    iconCls: 'fa fa-university',
                    description: "Logistics Group Description"
                },
                {
                    name: "Billing module",
                    group: 1,
                    groupName: "Logistics Group",
                    iconCls: 'fa fa-university',
                    description: "Logistics Group Description"
                },
                {
                    name: "Fixed Assets Module",
                    group: 1,
                    groupName: "Logistics Group",
                    iconCls: 'fa fa-university',
                    description: "Fixed Assets Module Description"
                }, {
                    name: "Security Module",
                    group: 2,
                    groupName: "Security Group",
                    iconCls: 'fa fa-key',
                    description: "Security Module Description"
                },
                {
                    name: "Configuration Module",
                    group: 3,
                    groupName: "Configuration Group",
                    iconCls: 'fa fa-cogs',
                    description: "Configuration Module Description"
                },
            ],
            itemSelector: 'div.dv-thumb-wrap',
            overItemCls: 'dv-view-over',
            selectItemCls: 'dv-item-selected', //dv-view-item-focused
            multiSelect: false,
            groupBy: {
                key: 'group',
                name: 'groupName',
                iconCls: 'iconCls'
            },
            template: {
                component: this.DataItemModule,
                listeners: {
                    onClick: (item, dataView, index, event) => {
                        console.log("item", item);
                        console.log("dataView", dataView);
                        console.log("index", index);
                        console.log("event", event);
                    }
                }

            }
        };
    }

    loadMaskComponent() {
        //Load Mask component
        this.tabsLoadMask = [{
            iconCls: 'fa fa-spinner',
            name: 'Preview Component',
            highlight: false
        }, {
            iconCls: 'fa fa-code',
            name: 'LoadMaskController.js',
            uri: this.componentUri + 'load-mask/highlight/loadmask.js',
            highlight: true
        }];
        this.currentTabLM = this.tabsLoadMask[0];
    }

    maskReComponent() {
        //Load Mask component
        this.tabsMaskRe = [{
            iconCls: 'fa fa-asterisk',
            name: 'Preview Component',
            highlight: false
        }, {
            iconCls: 'fa fa-html5',
            name: 'MaskRe.tpl.html',
            uri: this.componentUri + 'maskre/highlight/maskre-view.tpl.html',
            highlight: true
        }];
        this.currentTabMR = this.tabsMaskRe[0];
    }

    navbarComponent() {
        //Load Mask component
        this.tabsNavbar = [{
            iconCls: 'fa fa-navicon',
            name: 'Preview Component',
            highlight: false
        }, {
            iconCls: 'fa fa-html5',
            name: 'NavBar.tpl.html',
            uri: this.componentUri + 'navbar/highlight/navbar-view.tpl.html',
            highlight: true
        }];
        this.currentTabNB = this.tabsNavbar[0];
    }
}

systemModule.controller('ComponentsController', ComponentsController);

export default systemModule;
