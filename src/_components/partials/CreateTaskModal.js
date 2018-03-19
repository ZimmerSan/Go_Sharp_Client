import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import {history} from '../../_helpers'
import DatePicker from 'react-16-bootstrap-date-picker';
import {connect} from "react-redux";
import {userService} from "../../_services/user.service";
import {Role} from "../../constants";
import {workItemService} from "../../_services";

class CreateTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developers: [],
        };
    }

    componentDidMount() {
        let self = this;

        userService.getAll().then(
            users => {
                self.setState({developers: users.filter(u => u.roles.includes(Role.Developer))}, () => {
                    if (self.state.developers[0]) self.setState({developer_id: self.state.developers[0].id})
                });
            },
            error => console.log(error)
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({
                budget: nextProps.order.totalPrice
            })
        }
    }

    onSubmit = () => {
        let self = this;
        const {state} = this;

        let task = {
            name: state.name,
            description: state.description,
            estimatedTime: state.estimatedTime,
            dueDate: state.dueDate,
            projectId: self.props.project.id,
            assignedDeveloper: { id: state.developer_id },
        };

        workItemService.create(task).then(self.props.callback);
        this.props.onHide();
    };

    render() {
        let self = this;

        return (
            <Modal {...this.props} className="inmodal animated fadeIn">
                    <Modal.Header>
                        <i className="fa fa-tasks modal-icon"/>
                        <h4 className="modal-title">Create Task</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl onChange={e => this.setState({name: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Description</ControlLabel>
                                    <FormControl onChange={e => this.setState({description: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Estimated Time (hours)</ControlLabel>
                                    <FormControl type="number" value={this.state.estimatedTime} onChange={e => this.setState({estimatedTime: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Developer</ControlLabel>
                                    <select className="form-control" onChange={(e) => self.setState({developer_id: e.target.value})}>
                                        {self.state.developers.map(manager => <option key={manager.id} value={manager.id}>{manager.fullName}</option>)}
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Due Date</ControlLabel>
                                    <DatePicker id="example-datepicker"
                                                minDate={new Date().toISOString()}
                                                dateFormat="DD/MM/YYYY"
                                                value={this.state.dueDate}
                                                onChange={(date) => this.setState({dueDate: date})}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="white" onClick={this.props.onHide}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.onSubmit}>
                            <i className="fa fa-dot-circle-o"/> Create Task
                        </Button>
                    </Modal.Footer>
            </Modal>
        );
    };
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(CreateTaskModal);