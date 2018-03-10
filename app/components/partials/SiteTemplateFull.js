import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ConfirmDeleteDialog from "./ConfirmDialog";

const initialState = {
    isModalOpen: false,
};

class SiteTemplateFull extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    openModal = () => this.setState({isModalOpen: true});

    closeModal = () => this.setState({isModalOpen: false});

    render() {
        let template = this.props.template;
        return (
            <div className="ibox product-detail">
                <ConfirmDeleteDialog show={this.state.isModalOpen} onHide={this.closeModal} template={template}/>
                <div className="ibox-content">
                    <Row>
                        <div className="col-md-5">
                            <div className="product-images">
                                <div>
                                    {template.ImageUrl ? <img src={template.ImageUrl}/> : <div className="image-imitation">[IMAGE]</div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">

                            <h2 className="font-bold m-b-xs">
                                {template.Title}
                            </h2>
                            <small>{template.ShortDescription}</small>
                            <hr/>
                            <div>
                                <button className="btn btn-primary pull-right">
                                    <i className="fa fa-cart-plus"/> Add to cart
                                </button>
                                <h1 className="product-main-price">
                                    ${template.Price}
                                </h1>
                            </div>
                            <hr/>
                            <h4>Product description</h4>

                            <div className="small text-muted" dangerouslySetInnerHTML={{__html: template.Description}}/>
                            <dl className="dl-horizontal m-t-md small">
                                <dt>Category</dt>
                                <dd>{template.Category}</dd>
                            </dl>
                            <div className="text-right">
                                <div className="btn-group">
                                    <Link to={'/siteTemplates/' + template.Id + '/edit'} className="btn btn-white btn-sm">
                                        <i className="fa fa-gear"></i> Edit
                                    </Link>
                                    <Button bsSize="sm" bsStyle="danger" onClick={this.openModal}>
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
        )
    }
}

export default SiteTemplateFull