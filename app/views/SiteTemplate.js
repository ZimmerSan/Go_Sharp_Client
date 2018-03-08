import React, { Component } from 'react';
import { Link, Location } from 'react-router';
import BreadCrumbs from "../components/common/Breadcrumbs";
import {Clearfix, Col, Grid, Row} from "react-bootstrap";
import SiteTemplateShort from "../components/partials/SiteTemplateShort";

const initialState = {
    siteTemplate: {
        title: 'Title',
        price: 15.2,
        category: 'Blog',
        shortDescription: 'Many desktop publishing packages and web page editors now.',
        description: 'Many desktop publishing packages and web page editors now. Many desktop publishing packages and web page editors now. Many desktop publishing packages and web page editors now.',
    }
};

class SiteTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        let self = this;
        let template = self.state.siteTemplate;

        let breadCrumbsElements = [
            {link: '/siteTemplates', name: 'Site Templates'},
            {link: '/siteTemplates/' + template.id, name: template.title},
        ];

        return (
            <div>
                <BreadCrumbs pageTitle={template.title} elements={breadCrumbsElements}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Row>
                        <Col lg={12}>
                            <div className="ibox product-detail">
                                <div className="ibox-content">
                                    <Row>
                                        <div className="col-md-5">
                                            <div className="product-images">
                                                <div>
                                                    <div className="image-imitation">
                                                        [IMAGE 1]
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">

                                            <h2 className="font-bold m-b-xs">
                                                {template.title}
                                            </h2>
                                            <small>{template.shortDescription}</small>
                                            <hr/>
                                            <div>
                                                <button className="btn btn-primary pull-right">
                                                    <i className="fa fa-cart-plus"/> Add to cart
                                                </button>
                                                <h1 className="product-main-price">
                                                    ${template.price}
                                                </h1>
                                            </div>
                                            <hr/>
                                            <h4>Product description</h4>

                                            <div className="small text-muted">
                                                {template.description}
                                            </div>
                                            <dl className="dl-horizontal m-t-md small">
                                                <dt>Description lists</dt>
                                                <dd>A description list is perfect for defining terms.</dd>
                                                <dt>Euismod</dt>
                                                <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio
                                                    sem nec elit.
                                                </dd>
                                                <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                                                <dt>Malesuada porta</dt>
                                                <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                                                <dt>Felis euismod semper eget</dt>
                                                <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
                                                    nibh, ut fermentum massa justo sit amet risus.
                                                </dd>
                                            </dl>
                                            <div className="text-right">
                                                <div className="btn-group">
                                                    <button className="btn btn-white btn-sm"><i
                                                        className="fa fa-star"></i> Add to wishlist
                                                    </button>
                                                    <button className="btn btn-white btn-sm"><i
                                                        className="fa fa-envelope"></i> Contact with author
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                    </Row>

                                </div>
                                <div className="ibox-footer">
                            <span className="pull-right">
                                Full stock - <i className="fa fa-clock-o"></i> 14.04.2016 10:04 pm
                            </span>
                                    The generated Lorem Ipsum is therefore always free
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default SiteTemplate