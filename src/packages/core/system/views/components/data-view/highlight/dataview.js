class DataViewController {

    /*ngInject*/
    constructor(DataItemModule) {

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
                    description: "Billing module"
                },
                {
                    name: "Fixed Assets Module",
                    group: 1,
                    groupName: "Logistics Group",
                    iconCls: 'fa fa-university',
                    description: "Fixed Assets Module"
                }, {
                    name: "Security Module",
                    group: 2,
                    groupName: "Security Group",
                    iconCls: 'fa fa-key',
                    description: "Security Module"
                },
                {
                    name: "Configuration Module",
                    group: 3,
                    groupName: "Configuration Group",
                    iconCls: 'fa fa-cogs',
                    description: "Configuration Module"
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
                component: DataItemModule,
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
