export default class LoadMask extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    getDefaultProps() {
        return {};
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        return (
            <div className="load-mask-panel">
                <div className="loading-wrapper">
                    <span className="loading-center">
                        <i className="fa fa-spinner fa-pulse"></i>
                        <span data-role="message"> {this.props.message}</span>
                    </span>
                </div>
            </div>
        );
    }
}
