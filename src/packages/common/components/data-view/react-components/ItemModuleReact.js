export default class ItemModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getDefaultProps() {
        return {
            selectItemCls: 'dv-view-item-focused',
            overItemCls: 'dv-view-over'
        };
    }

    render() {
        //Get class item
        let _classItem = {
            'dv-thumb-wrap': true,
            'dv-module-view': true
        };
        _classItem[this.props.selectItemCls] = this.props.selected;
        _classItem[this.props.overItemCls] = this.state.mouseOver;
        var classItem = classNames(_classItem);

        //Get class item module
        var classItemModule = classNames({
            'dv-module-view': true
        });

        this.props.icon = "http://placehold.it/100x100";
        let img = <img src={this.props.icon}/>;
        return (
            <div className={classItemModule} onClick={(function (index, event) {
                    this.props.dataView.setState({selected: index});
                    this.props.onClick(this.props.item, this.props.dataView, index, event);
                }).bind(this, this.props.index)}
                 onMouseOver={(function (event) {
                        this.setState({mouseOver: true});
                    }).bind(this)
                }
                 onMouseOut={(function (event) {
                        this.setState({mouseOver: false});
                    }).bind(this)
                }
                >
                <div className={classItem}>
                    <dd>
                        {img}

                        <div>
                            <h4>{this.props.name}</h4>

                            <p>{this.props.description}</p>
                        </div>
                    </dd>
                </div>
            </div>
        );
    }
}
