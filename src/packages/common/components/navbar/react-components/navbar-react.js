import _ from 'lodash';

export default class NavBarView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    getInitialState() {
        return {};
    }

    getDefaultProps() {
        return {};
    }

    /**
     * Render component
     * @returns {*|Long|Timestamp}
     */
    render() {
        var imgStyle = {'margin-top': -8};
        var profileImageURL = (!_.isEmpty(this.props.user)) ? this.props.user.profileImageURL : "";
        var firstName = (!_.isEmpty(this.props.user)) ? this.props.user.firstName : "";
        var email = (!_.isEmpty(this.props.user)) ? this.props.user.email : "";
        var userLogged = (
            <li className="dropdown" ng-if="homeCtrl.user">
                <a href="#" role="navbar" className="dropdown-toggle" data-toggle="dropdown" role="button">
                    <img src={profileImageURL} width="16" height="16"/>
                    {firstName} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <div className="navbar-login">
                            <div className="row">
                                <div className="col-lg-4">
                                    <p className="text-center">
                                        <img src={profileImageURL}
                                             className="img-responsive"/>
                                    </p>
                                </div>

                                <div className="col-lg-8">
                                    <p className="text-left"><strong>{firstName}
                                    </strong></p>

                                    <p className="text-left small">{email}</p>

                                    <p className="text-left">
                                        <a ui-sref="settings.profile"
                                           className="btn btn-info btn-sm">
                                            <i className="fa fa-pencil"></i> Update profile
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <div className="navbar-login navbar-login-session">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p>
                                        <button ng-click="homeCtrl.signout()"
                                                className="btn btn-default btn-block">
                                            <i className="fa fa-sign-out"></i> Signout
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        );
        var userToLogged = (
            <li className="dropdown" ng-if="!homeCtrl.user">
                <a ui-sref="authentication.signin" role="button" role="navbar" aria-expanded="false">
                    <i className="fa fa-sign-in"></i> Signin </a>
            </li>
        );
        var logginSection;
        if (!_.isEmpty(this.props.user)) {
            this.setState({logged: true});
            logginSection = userLogged;
        } else {
            this.setState({logged: true});
            logginSection = userToLogged;
        }
        return (
            <nav className="navbar navbar-findcond">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#" role="navbar">
                            <img src="app/assets/img/logo184x40.png" width="180" height="38"
                                 style={imgStyle} className="img-responsive"/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="nav navbar-nav navbar-right">
                            {logginSection}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}
