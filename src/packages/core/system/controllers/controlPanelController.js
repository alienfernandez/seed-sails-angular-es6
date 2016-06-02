import systemModule from '../systemModule';

class ControlPanelController {

    /*ngInject*/
    constructor(AuthenticationService, DataItemModule) {
        this.DataItemModule = DataItemModule;

        // This provides Authentication context.
        this.authentication = AuthenticationService;
        this.user = AuthenticationService.user;

        this.optControlPanel = {
            store: [
                {
                    name: "Inventory Module",
                    group: 1,
                    groupName: "Logistics Group",
                    iconCls: 'fa fa-university',
                    description: "Logistics Group Description"
                },
                {
                    name: "Billing Module",
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
                }
            ],
            itemSelector: 'div.dv-thumb-wrap',
            overItemCls: 'dv-view-over',
            selectItemCls: 'dv-item-selected',
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
}

systemModule.controller('ControlPanelController', ControlPanelController);

export default systemModule;
