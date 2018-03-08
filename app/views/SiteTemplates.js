import React, { Component } from 'react';
import { Link, Location } from 'react-router';
import BreadCrumbs from "../components/common/Breadcrumbs";
import {Clearfix, Col, Grid, Row} from "react-bootstrap";
import SiteTemplateShort from "../components/partials/SiteTemplateShort";
import {getAllSiteTemplates} from "../api/SiteTemplateRequests";

const initialState = {
    siteTemplates: [],
};

const breadCrumbsElements = [
    {link: '/siteTemplates', name: 'Site Templates'}
];

class SiteTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    renderRow = (templates) => {
        return (
            <Row>
            {templates.map(template => <SiteTemplateShort template={template}/>)}
            </Row>)
    };

    render() {
        let self = this;

        let rows = [];
        let templates = [];

        self.state.siteTemplates.forEach((template, index) => {
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
                    {rows}
                </div>
            </div>
        )
    }

}

export default SiteTemplates