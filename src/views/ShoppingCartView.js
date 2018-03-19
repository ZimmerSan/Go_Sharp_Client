import React, { Component } from 'react';
import BreadCrumbs from "../_components/common/Breadcrumbs";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {cartActions} from "../_actions/cart.actions";
import {Link} from "react-router-dom";
import ConfirmCheckoutModal from "../_components/partials/ConfirmCheckoutModal";

class ShoppingCartView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(cartActions.getCart());
    }

    removeItem = (id) => {
        this.props.dispatch(cartActions.deleteItem(id));
    };

    render() {
        const {isLoading, cart, error}  = this.props;

        let breadCrumbsElements = [
            {link: '/cart', name: 'Shopping Cart'},
        ];

        if (!cart) return <div/>;
        else
        return (
            <div>
                <ConfirmCheckoutModal cart={cart}/>

                <BreadCrumbs pageTitle="Shopping Cart" elements={breadCrumbsElements}/>
                <div className="wrapper wrapper-content animated fadeIn">
                    <Row>
                        <Col md={9}>
                            <div className="ibox">
                                <div className="ibox-title">
                                    <span className="pull-right">(<strong>{cart.itemsCount}</strong>) items</span>
                                    <h5>Items in your cart</h5>
                                </div>
                                {cart.cartRecords.map(rec => (
                                    <div className="ibox-content">
                                        <div className="table-responsive">
                                            <table className="table shoping-cart-table">
                                                <tbody>
                                                <tr>
                                                    <td width="90">
                                                        <div className="cart-product-imitation">
                                                        </div>
                                                    </td>
                                                    <td className="desc">
                                                        <h3>
                                                            <Link to={'/siteTemplates/' + rec.siteTemplate.id} className="text-navy">
                                                                {rec.siteTemplate.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="small">
                                                            {rec.siteTemplate.shortDescription}
                                                        </p>
                                                        <dl className="small m-b-none">
                                                            <dt>Category</dt>
                                                            <dd>{rec.siteTemplate.category}</dd>
                                                        </dl>

                                                        <div className="m-t-sm">
                                                            <a onClick={() => this.removeItem(rec.siteTemplate.id)} className="text-muted"><i className="fa fa-trash"></i> Remove item</a>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        ${rec.siteTemplate.price}
                                                    </td>
                                                    <td width="65">
                                                        <input type="text" className="form-control" value={rec.count}/>
                                                    </td>
                                                    <td>
                                                        <h4>
                                                            ${rec.count * rec.siteTemplate.price}
                                                        </h4>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                ))}
                                <div className="ibox-content">
                                    <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#confirmCheckoutModal">
                                        <i className="fa fa fa-shopping-cart"></i> Checkout
                                    </button>
                                    <Link to={"/siteTemplates"} className="btn btn-white"><i className="fa fa-arrow-left"></i> Continue shopping</Link>
                                </div>
                            </div>

                        </Col>
                        <Col md={3}>

                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Cart Summary</h5>
                                </div>
                                <div className="ibox-content">
                            <span>
                                Total
                            </span>
                                    <h2 className="font-bold">
                                        ${cart.totalPrice}
                                    </h2>
                                    <hr/>
                                    <div className="m-t-sm">
                                        <div className="btn-group">
                                            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#confirmCheckoutModal">
                                                <i className="fa fa-shopping-cart"></i> Checkout
                                            </button>
                                            <Link to="/siteTemplates" className="btn btn-white btn-sm"> Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Support</h5>
                                </div>
                                <div className="ibox-content text-center">



                                    <h3><i className="fa fa-phone"></i> +43 100 783 001</h3>
                                    <span className="small">
                                Please contact with us if you have any questions. We are avalible 24h.
                            </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const { loading, item, error } = state.cart;
    return {
        isLoading: loading,
        cart: item,
        error
    }
}

export default connect(mapStateToProps)(ShoppingCartView);