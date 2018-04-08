import React, { Component } from 'react';
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Col,  Row} from "react-bootstrap";
import SiteTemplateShort from "../../_components/partials/SiteTemplateShort";
import {Link} from "react-router-dom";
import {siteTemplateActions} from "../../_actions";
import {connect} from "react-redux";
import {checkRole} from "../../_helpers/index";
import {Role} from "../../constants";

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

    componentDidMount(){
        this.props.dispatch(siteTemplateActions.findAll());
    }

    renderRow = (templates) => {
        return (
            <Row>
            {templates.map(template => <SiteTemplateShort key={template.id} template={template}/>)}
            </Row>)
    };

    render() {
        let self = this;

        const {isLoading, siteTemplates, error, user}  = self.props;

        let rows = [];
        if (siteTemplates) {
            let templates = [];

            siteTemplates.forEach((template, index) => {
                templates.push(template);
                if (index % 4 === 3) {
                    rows.push(self.renderRow(templates));
                    templates = [];
                }
            });

            if (templates.length) {
                rows.push(self.renderRow(templates));
            }
        }

        let createBtn = checkRole(user.roles, [Role.Admin, Role.Manager])
            ? <Link to={'/siteTemplates/create'} className="btn btn-primary"><i className="fa fa-plus-circle"/> Add new Template</Link>
            : undefined;

        return (
            [
                <BreadCrumbs pageTitle="Site Templates" elements={breadCrumbsElements} buttons={[createBtn]}/>,
                <div className="wrapper wrapper-content animated fadeInRight">
                    {rows}
                </div>
            ]
        )
    }

}

function mapStateToProps(state) {
    const { loading, items, error } = state.siteTemplates;
    const { user } = state.authentication;
    return {
        isLoading: loading,
        siteTemplates: items,
        error,
        user
    }
}

const connectedSiteTemplates = connect(mapStateToProps)(SiteTemplates);
export default connectedSiteTemplates;