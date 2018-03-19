import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {history} from '../../_helpers'
import DatePicker from 'react-16-bootstrap-date-picker';
import {connect} from "react-redux";
import {orderActions} from "../../_actions";

class ConfirmCheckoutModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit = () => {
        let self = this;

        let order = {
            dueDate: self.state.date,
            description: self.state.description,
        };

        this.props.dispatch(orderActions.create(order));
        history.push('/');
    };

    changeDate = (date) => {
        this.setState({
            date: date
        });
    };

    render() {
        const {cart, loading} = this.props;

        return (
        <div className="modal inmodal" id="confirmCheckoutModal" tabIndex="-1" role="dialog"  aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content animated bounceInRight">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        <i className="fa fa-laptop modal-icon"/>
                        <h4 className="modal-title">Checkout</h4>
                        <small className="font-bold">Please fill fields required for Order creation</small>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl onChange={e => this.setState({description: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Due Date</ControlLabel>
                            <DatePicker id="example-datepicker"
                                        minDate={new Date().toISOString()}
                                        dateFormat="DD/MM/YYYY"
                                        value={this.state.date}
                                        onChange={this.changeDate}
                            />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle="white" data-dismiss="modal">Cancel</Button>
                        <Button bsStyle="primary" disabled={loading} onClick={this.onSubmit} data-dismiss="modal" >
                            <i className="fa fa-dot-circle-o"/> Confirm Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        );
    };
}

function mapStateToProps(state) {
    const { loading, created_item } = state.orders;
    return {
        loading,
        created_order: created_item
    }
}

export default connect(mapStateToProps)(ConfirmCheckoutModal);