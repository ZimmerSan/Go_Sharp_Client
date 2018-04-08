import React from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class SiteTemplateShort extends React.Component {
    render() {
        const { template } = this.props;
        return (
            <Col md={3}>
                <div className="ibox">
                    <div className="ibox-content product-box">
                        {template.imageUrl
                            ? <img src={template.imageUrl} style={{maxWidth: '245.25px'}}/>
                            : <div className="product-imitation">[ INFO ]</div>}
                        <div className="product-desc">
                            <span className="product-price">
                                ${template.price}
                            </span>
                            <small className="text-muted">
                                {template.category}
                            </small>
                            <Link to={'/siteTemplates/' + template. id} className="product-name">
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