export default class ArticleItemModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getDefaultProps() {
        return {};
    }

    render() {
        return (
            <div className="well">
                <div className="media">
                    <a className="pull-left" href="#">
                        <img className="media-object" src="http://placehold.it/150x150"/>
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.title}</h4>

                    <p className="text-right">By {this.props.user.displayName}</p>
                </div>
            </div>
        );
    }
}
