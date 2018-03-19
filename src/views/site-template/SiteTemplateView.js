import React, { Component } from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Button, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {siteTemplateActions} from "../../_actions/site-template.actions";
import ConfirmDeleteModal from "../../_components/partials/ConfirmDeleteModal";
import {Link} from "react-router-dom";
import {cartActions} from "../../_actions/cart.actions";

class SiteTemplate extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(siteTemplateActions.findOne(this.props.match.params.id));
    }

    addToCart = () => {
        const {dispatch, siteTemplate} = this.props;
        dispatch(cartActions.addItem(siteTemplate.id));
    };

    render() {
        let self = this;

        const {isLoading, error}  = self.props;

        const siteTemplate = self.props.siteTemplate ? self.props.siteTemplate : {};

        let breadCrumbsElements = [
            {link: '/siteTemplates', name: 'Site Templates'},
            {link: '/siteTemplates/' + siteTemplate.id, name: siteTemplate.title},
        ];

        return (
            <div>
                <BreadCrumbs pageTitle={siteTemplate.title} elements={breadCrumbsElements}/>
                <div className="wrapper wrapper-content animated fadeIn">
                    <Row>
                        <Col lg={12}>
                            <div className="ibox product-detail">
                                <ConfirmDeleteModal template={siteTemplate}/>
                                <div className="ibox-content">
                                    <Row>
                                        <div className="col-md-5">
                                            <div className="product-images">
                                                <div>
                                                    {siteTemplate.imageUrl ? <img src={siteTemplate.imageUrl}/> : <div className="image-imitation">[IMAGE]</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">

                                            <h2 className="font-bold m-b-xs">
                                                {siteTemplate.title}
                                            </h2>
                                            <small>{siteTemplate.shortDescription}</small>
                                            <hr/>
                                            <div>
                                                <button onClick={this.addToCart} className="btn btn-primary pull-right">
                                                    <i className="fa fa-cart-plus"/> Add to cart
                                                </button>
                                                <h1 className="product-main-price">
                                                    ${siteTemplate.price}
                                                </h1>
                                            </div>
                                            <hr/>
                                            <h4>Product description</h4>

                                            <div className="small text-muted" dangerouslySetInnerHTML={{__html: siteTemplate.description}}/>
                                            <dl className="dl-horizontal m-t-md small">
                                                <dt>Category</dt>
                                                <dd>{siteTemplate.category}</dd>
                                            </dl>
                                            <div className="text-right">
                                                <div className="btn-group">
                                                    <Link to={'/siteTemplates/' + siteTemplate.id + '/edit'} className="btn btn-white btn-sm">
                                                        <i className="fa fa-gear"></i> Edit
                                                    </Link>
                                                    <Button bsSize="sm" bsStyle="danger" data-toggle="modal" data-target="#confirmDeleteModal">
                                                        <i className="fa fa-trash"></i> Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                                <div className="ibox-footer">
                                    ©️ All rights reserved
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
    const { loading, item, error } = state.siteTemplates;
    return {
        isLoading: loading,
        siteTemplate: item,
        error
    }
}

export default connect(mapStateToProps)(SiteTemplate);