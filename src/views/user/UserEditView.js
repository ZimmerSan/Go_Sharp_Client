import React, {Component} from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Button, Col, FormGroup, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {checkRole} from "../../_helpers/index";
import {Role, ROLES} from "../../constants";
import {history} from '../../_helpers'
import {userService} from "../../_services/user.service";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-es-EU'

const initialState = {
    user: {},
    firstName: '',
    lastName: '',
    role: '',
    description: '',
    imageUrl: '',
};

class UserEditView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const {userAuth} = this.props;
        if (userAuth &&
            (userAuth.id === this.props.match.params.id || checkRole(userAuth.roles, [Role.Admin, Role.Developer, Role.Manager]))
        ) {
            this.load();
        } else history.push('/');
    }

    load = () => userService
        .findOneFull(this.props.match.params.id)
        .then(u => this.setState({
            user: u,
            firstName: u.firstName,
            lastName: u.lastName,
            role: u.roles[0],
            description: u.description,
            imageUrl: u.imageUrl,
        }));

    onSubmit = () => {
        const {state} = this;
        const {userAuth} = this.props;

        let user = {
            id: state.user.id,
            firstName: state.firstName,
            lastName: state.lastName,
            description: state.description,
            imageUrl: state.imageUrl,
            roles: checkRole(userAuth.roles, [Role.Admin]) ? [state.role] : state.user.roles,
        };

        userService.updateOne(user).then(u => history.push('/users/' + user.id));
    };

    render() {
        let self = this;

        const {userAuth} = self.props;
        let {state} = this;
        let {user} = this.state;

        const breadCrumbsElements = [
            {link: '/users', name: 'Users'},
            {link: `/users/${user.id}`, name: user.fullName}
        ];

        let saveBtn = userAuth && (userAuth.id === this.props.match.params.id || checkRole(userAuth.roles, [Role.Admin]))
            ? <Button bsStyle="primary" onClick={this.onSubmit}><i className="fa fa-check"/> Save</Button>
            : undefined;

        let breadCrumbs = <BreadCrumbs pageTitle={(user.fullName ? user.fullName : 'User') + ' (edit)'}
                                       elements={breadCrumbsElements} buttons={saveBtn}/>;

        return (
            [
                breadCrumbs,
                <div className="wrapper wrapper-content animated fadeIn">
                    {user.id && [
                        <Row className="m-b-lg m-t-lg">
                            <Col md={8}>
                                <div className="profile-image">
                                    {state.imageUrl
                                        ? <div
                                            className="profile-image profile-image-circle img-circle circle-border m-b-md"
                                            style={{
                                                backgroundImage: `url(${state.imageUrl})`,
                                                height: '96px',
                                                width: '96px',
                                            }}/>
                                        : <img className="img-circle circle-border m-b-md" alt="profile"
                                               src="/img/a2.jpg"/>
                                    }
                                </div>
                                <div className="profile-info">
                                    <div className="">
                                        <div>
                                            <h2 className="no-margins">
                                                {state.firstName + ' ' + state.lastName}
                                            </h2>
                                            <h4>{state.role}</h4>
                                            <small dangerouslySetInnerHTML={{__html: state.description}}/>
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
                        </Row>,
                        <Row>
                            <Col lg={12}>
                                <div className="tabs-container">
                                    <ul className="nav nav-tabs">
                                        <li className="active"><a data-toggle="tab" href="#tab-1"> User info <span
                                            className="label label-primary">edit</span></a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="tab-1" className="tab-pane active">
                                            <div className="panel-body">
                                                <fieldset className="form-horizontal">
                                                    <FormGroup>
                                                        <label className="col-sm-2 control-label">First Name:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control"
                                                                   value={state.firstName}
                                                                   onChange={(e) => self.setState({firstName: e.target.value})}/>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label className="col-sm-2 control-label">Last Name:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control"
                                                                   value={state.lastName}
                                                                   onChange={(e) => self.setState({lastName: e.target.value})}/>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label className="col-sm-2 control-label">Role:</label>
                                                        <div className="col-sm-10">
                                                            <select className="form-control"
                                                                    value={state.role}
                                                                    disabled={!checkRole(userAuth.roles, [Role.Admin])}
                                                                    onChange={(e) => self.setState({role: e.target.value})}>
                                                                {ROLES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label className="col-sm-2 control-label">Description:</label>
                                                        <div className="col-sm-10">
                                                            <ReactSummernote
                                                                value={state.description}
                                                                options={{
                                                                    height: 200,
                                                                    dialogsInBody: true,
                                                                    toolbar: [
                                                                        ['font', ['bold', 'underline', 'clear']],
                                                                        ['para', ['ul', 'ol', 'paragraph']],
                                                                        ['fontsize', ['fontsize']],
                                                                        ['insert', ['link']],
                                                                        ['view', ['codeview']]
                                                                    ]
                                                                }}
                                                                onChange={(e) => self.setState({description: e})}/>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label className="col-sm-2 control-label">Image URL:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control"
                                                                   value={state.imageUrl}
                                                                   onChange={(e) => self.setState({imageUrl: e.target.value})}/>
                                                        </div>
                                                    </FormGroup>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>,
                        <br/>,
                        <Row>
                            <Col lg={12} className="text-center">
                                {saveBtn}
                            </Col>
                        </Row>,
                        <br/>
                    ]
                    }
                </div>
            ]
        )
    }

}

function mapStateToProps(state) {
    const {user} = state.authentication;
    return {
        userAuth: user
    }
}

export default connect(mapStateToProps)(UserEditView);