import React, { Component } from 'react';
import BreadCrumbs from "../../components/common/Breadcrumbs";
import {Clearfix, Col, Grid, Row} from "react-bootstrap";
import SiteTemplateShort from "../../components/partials/SiteTemplateShort";
import {connect} from "react-redux";
import {loadSiteTemplates} from "../../api/SiteTemplateRequests";
import {Link} from "react-router-dom";

const initialState = {

};

const breadCrumbsElements = [
    {link: '/siteTemplates', name: 'Site Templates'}
];

class SiteTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        loadSiteTemplates();
    }

    renderRow = (templates) => {
        return (
            <Row>
            {templates.map(template => <SiteTemplateShort key={template.Id} template={template}/>)}
            </Row>)
    };

    render() {
        let self = this;

        let rows = [];
        let templates = [];

        self.props.siteTemplates.forEach((template, index) => {
            templates.push(template);
            if (index % 4 === 3) {
                rows.push(self.renderRow(templates));
                templates = [];
            }
        });

        if (templates.length) {
            rows.push(self.renderRow(templates));
        }

        return (
            <div>
                <BreadCrumbs pageTitle="Site Templates" elements={breadCrumbsElements}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Row>
                        <Col lg={4}>
                            <Link to={'/siteTemplates/create'} className="btn btn-primary"><i className="fa fa-plus-circle"/> Add new Template</Link>
                        </Col>
                    </Row>
                    <br/>
                    {rows}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {
        siteTemplates: state.siteTemplates,
    });

export default connect(mapStateToProps)(SiteTemplates);