import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        const { user } = this.props;

        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                            <span></span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear">
                                    <span className="block m-t-xs">
                                        <strong className="font-bold">{user.fullName}</strong>
                                    </span>
                                    <span className="text-muted text-xs block">
                                        {user.roles[0]}<b className="caret"></b>
                                    </span>
                                </span>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><Link to="/login">Logout</Link></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            Go#
                        </div>
                    </li>
                    <li className={this.activeRoute("/dashboard")}>
                        <Link to="/dashboard"><i className="fa fa-th-large"/> <span className="nav-label">Dashboard</span>  <span className="fa arrow"/></Link>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/dashboard/orders")}>
                                <Link to="/dashboard/orders">Orders</Link>
                            </li>
                            <li className={this.activeRoute("/dashboard/projects")}>
                                <Link to="/dashboard/projects">Projects</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/users")}>
                        <Link to="/users"><i className="fa fa-users"></i> <span className="nav-label">Users</span></Link>
                    </li>
                    <li className={this.activeRoute("/siteTemplates")}>
                        <Link to="/siteTemplates"><i className="fa fa-desktop"></i> <span className="nav-label">Site Templates</span></Link>
                    </li>
                    <li className={this.activeRoute("/cart")}>
                        <Link to="/cart"><i className="fa fa-shopping-cart"></i> <span className="nav-label">Cart</span></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(Navigation)