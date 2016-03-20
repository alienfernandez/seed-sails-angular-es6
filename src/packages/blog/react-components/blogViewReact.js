import _ from 'lodash';
//import ArticleItemModule from './articleItemViewReact';

export default class BlogView extends React.Component {

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
        return {};
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        let itemsShow = [];
        console.log("this.props.store", this.props.store)
        angular.forEach(this.props.store, (dataItem, index) => {
            itemsShow.push(this.createItem(dataItem, index));
        });
        //this.props.store.forEach((dataItem, index) => {
        //    itemsShow.push(this.createItem(dataItem, index));
        //});
        this.props.items = itemsShow;
        return React.DOM.div({}, itemsShow);
    }

    /**
     * Create item article view
     * @param dataItem
     * @param index
     * @returns {*}
     */
    createItem(dataItem, index) {
        var item;
        var optionsTpl = {};
        optionsTpl.index = index;
        optionsTpl.item = dataItem;
        for (let data in dataItem) {
            optionsTpl[data] = dataItem[data];
        }
        console.log("optionsTpl", optionsTpl)
        item = React.createElement(ArticleItemModule, optionsTpl);
        return item;
    }
}
