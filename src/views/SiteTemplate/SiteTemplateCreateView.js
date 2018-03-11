import React, { Component } from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Button, Col, FormGroup, Row} from "react-bootstrap";
import ReactSummernote from 'react-summernote';
import {SITE_TEMPLATE_CATEGORIES} from '../../constants'
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-es-EU'
import {siteTemplateService} from "../../_services/site-template.service";
import {history} from '../../_helpers'
import {connect} from "react-redux";
import {siteTemplateActions} from "../../_actions/site-template.actions";

const initialState = {
    title: '',
    price: undefined,
    category: 'Blog',
    description: '',
    shortDescription: '',
    imageUrl: '',
};

class SiteTemplateCreateView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onSubmit = () => {
        let template = {
            title: this.state.title,
            price: this.state.price,
            category: this.state.category,
            description: this.state.description,
            shortDescription: this.state.shortDescription,
            imageUrl: this.state.imageUrl,
        };
        this.props.dispatch(siteTemplateActions.create(template));
        history.push('/siteTemplates');
    };

    render() {
        let self = this;
        let state = self.state;

        let breadCrumbsElements = [
            {link: '/siteTemplates', name: 'Site Templates'},
            {link: '/siteTemplates/create', name: 'Create'},
        ];

        let createBtn = <Button bsStyle="primary" onClick={self.onSubmit}><i className="fa fa-check-circle"/> Create</Button>;
        return (
            <div>
                <BreadCrumbs pageTitle={'Create Site Template'} elements={breadCrumbsElements} buttons={createBtn}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Row>
                        <Col lg={12}>
                            <div className="tabs-container">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a data-toggle="tab" href="#tab-1"> Template info  <span className="label label-primary">new</span></a></li>
                                </ul>
                                <div className="tab-content">
                                    <div id="tab-1" className="tab-pane active">
                                        <div className="panel-body">
                                            <fieldset className="form-horizontal">
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Title:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" value={state.title} onChange={(e) => self.setState({title: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Price:</label>
                                                    <div className="col-sm-10">
                                                        <input type="number" className="form-control" value={state.price} onChange={(e) => self.setState({price: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Category:</label>
                                                    <div className="col-sm-10">
                                                        <select className="form-control" value={state.category} onChange={(e) => self.setState({category: e.target.value})}>
                                                            {SITE_TEMPLATE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Short Description:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" value={state.shortDescription} onChange={(e) => self.setState({shortDescription: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Description:</label>
                                                    <div className="col-sm-10">
                                                        <ReactSummernote
                                                            value={state.description}
                                                            options={{
                                                                height: 200,
                                                                dialogsInBody: true,
                                                                toolbar: [
                                                                    ['font', ['bold', 'underline', 'clear']],
                                                                    ['para', ['ul', 'ol', 'paragraph']],
                                                                    ['insert', ['link']],
                                                                    ['view', ['codeview']]
                                                                ]
                                                            }}
                                                            onChange={(e) => self.setState({description: e})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Image URL:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" value={state.imageUrl} onChange={(e) => self.setState({imageUrl: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col lg={12} className="text-center">
                            {createBtn}
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

export default connect(mapStateToProps)(SiteTemplateCreateView);