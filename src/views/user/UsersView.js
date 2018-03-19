import React, { Component } from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Col,  Row} from "react-bootstrap";
import SiteTemplateShort from "../../_components/partials/SiteTemplateShort";
import {Link} from "react-router-dom";
import {userActions} from "../../_actions";
import {connect} from "react-redux";
import ChangeUserRoleModal from "../../_components/partials/ChangeUserRoleModal";

const initialState = {
    showEditRoleModal: false,
    user: {}
};

class UsersView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.props.dispatch(userActions.findAll());
    }

    showModal = (user) => {
        this.setState({
            user,
            showEditRoleModal: true
        });
    };

    hideModal = () => {
        this.setState({
            showEditRoleModal: false
        });
    };

    render() {
        let self = this;

        const {isLoading, users, error}  = self.props;

        let cards = [];
        if (users) {
            cards = users.map(u =>
                <div className="col-lg-2">
                    <div className="contact-box center-version">
                        <Link to={'/users/' + u.id}>
                            <div className="text-center">
                                <img alt="image" className="img-circle" src="img/a2.jpg"/>
                                <h3 className="m-b-xs text-navy"><strong>{u.fullName}</strong></h3>
                                <h4 className="font-bold">{u.roles.join(', ')}</h4>
                                <p>
                                    {u.email}<br/>
                                    <strong>Joined: </strong>{(new Date(u.joinDate)).toISOString().slice(0, 10).replace(/-/g, "/")}
                                </p>
                            </div>
                            <div className="clearfix"/>
                        </Link>

                        <div className="contact-box-footer">
                            <div className="m-t-xs">
                                <Link to={'/users/' + u.id} className="btn btn-xs btn-outline btn-primary">
                                    Info <i className="fa fa-long-arrow-right"/>
                                </Link>
                                {' '}
                                <button className="btn btn-xs btn-outline btn-success" onClick={() => this.showModal(u)}>
                                    <i className="fa fa-gear"/> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const breadCrumbsElements = [
            {link: '/users', name: 'Users'}
        ];

        let breadCrumbs = <BreadCrumbs pageTitle={'Users'} elements={breadCrumbsElements}/>;

        return (
            [
                breadCrumbs,
                <ChangeUserRoleModal show={this.state.showEditRoleModal} user={this.state.user} onHide={this.hideModal}/>,
                <div className="wrapper wrapper-content animated fadeIn">
                    <div className="row">
                        {cards}
                    </div>
                </div>
            ]
        )
    }

}

function mapStateToProps(state) {
    const { loading, items, error } = state.users;
    return {
        isLoading: loading,
        users: items,
        error
    }
}

const connectedUserView = connect(mapStateToProps)(UsersView);
export default connectedUserView;