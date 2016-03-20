export default class DataGroupingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {collapse: false};
    }

    getInitialState() {
        return {collapse: false};
    }

    getDefaultProps() {
        return {};
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        //Class items
        let classItemCollapse = classNames({
            'dv-collapse': this.state.collapse
        });
        let classItemIcon = classNames({
            'fa fa-minus-circle': !this.state.collapse && !this.props.hideTools,
            'fa fa-plus-circle': this.state.collapse && !this.props.hideTools
        });
        let classCursorPointer = (!this.props.hideTools) ? " dv-cursor-pointer" : "";
        //console.log("this.props", this.props)
        return React.DOM.div({className: 'dv-grouping'},
            React.DOM.div({
                    className: 'dv-header-grouping' + classCursorPointer,
                    onClick: (function (event) {
                        //Check hide tool is false
                        if (!this.props.hideTools) {
                            this.setState({collapse: !this.state.collapse});
                        }
                    }).bind(this)
                },
                React.DOM.span({},
                    React.DOM.span({className: this.props.iconCls}),
                    React.DOM.span({}, " " + this.props.name),
                    React.DOM.span({
                            className: 'dv-collapse-btn',
                            onClick: (function (event) {
                                //Check hide tool is false
                                if (!this.props.hideTools) {
                                    this.setState({collapse: !this.state.collapse});
                                }
                            }).bind(this)
                        },
                        React.DOM.span({className: classItemIcon})
                    )
                )
            ),
            React.DOM.div({className: classItemCollapse},
                this.props.items
            ),
            React.DOM.div({style: {clear: 'left'}})
        );
    }
}
