import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import IboxTools from "../../_components/common/IboxTools";
import {orderActions} from "../../_actions/index";
import {connect} from "react-redux";
import ProcessOrderModal from "../../_components/partials/ProcessOrderModal";
import {Role, Status, StatusLabelStyle} from "../../constants";
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {checkRole} from "../../_helpers/index";
import {Link} from "react-router-dom";

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
        let orders = this.props.orders ? this.props.orders : [];

        let { authUser } = this.props;
        let roles = authUser.roles ? authUser.roles : [Role.Customer];

        if (roles.includes(Role.Customer)) {
            orders = orders.filter(o => o.customer.id === authUser.id)
        }

        let breadCrumbsElements = [
            {link: '/dashboard', name: 'Dashboard'},
            {link: '/dashboard/orders', name: 'Orders'},
        ];
        let breadCrumbs = <BreadCrumbs pageTitle={'Orders'} elements={breadCrumbsElements}/>;

        return ([
            breadCrumbs,
            <div className="wrapper wrapper-content animated fadeIn">
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
                                { orders && orders[0] ?
                                    <table className="footable table table-stripped toggle-arrow-tiny"
                                           data-page-size="15">
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th data-hide="phone">Customer</th>
                                            <th data-hide="phone">Amount</th>
                                            <th data-hide="phone">Date added</th>
                                            <th data-hide="phone,tablet">Due date</th>
                                            <th data-hide="phone">Status</th>
                                            { checkRole(roles, [Role.Admin, Role.Manager]) &&
                                            <th className="text-right">Action</th>
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders.map(o => (
                                            <tr>
                                                <td>
                                                    {o.id}
                                                </td>
                                                <td>
                                                    <Link to={`/users/${o.customer.id}`}>{o.customer.fullName}</Link>
                                                </td>
                                                <td>
                                                    ${o.totalPrice}
                                                </td>
                                                <td>
                                                    {(new Date(o.orderDate)).toISOString().slice(0, 10).replace(/-/g, "/")}
                                                </td>
                                                <td>
                                                    {(new Date(o.dueDate)).toISOString().slice(0, 10).replace(/-/g, "/")}
                                                </td>
                                                <td>
                                                    <span
                                                        className={'label ' + StatusLabelStyle[o.orderStatus]}>{o.orderStatus}</span>
                                                </td>
                                                { checkRole(roles, [Role.Admin, Role.Manager]) &&
                                                <td className="text-right">
                                                    {o.orderStatus === Status.Initial &&
                                                    <button className="btn-info btn btn-xs"
                                                            onClick={() => this.showModal(o, 'showProcessOrderModal')}>
                                                        Process into Project</button>
                                                    }
                                                </td>
                                                }
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                        : <div className="text-center">Seems like you have no Orders...</div>
                                }

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
    const { user } = state.authentication;
    return {
        orders: orders.items,
        authUser: user
    }
};

export default connect(mapStateToProps)(OrdersView);