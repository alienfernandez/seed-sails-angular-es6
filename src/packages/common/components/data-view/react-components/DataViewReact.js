import DataGroupingViewReact from './GroupingItemReact';
import DataViewApi from "../factory/dataViewApiFactory"
import _ from 'lodash';

export default class DataView extends React.Component {

    constructor() {
        super();
        this.state = {
            selected: 0
        };
    }

    getInitialState() {
        return {selected: 0};
    }

    getDefaultProps() {
        return {api: {}};
    }

    select(index) {
        console.log(this.props.items[index]);
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        let itemsShow = [], items = [];
        if (_.isEmpty(this.props.groupBy)) {
            this.props.store.forEach((dataItem, index) => {
                itemsShow.push(this.createItem(dataItem, index));
            });
            items = itemsShow;
        }
        else {
            let groupKey = this.props.groupBy.key;
            let groupItems = _.chain(this.props.store).groupBy(groupKey).value();
            let index = 0;
            for (let key in groupItems) {
                let itemsGroup = [];
                let dataGroup = {};
                groupItems[key].forEach((dataItem) => {
                    itemsGroup.push(this.createItem(dataItem, index));
                    //Group data
                    dataGroup.name = dataItem[this.props.groupBy.name];
                    dataGroup.iconCls = dataItem[this.props.groupBy.iconCls];
                    dataGroup.key = dataItem[this.props.groupBy.key];
                    dataGroup.hideTools = (_.isUndefined(this.props.hideTools) || _.isNull(this.props.hideTools) || !this.props.hideTools) ? false : true;
                    index++;
                });
                dataGroup.items = itemsGroup;
                items = itemsGroup.concat(items);
                itemsShow.push(this.createGroupingItem(dataGroup));
            }
        }
        this.props.items = items;
        return React.DOM.div({className: 'dv-main'}, itemsShow);
    }

    /**
     * Create grouping item
     * @param dataGroup
     * @returns {*}
     */
    createGroupingItem(dataGroup) {
        return React.createElement(DataGroupingViewReact, dataGroup);
    }

    /**
     * Create item data view
     * @param dataItem
     * @param index
     * @returns {*}
     */
    createItem(dataItem, index) {
        var item;
        if (this.props.template) {
            var optionsTpl = this.props.template.listeners;
            optionsTpl.selected = (index == this.state.selected);
            optionsTpl.index = index;
            optionsTpl.selectItemCls = this.props.selectItemCls;
            optionsTpl.overItemCls = this.props.overItemCls;
            optionsTpl.dataView = this;
            optionsTpl.item = dataItem;
            for (let data in dataItem) {
                optionsTpl[data] = dataItem[data];
            }
            item = React.createElement(this.props.template.component, optionsTpl);
        }
        return item;
    }
}
