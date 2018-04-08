import React, { Component } from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Col,  Row} from "react-bootstrap";
import {connect} from "react-redux";
import {checkRole} from "../../_helpers/index";
import {Role} from "../../constants";
import {history} from '../../_helpers'
import {userService} from "../../_services/user.service";
import {Link} from "react-router-dom";

const initialState = {
    user: {},
};

class UserInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        const { userAuth } = this.props;
        if (userAuth &&
            (userAuth.id === this.props.match.params.id || checkRole(userAuth.roles, [Role.Admin, Role.Developer, Role.Manager]))
        ) {
            this.load();
        } else history.push('/');
    }

    load = () => userService.findOneFull(this.props.match.params.id).then(u => this.setState({user: u}));

    render() {
        let self = this;

        const {userAuth} = self.props;

        let {user} = this.state;

        const breadCrumbsElements = [
            {link: '/users', name: 'Users'},
            {link: `/users/${user.id}`, name: user.fullName}
        ];

        let editBtn = userAuth && (userAuth.id === this.props.match.params.id || checkRole(userAuth.roles, [Role.Admin]))
            ? <Link to={`/users/${user.id}/edit`} className="btn btn-warning"><i className="fa fa-edit"/> Edit</Link>
            : undefined;

        let breadCrumbs = <BreadCrumbs pageTitle={user.fullName ? user.fullName : 'User'} elements={breadCrumbsElements} buttons={editBtn}/>;

        return (
            [
                breadCrumbs,
                <div className="wrapper wrapper-content animated fadeIn">
                    {user.id &&
                    <Row className="m-b-lg m-t-lg">
                        <Col md={8}>
                            <div className="profile-image">
                                {user.imageUrl
                                    ? <div
                                        className="profile-image profile-image-circle img-circle circle-border m-b-md"
                                        style={{
                                            backgroundImage: `url(${user.imageUrl})`,
                                            height: '96px',
                                            width: '96px',
                                        }}/>
                                    : <img className="img-circle circle-border m-b-md" alt="profile" src="/img/a2.jpg"/>
                                }
                            </div>
                            <div className="profile-info">
                                <div className="">
                                    <div>
                                        <h2 className="no-margins">
                                            {user.fullName}
                                        </h2>
                                        <h4>{user.roles[0]}</h4>
                                        <small dangerouslySetInnerHTML={{__html: user.description}}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <table className="table small m-b-xs">
                                <tbody>
                                <tr>
                                    <td>
                                        <strong>{user.assignedOrders.length}</strong> Assigned Orders
                                    </td>
                                    <td>
                                        <strong>{user.customersProjects.length}</strong> Assigned Projects
                                    </td>
                                </tr>
                                {checkRole(user.roles, [Role.Admin, Role.Developer, Role.Manager]) &&
                                [
                                    <tr>
                                        <td>
                                            <strong>{user.managedProjects.length}</strong> Managed Projects
                                        </td>
                                        <td>
                                            <strong>{user.assignedProjects.length}</strong> Developed Projects
                                        </td>
                                    </tr>,
                                    <tr>
                                        <td>
                                            <strong>{user.assignedTasks.length}</strong> Assigned Tasks
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                ]}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    }
                </div>
            ]
        )
    }

}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        userAuth: user
    }
}

export default connect(mapStateToProps)(UserInfoView);