import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import IboxTools from "../../_components/common/IboxTools";
import {projectActions} from "../../_actions";
import {connect} from "react-redux";
import ProcessOrderModal from "../../_components/partials/ProcessOrderModal";
import {StatusLabelStyle} from "../../constants";
import BreadCrumbs from "../../_components/common/Breadcrumbs";
import {Link} from "react-router-dom";

const initialState = {
    showProcessOrderModal: false
};

class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.props.dispatch(projectActions.findAll());
    }

    showModal = (order, stateParam) => {
        this.setState({
            order,
            [stateParam]: true
        });
    };

    hideModal = (stateParam) => {
        this.setState({ [stateParam]: false });
    };

    render() {
        const { projects } = this.props;

        let breadCrumbsElements = [
            {link: '/dashboard', name: 'Dashboard'},
            {link: '/dashboard/projects', name: 'Projects'},
        ];
        let breadCrumbs = <BreadCrumbs pageTitle={'Projects'} elements={breadCrumbsElements}/>;

        return ([
            breadCrumbs,
            <div className="wrapper wrapper-content animated fadeIn">
                <div className="ibox-content m-b-sm border-bottom">
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="form-group">
                                <label className="control-label" htmlFor="project_name">Project Name</label>
                                <input type="text" id="project_name" name="project_name" value="" placeholder="Project Name" className="form-control"/>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="control-label" htmlFor="customer">Manager</label>
                                <input type="text" id="customer" name="customer" value="" placeholder="Manager" className="form-control"/>
                            </div>
                        </div>

                        <div className="col-sm-2">
                            <div className="form-group">
                                <label className="control-label" htmlFor="status">Project Status</label>
                                <input type="text" id="status" name="status" value="" placeholder="Status" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>

                {projects &&
                <Row>
                    <Col lg={12}>
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>All projects assigned to this account</h5>
                                <div className="ibox-tools">
                                    <a href="" className="btn btn-primary btn-xs">Create new project</a>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div className="project-list">
                                    <table className="table table-hover">
                                        <tbody>
                                        {projects.map(o => (
                                            <tr>
                                                <td className="project-status">
                                                    <span className={'label ' + StatusLabelStyle[o.projectStatus]}>{o.projectStatus}</span>
                                                </td>
                                                <td className="project-title">
                                                    <Link to={'/dashboard/projects/' + o.id}>{o.name}</Link>
                                                    <br/>
                                                    <small>Created {(new Date(o.createdDate)).toISOString().slice(0,10).replace(/-/g,"/")}</small>
                                                </td>
                                                <td className="project-completion">
                                                    <small>Completion with: 48%</small>
                                                    <div className="progress progress-mini">
                                                        <div style={{width: 48+'%'}} className="progress-bar"></div>
                                                    </div>
                                                </td>
                                                <td className="project-people">
                                                    <Link to={'/users/' + o.projectManager.id}>
                                                        <img alt="image" className="img-circle" src="/img/a6.jpg"/>
                                                    </Link>
                                                </td>
                                                <td className="project-people">
                                                    {o.developers.map(dev => [
                                                        <Link to={'/users/' + dev.id}>
                                                            <img alt="image" className="img-circle" src="/img/a2.jpg"/>
                                                        </Link>,
                                                        ' '
                                                    ])}
                                                </td>
                                                <td className="project-actions">
                                                    <Link to={'/dashboard/projects/' + o.id} className="btn btn-white btn-sm"><i className="fa fa-folder"></i> View </Link>{' '}
                                                    <a href="#" className="btn btn-white btn-sm"><i className="fa fa-pencil"></i> Edit </a>{' '}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                }
            </div>
            ]
        )
    }

}

let mapStateToProps = (state) => {
    const { projects } = state;

    return {
        projects: projects.items
    }
};

export default connect(mapStateToProps)(ProjectsView);