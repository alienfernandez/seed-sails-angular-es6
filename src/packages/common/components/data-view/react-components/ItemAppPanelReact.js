export default class ItemAppPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getDefaultProps() {
        return {
            selectItemCls: 'dv-view-item-focused',
            overItemCls: 'dv-view-over-with-border'
        };
    }

    componentDidMount() {
        var domNodeLink = this.refs.state_link.getDOMNode();
        if (this.props.state) {
            domNodeLink.setAttribute('ui-sref', this.props.state);
            domNodeLink.setAttribute('ui-sref-active', "active");
        }
        if (this.props.uri) {
            domNodeLink.setAttribute('href', this.props.uri);
        }
    }

    render() {
        //Get class item
        let _classItem = {
            'dv-thumb-wrap-without-margin': true,
            'col-md-4': true,
            'dv-cursor-pointer': true
        };
        _classItem[this.props.overItemCls] = this.state.mouseOver;
        var classItem = classNames(_classItem);
        var img;
        if (this.props.iconCls) {
            var _classImg = {'fa-4x': true};
            _classImg[this.props.iconCls] = true;
            var classImg = classNames(_classImg);
            img = <i className={classImg}></i>;
        } else {
            img = <img src={this.props.icon}/>;
        }

        return (
            <div className={classItem} onClick={(function (index, event) {
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
                <a ref="state_link" className="btn btn-link dv-link">
                    <div>
                        <div className="text-center">
                            {img}
                        </div>
                    </div>
                    <div className="text-center">{this.props.name}</div>
                </a>
            </div>
        );
    }
}
