import React from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router";

class SiteTemplateShort extends React.Component {
    render() {
        let template = this.props.template;
        return (
            <Col md={3}>
                <div className="ibox">
                    <div className="ibox-content product-box">
                        <div className="product-imitation">
                            [ INFO ]
                        </div>
                        <div className="product-desc">
                            <span className="product-price">
                                ${template.price}
                            </span>
                            <small className="text-muted">
                                {template.category}
                            </small>
                            <Link to={'/siteTemplates/' + template.id} className="product-name">
                                {template.title}
                            </Link>
                            <div className="small m-t-xs">
                                {template.shortDescription}
                            </div>
                            <div className="m-t text-righ">
                                <Link to={'/siteTemplates/' + template.id} className="btn btn-xs btn-outline btn-primary">
                                    Info <i className="fa fa-long-arrow-right"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}

export default SiteTemplateShort