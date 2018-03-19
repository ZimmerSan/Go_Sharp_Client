import React, {Component} from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Button, Col, FormGroup, Row} from "react-bootstrap";
import ReactSummernote from 'react-summernote';
import {SITE_TEMPLATE_CATEGORIES} from '../../constants'
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-es-EU'
import {siteTemplateService} from "../../_services";
import { history } from '../../_helpers';
import {connect} from "react-redux";
import {siteTemplateActions} from "../../_actions/site-template.actions";

const initialState = {
    title: '',
    price: undefined,
    category: '',
    description: '',
    shortDescription: '',
    imageUrl: '',

    siteTemplate: {},
};

class SiteTemplateEditView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.props.dispatch(siteTemplateActions.findOne(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.siteTemplate) {
            let item = nextProps.siteTemplate;
            this.setState({
                siteTemplate: item,

                title: item.title,
                price: item.price,
                category: item.category,
                description: item.description,
                shortDescription: item.shortDescription,
                imageUrl: item.imageUrl,
            });
        }
    }

    onSubmit = () => {
        let template = {
            id: this.state.siteTemplate.id,

            title: this.state.title,
            price: this.state.price,
            category: this.state.category,
            description: this.state.description,
            shortDescription: this.state.shortDescription,
            imageUrl: this.state.imageUrl,
        };
        this.props.dispatch(siteTemplateActions.update(template));
        history.push('/siteTemplates/' + template.id);
    };

    render() {
        let self = this;
        let state = self.state;

        let breadCrumbsElements = [
            {link: '/siteTemplates', name: 'Site Templates'},
            {link: '/siteTemplates/' + state.siteTemplate.id, name: state.siteTemplate.title},
            {link: '/siteTemplates/' + state.siteTemplate.id + '/edit', name: 'Edit'},
        ];

        let saveBtn = <Button bsStyle="primary" onClick={self.onSubmit}><i className="fa fa-check"/> Save </Button>;

        return (
            <div>
                <BreadCrumbs pageTitle={'Edit ' + state.siteTemplate.title} elements={breadCrumbsElements} buttons={saveBtn}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Row>
                        <Col lg={12}>
                            <div className="tabs-container">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a data-toggle="tab" href="#tab-1"> Template info <span
                                        className="label label-primary">edit</span></a></li>
                                </ul>
                                <div className="tab-content">
                                    <div id="tab-1" className="tab-pane active">
                                        <div className="panel-body">
                                            <fieldset className="form-horizontal">
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Title:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" value={state.title}
                                                               onChange={(e) => self.setState({title: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Price:</label>
                                                    <div className="col-sm-10">
                                                        <input type="number" className="form-control"
                                                               value={state.price}
                                                               onChange={(e) => self.setState({price: e.target.value})}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Category:</label>
                                                    <div className="col-sm-10">
                                                        <select className="form-control" value={state.category}
                                                                onChange={(e) => self.setState({category: e.target.value})}>
                                                            {SITE_TEMPLATE_CATEGORIES.map(cat => <option key={cat}
                                                                                                         value={cat}>{cat}</option>)}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="col-sm-2 control-label">Short Description:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control"
                                                               value={state.shortDescription}
                                                               onChange={(e) => self.setState({shortDescription: e.target.value})}/>
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
                                                                    ['fontsize', ['fontsize']],
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
                                                        <input type="text" className="form-control"
                                                               value={state.imageUrl}
                                                               onChange={(e) => self.setState({imageUrl: e.target.value})}/>
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
                            {saveBtn}
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

export default connect(mapStateToProps)(SiteTemplateEditView);