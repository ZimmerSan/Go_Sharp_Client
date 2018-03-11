import React from 'react';
import {Button, Dropdown} from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class TopHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    render() {
        const { loggedIn, cart } = this.props;

        const { cartRecords } = cart.item ? cart.item : {};

        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-shopping-cart"/>
                                {cart.item
                                    ? <span className="label label-primary">{cart.item.itemsCount}</span>
                                    : cart.loading
                                        ? <span className="label label-warning">...</span>
                                        : cart.error
                                            ? <span className="label label-danger">!</span>
                                            : ''
                                }
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                {cartRecords && cartRecords.map(rec =>
                                    (
                                        <li>
                                            <Link to={'/siteTemplates/' + rec.siteTemplate.id}>
                                                <div>
                                                    <i className="fa fa-circle-o fa-fw"></i> {rec.siteTemplate.title}
                                                    <span className="pull-right text-muted small">x {rec.count}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                )}
                                {cartRecords && <li className="divider"/>}
                                <li>
                                    <div className="text-center link-block">
                                        <Link to="/cart">
                                            <strong>Go to cart </strong>
                                            <i className="fa fa-angle-right"></i>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            {loggedIn
                                ? <Link to='/login'><i className="fa fa-sign-out"></i> Log Out</Link>
                                : <Link to='/login'><i className="fa fa-sign-in"></i> Log in</Link>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) =>
    {
        const { loggedIn } = state.authentication;
        const { cart } = state;
        return {
            loggedIn,
            cart
        };
    };

export default connect(mapStateToProps)(TopHeader);