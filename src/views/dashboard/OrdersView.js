import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import IboxTools from "../../_components/common/IboxTools";
import {orderActions} from "../../_actions/index";
import {connect} from "react-redux";
import ProcessOrderModal from "../../_components/partials/ProcessOrderModal";
import {Status, StatusLabelStyle} from "../../constants";
import BreadCrumbs from "../../_components/common/Breadcrumbs";

const initialState = {
    showProcessOrderModal: false
};

class OrdersView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.props.dispatch(orderActions.findAll());
    }

    showModal = (order, stateParam) => {
        this.setState({
            order,
            [stateParam]: true
        });
    };

    hideModal = (stateParam) => {
        this.setState({ [stateParam]: false });
    };

    render() {
        const { orders } = this.props;

        let breadCrumbsElements = [
            {link: '/dashboard', name: 'Dashboard'},
            {link: '/dashboard/orders', name: 'Orders'},
        ];
        let breadCrumbs = <BreadCrumbs pageTitle={'Orders'} elements={breadCrumbsElements}/>;

        return ([
            breadCrumbs,
            <div className="wrapper wrapper-content animated fadeIn">
                <div className="ibox-content m-b-sm border-bottom">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="control-label" htmlFor="order_id">Order ID</label>
                                <input type="text" id="order_id" name="order_id" value="" placeholder="Order ID" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="control-label" htmlFor="status">Order status</label>
                                <input type="text" id="status" name="status" value="" placeholder="Status" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="control-label" htmlFor="customer">Customer</label>
                                <input type="text" id="customer" name="customer" value="" placeholder="Customer" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>

                {orders &&
                <Row>
                    <Col lg={12}>
                        <div className="ibox">
                            <ProcessOrderModal show={this.state.showProcessOrderModal} order={this.state.order} onHide={() => this.hideModal('showProcessOrderModal')}/>
                            <div className="ibox-title">
                                <h5>Orders</h5>
                                <IboxTools/>
                            </div>
                            <div className="ibox-content">

                                <table className="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                    <thead>
                                    <tr>

                                        <th>Order ID</th>
                                        <th data-hide="phone">Customer</th>
                                        <th data-hide="phone">Amount</th>
                                        <th data-hide="phone">Date added</th>
                                        <th data-hide="phone,tablet">Due date</th>
                                        <th data-hide="phone">Status</th>
                                        <th className="text-right">Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map(o => (
                                        <tr>
                                            <td>
                                                {o.id}
                                            </td>
                                            <td>
                                                {o.customer.fullName}
                                            </td>
                                            <td>
                                                ${o.totalPrice}
                                            </td>
                                            <td>
                                                {(new Date(o.orderDate)).toISOString().slice(0,10).replace(/-/g,"/")}
                                            </td>
                                            <td>
                                                {(new Date(o.dueDate)).toISOString().slice(0,10).replace(/-/g,"/")}
                                            </td>
                                            <td>
                                                <span className={'label ' + StatusLabelStyle[o.orderStatus]}>{o.orderStatus}</span>
                                            </td>
                                            <td className="text-right">
                                                {o.orderStatus === Status.Initial &&
                                                <button className="btn-info btn btn-xs"
                                                        onClick={() => this.showModal(o, 'showProcessOrderModal')}>
                                                    Process into Project</button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </Col>
                </Row>
                }
            </div>
            ]
        )
    }

}

let mapStateToProps = (state) => {
    const { orders } = state;

    return {
        orders: orders.items
    }
};

export default connect(mapStateToProps)(OrdersView);