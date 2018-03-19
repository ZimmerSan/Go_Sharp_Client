import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import IboxTools from "../../_components/common/IboxTools";
import {projectActions} from "../../_actions";
import {connect} from "react-redux";
import ProcessOrderModal from "../../_components/partials/ProcessOrderModal";
import {StatusLabelStyle} from "../../constants";
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Link} from "react-router-dom";
import CreateTaskModal from "../../_components/partials/CreateTaskModal";

const initialState = {
    showCreateTaskModal: false
};

class ProjectDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.props.dispatch(projectActions.findOne(this.props.match.params.id));
        $('.pie').peity('pie');
    }

    showModal = (stateParam) => {
        this.setState({
            [stateParam]: true
        });
    };

    hideModal = (stateParam) => {
        this.setState({ [stateParam]: false });
    };

    render() {
        let self = this;
        const project = self.props.project ? self.props.project : {};

        let breadCrumbsElements = [
            {link: '/dashboard', name: 'Dashboard'},
            {link: '/dashboard/projects', name: 'Projects'},
            {link: '/dashboard/projects/' + project.id, name: project.name},
        ];
        let breadCrumbs = <BreadCrumbs pageTitle={project.name} elements={breadCrumbsElements}/>;

        let progress = project.id ? 100 * (new Date().getTime() - new Date(project.createdDate).getTime()) / (new Date(project.dueDate).getTime() - new Date(project.createdDate).getTime()) : 1;

        return ([
            breadCrumbs,
                <div className="wrapper wrapper-content animated fadeIn">
                    {project.id &&
                    <div className="row">
                        <CreateTaskModal
                            show={this.state.showCreateTaskModal}
                            project={project}
                            onHide={() => this.hideModal('showCreateTaskModal')}
                        />
                        <div className="col-lg-10">
                            <div className="wrapper wrapper-content animated fadeInUp">
                                <div className="ibox">
                                    <div className="ibox-content">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="m-b-md">
                                                    <Link to={'/dashboard/projects/' + project.id + '/edit'}
                                                          className="btn btn-white btn-xs pull-right">Edit
                                                        project</Link>
                                                    <h2>{project.name}</h2>
                                                </div>
                                                <dl className="dl-horizontal">
                                                    <dt>Status:</dt>
                                                    <dd><span
                                                        className={'label ' + StatusLabelStyle[project.projectStatus]}>{project.projectStatus}</span>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <dl className="dl-horizontal">

                                                    <dt>Managed by:</dt>
                                                    <dd>
                                                        <Link to={'/users/' + project.projectManager.id} className="text-navy">{project.projectManager.fullName}</Link>
                                                    </dd>
                                                    <dt>Budget:</dt>
                                                    <dd> ${project.budget}</dd>
                                                    <dt>Version:</dt>
                                                    <dd> v1.0.0</dd>
                                                </dl>
                                            </div>
                                            <div className="col-lg-7" id="cluster_info">
                                                <dl className="dl-horizontal">

                                                    <dt>Due Date:</dt>
                                                    <dd>{(new Date(project.dueDate)).toISOString().slice(0, 10).replace(/-/g, ".")}</dd>
                                                    <dt>Created:</dt>
                                                    <dd>{(new Date(project.createdDate)).toISOString().slice(0, 10).replace(/-/g, ".")}</dd>
                                                    <dt>Developers:</dt>
                                                    <dd className="project-people">
                                                        {project.developers.map(dev => [
                                                            <Link to={'/users/' + dev.id} className="text-navy">
                                                                <img alt="image" className="img-circle" src="/img/a6.jpg"/>
                                                            </Link>,
                                                            ' '
                                                        ])}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <dl className="dl-horizontal">
                                                    <dt>Completed:</dt>
                                                    <dd>
                                                        <div className="progress progress-striped active m-b-sm">
                                                            <div style={{width: progress + '%'}} className="progress-bar"/>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="row m-t-sm">
                                            <div className="col-lg-12">
                                                <div className="panel blank-panel">
                                                    <div className="panel-heading">
                                                        <div className="panel-options">
                                                            <ul className="nav nav-tabs">
                                                                <li className=""><a href="#tab-2" data-toggle="tab">Tasks</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="panel-body">

                                                        <div className="tab-content">
                                                            <div className="tab-pane active" id="tab-2">
                                                                
                                                                <div className="m-t-md">
                                                                    <div className="pull-right">
                                                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.showModal('showCreateTaskModal')}> <i className="fa fa-pencil"></i> Add Task</button>
                                                                    </div>
                                                                    <strong>Found 61 issues.</strong>
                                                                </div>
                                                                <br/>
                                                                <table className="table table-hover issue-tracker">
                                                                    <tbody>
                                                                    {project.workItems.map(wi => 
                                                                    <tr>
                                                                        <td>
                                                                            <span className={'label ' + StatusLabelStyle[wi.status]}>
                                                                                {wi.status}
                                                                            </span>
                                                                        </td>
                                                                        <td className="issue-info">
                                                                            <a href="#">{wi.name}</a>

                                                                            <small>
                                                                                {wi.description}
                                                                            </small>
                                                                        </td>
                                                                        <td>
                                                                            <Link to={'/users/' + wi.assignedDeveloper.id}>
                                                                                {wi.assignedDeveloper.fullName}
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            {(new Date(wi.dueDate)).toISOString().slice(0, 10).replace(/-/g, ".")}
                                                                        </td>
                                                                        <td>
                                                                            {/*<span className="pie">0.52/1.041</span>*/}
                                                                            {wi.estimatedTime}h
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <button className="btn btn-white btn-xs"> Assign</button>
                                                                        </td>
                                                                    </tr>
                                                                    )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="wrapper wrapper-content project-manager">
                                <h4>Project description</h4>
                                <p className="small">
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration in some form, by injected humour, or randomised words which
                                    don't look
                                    even slightly believable. If you are going to use a passage of Lorem Ipsum, you need
                                    to be sure there isn't anything embarrassing
                                </p>
                                <p className="small font-bold">
                                    <span><i className="fa fa-circle text-warning"></i> High priority</span>
                                </p>
                                <br/>
                                <div className="text-center m-t-md">
                                    <a href="#" className="btn btn-xs btn-primary">Report contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    }


                    {/*<Row>*/}
                    {/*<Col lg={12}>*/}
                        {/*<div className="ibox">*/}
                            {/*<div className="ibox-title">*/}
                                {/*<h5>All projects assigned to this account</h5>*/}
                                {/*<div className="ibox-tools">*/}
                                    {/*<a href="" className="btn btn-primary btn-xs">Create new project</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="ibox-content">*/}
                                {/*<div className="row m-b-sm m-t-sm">*/}
                                    {/*<div className="col-md-1">*/}
                                        {/*<button type="button" id="loading-example-btn" className="btn btn-white btn-sm" ><i className="fa fa-refresh"></i> Refresh</button>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-md-11">*/}
                                        {/*<div className="input-group"><input type="text" placeholder="Search" className="input-sm form-control"/> <span className="input-group-btn">*/}
                                        {/*<button type="button" className="btn btn-sm btn-primary"> Go!</button> </span></div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="project-list">*/}
                                    {/*<table className="table table-hover">*/}
                                        {/*<tbody>*/}
                                        {/*{projects.map(o => (*/}
                                            {/*<tr>*/}
                                                {/*<td className="project-status">*/}
                                                    {/*<span className={'label ' + StatusLabelStyle[o.projectStatus]}>{o.projectStatus}</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="project-title">*/}
                                                    {/*<Link to={'#'}>{o.name}</Link>*/}
                                                    {/*<br/>*/}
                                                    {/*<small>Created {(new Date(o.createdDate)).toISOString().slice(0,10).replace(/-/g,"/")}</small>*/}
                                                {/*</td>*/}
                                                {/*<td className="project-completion">*/}
                                                    {/*<small>Completion with: 48%</small>*/}
                                                    {/*<div className="progress progress-mini">*/}
                                                        {/*<div style={{width: 48+'%'}} className="progress-bar"></div>*/}
                                                    {/*</div>*/}
                                                {/*</td>*/}
                                                {/*<td className="project-people">*/}
                                                    {/*<a href=""><img alt="image" className="img-circle" src="/img/a6.jpg"/></a>*/}
                                                {/*</td>*/}
                                                {/*<td className="project-people">*/}
                                                    {/*<a href=""><img alt="image" className="img-circle" src="/img/a2.jpg"/></a>*/}
                                                    {/*<a href=""><img alt="image" className="img-circle" src="/img/a2.jpg"/></a>*/}
                                                    {/*<a href=""><img alt="image" className="img-circle" src="/img/a2.jpg"/></a>*/}
                                                {/*</td>*/}
                                                {/*<td className="project-actions">*/}
                                                    {/*<a href="#" className="btn btn-white btn-sm"><i className="fa fa-folder"></i> View </a>*/}
                                                    {/*<a href="#" className="btn btn-white btn-sm"><i className="fa fa-pencil"></i> Edit </a>*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                        {/*))}*/}
                                        {/*</tbody>*/}
                                    {/*</table>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
            </div>
            ]
        )
    }

}

let mapStateToProps = (state) => {
    const { projects } = state;

    return {
        project: projects.item
    }
};

export default connect(mapStateToProps)(ProjectDetailsView);