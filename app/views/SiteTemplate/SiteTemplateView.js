import React, { Component } from 'react';
import BreadCrumbs from "../../components/common/Breadcrumbs";
import {Col, Row} from "react-bootstrap";
import SiteTemplateFull from "../../components/partials/SiteTemplateFull";
import {findSiteTemplate} from "../../api/SiteTemplateRequests";

const initialState = {
    siteTemplate: {}
};

class SiteTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        findSiteTemplate(this.props.match.params.id, res => this.setState({
            siteTemplate: res,
        }));
    }

    render() {
        let self = this;
        let template = self.state.siteTemplate;

        let breadCrumbsElements = [
            {link: '/siteTemplates', name: 'Site Templates'},
            {link: '/siteTemplates/' + template.Id, name: template.Title},
        ];

        return (
            <div>
                <BreadCrumbs pageTitle={template.Title} elements={breadCrumbsElements}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Row>
                        <Col lg={12}>
                            <SiteTemplateFull template={self.state.siteTemplate}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default SiteTemplate