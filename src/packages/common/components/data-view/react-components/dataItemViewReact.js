export default class DataItem extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    getDefaultProps() {
        return {
            selectItemCls: 'dv-item-selected',
            overItemCls: 'dv-view-over'
        };
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        //Get class item
        let _classItem = {};
        _classItem[this.props.selectItemCls] = this.props.selected;
        _classItem[this.props.overItemCls] = this.state.mouseOver;
        _classItem['col-md-4'] = true;
        var classItem = classNames(_classItem);
        return (
            <div className={classItem}
                 onMouseOver={(function (event) {
                        this.setState({mouseOver: true});
                    }).bind(this)
                }
                 onMouseOut={(function (event) {
                        this.setState({mouseOver: false});
                    }).bind(this)
                }>
                <div className="service">
                    <img src={this.props.icon} width="80" height="80" className="service-icon"/>

                    <div className="desc"><h4>{this.props.name}</h4>

                        <p>{this.props.description}</p></div>
                </div>
            </div>
        );

    }
}
