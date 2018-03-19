import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {userService} from "../../_services/user.service";
import {Role} from "../../constants";
import {userActions} from "../../_actions/user.actions";
import {ROLES} from "../../constants";

class ChangeUserRoleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            managers: [],
            developers: [],
        };
    }

    onSubmit = () => {
        this.props.onHide();
        let self = this;
        const {user} = self.props;

        userService.updateRole(user.id, [self.state.role]).then(
            self.props.dispatch(userActions.findAll())
        );
    };

    render() {
        let self = this;
        const {user} = this.props;

        return (
            <Modal {...this.props} className="inmodal animated bounceInRight">
                    <Modal.Header>
                        <h4 className="modal-title">{user.fullName}</h4>
                        <small className="font-bold">Change Role</small>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lgOffset={1} lg={10}>
                                <br/>
                                <FormGroup>
                                    <select className="form-control" onChange={(e) => self.setState({role: e.target.value})}>
                                        {ROLES.map(r => <option key={r} value={r} selected={user.roles ? r === user.roles[0] : false}>{r}</option>)}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="white" onClick={this.props.onHide}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.onSubmit}>
                            <i className="fa fa-dot-circle-o"/> Submit
                        </Button>
                    </Modal.Footer>
            </Modal>
        );
    };
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ChangeUserRoleModal);