import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import IboxTools from "../../_components/common/IboxTools";
import {projectActions} from "../../_actions";
import {connect} from "react-redux";
import ProcessOrderModal from "../../_components/partials/ProcessOrderModal";
import {Role, StatusLabelStyle} from "../../constants";
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
        let projects = this.props.projects ? this.props.projects : [];
        const { user } = this.props;

        let roles = user.roles ? user.roles : [Role.Customer];

        if (roles.includes(Role.Customer)) {
            projects = projects.filter(o => o.order.customer.id === user.id);
        } else if (roles.includes(Role.Developer)) {
            projects = projects.filter(proj => proj.developers.map(e => e.id).includes(user.id));
        }

        let breadCrumbsElements = [
            {link: '/dashboard', name: 'Dashboard'},
            {link: '/dashboard/projects', name: 'Projects'},
        ];
        let breadCrumbs = <BreadCrumbs pageTitle={'Projects'} elements={breadCrumbsElements}/>;

        return ([
            breadCrumbs,
            <div className="wrapper wrapper-content animated fadeIn">
                {projects &&
                <Row>
                    <Col lg={12}>
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>All projects assigned to this account</h5>
                            </div>
                            <div className="ibox-content">
                                {projects && projects[0]
                                    ? <div className="project-list">
                                    <table className="table table-hover">
                                        <tbody>
                                        {projects.map(project => {
                                            let progress = project.id ?
                                                100 * (new Date().getTime() - new Date(project.createdDate).getTime()) / (new Date(project.dueDate).getTime() - new Date(project.createdDate).getTime())
                                                : 1;

                                            progress = progress < 0 ? 0 : progress > 100 ? 100 : progress.toFixed(2);

                                            return <tr>
                                                <td className="project-status">
                                                    <span
                                                        className={'label ' + StatusLabelStyle[project.projectStatus]}>{project.projectStatus}</span>
                                                </td>
                                                <td className="project-title">
                                                    <Link to={'/dashboard/projects/' + project.id}>{project.name}</Link>
                                                    <br/>
                                                    <small>
                                                        Created {(new Date(project.createdDate)).toISOString().slice(0, 10).replace(/-/g, "/")}</small>
                                                </td>
                                                <td className="project-completion">
                                                    <small>Completion with: {progress}%</small>
                                                    <div className="progress progress-mini">
                                                        <div style={{width: progress + '%'}} className="progress-bar"></div>
                                                    </div>
                                                </td>
                                                <td className="project-people">
                                                    <span className="img-circle profile-image-circle" style={{
                                                        backgroundImage: `url(${project.projectManager.imageUrl
                                                            ? project.projectManager.imageUrl
                                                            : '/img/a6.jpg'})`,
                                                        width: '36px',
                                                        height: '36px'
                                                    }}>
                                                            <Link to={'/users/' + project.projectManager.id} style={{
                                                                display: 'block',
                                                                width: '36px',
                                                                height: '36px'
                                                            }}>
                                                            </Link>
                                                    </span>
                                                </td>
                                                <td className="project-people">
                                                    {project.developers.map(dev => [
                                                        <span className="img-circle profile-image-circle" style={{
                                                            backgroundImage: `url(${dev.imageUrl ? dev.imageUrl : '/img/a2.jpg'})`,
                                                            width: '36px',
                                                            height: '36px'
                                                        }}>
                                                            <Link to={'/users/' + dev.id} style={{
                                                                display: 'block',
                                                                width: '36px',
                                                                height: '36px'
                                                            }}>
                                                            </Link>
                                                        </span>,
                                                        ' '
                                                    ])}
                                                </td>
                                                <td className="project-actions">
                                                    <Link to={'/dashboard/projects/' + project.id}
                                                          className="btn btn-white btn-sm"><i
                                                        className="fa fa-folder"></i> View </Link>{' '}
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                    </div>

                                    : <div className="text-center">Seems like you have no Projects...</div>
                                }
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
    const { user } = state.authentication;

    return {
        projects: projects.items,
        user
    }
};

export default connect(mapStateToProps)(ProjectsView);