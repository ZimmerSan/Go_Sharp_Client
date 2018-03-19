import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import {history} from '../../_helpers'
import DatePicker from 'react-16-bootstrap-date-picker';
import {connect} from "react-redux";
import {orderActions} from "../../_actions";
import {userService} from "../../_services/user.service";
import {Role} from "../../constants";
import {projectService} from "../../_services/project.service";

class ProcessOrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            managers: [],
            developers: [],
        };
    }

    componentDidMount() {
        let self = this;

        userService.getAll().then(
            users => {
                self.setState({managers: users.filter(u => u.roles.includes(Role.Manager))}, () => {
                    if (self.state.managers[0]) self.setState({manager_id: self.state.managers[0].id})
                });
                self.setState({developers: users.filter(u => u.roles.includes(Role.Developer))});
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

        let project = {
            name: state.name,
            budget: state.budget,
            order: self.props.order,
            projectManager: { id: state.manager_id },
            developers: state.developersTeam,
        };

        projectService.create(project).then(
            history.push('/')
        );
    };

    render() {
        let self = this;

        return (
            <Modal {...this.props} className="inmodal animated bounceInRight">
                    <Modal.Header>
                        <h4 className="modal-title">Create Project</h4>
                        <small className="font-bold">Please fill fields required for Project creation</small>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={1}/>
                            <Col lg={10}>
                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl onChange={e => this.setState({name: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Budget</ControlLabel>
                                    <FormControl type="number" value={this.state.budget} onChange={e => this.setState({budget: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Manager</ControlLabel>
                                    <select className="form-control" onChange={(e) => self.setState({manager_id: e.target.value})}>
                                        {self.state.managers.map(manager => <option key={manager.id} value={manager.id}>{manager.fullName}</option>)}
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Developers' team</ControlLabel>
                                    <FormControl componentClass="select"
                                                 onChange={(e) => self.setState({developersTeam: [].slice.call(e.target.selectedOptions).map(o => ({id: o.value}))})}
                                                 multiple>
                                        {self.state.developers.map(manager => <option key={manager.id} value={manager.id}>{manager.fullName}</option>)}
                                    </FormControl>
                                </FormGroup>

                                {/*<FormGroup>*/}
                                {/*<ControlLabel>Due Date</ControlLabel>*/}
                                {/*<DatePicker id="example-datepicker"*/}
                                {/*minDate={new Date().toISOString()}*/}
                                {/*dateFormat="DD/MM/YYYY"*/}
                                {/*value={this.state.date}*/}
                                {/*onChange={this.changeDate}*/}
                                {/*/>*/}
                                {/*</FormGroup>*/}
                            </Col>
                            <Col lg={1}/>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="white" onClick={this.props.onHide}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.onSubmit}>
                            <i className="fa fa-dot-circle-o"/> Confirm Order
                        </Button>
                    </Modal.Footer>
            </Modal>
        );
    };
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ProcessOrderModal);