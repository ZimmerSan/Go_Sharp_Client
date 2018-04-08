import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import {Redirect, Route, Switch} from "react-router-dom";

import OrdersView from '../../views/dashboard/OrdersView';
import SiteTemplatesView from '../../views/site-template/SiteTemplatesView';
import SiteTemplateView from '../../views/site-template/SiteTemplateView';
import SiteTemplateEditView from "../../views/site-template/SiteTemplateEditView";
import SiteTemplateCreateView from "../../views/site-template/SiteTemplateCreateView";
import ShoppingCartView from "../../views/ShoppingCartView";
import ProjectsView from "../../views/dashboard/ProjectsView";
import ProjectDetailsView from "../../views/dashboard/ProjectDetailsView";
import UsersView from "../../views/user/UsersView";
import {PrivateRoute} from "../PrivateRoute";
import UserInfoView from "../../views/user/UserInfoView";
import UserEditView from "../../views/user/UserEditView";

class MainLayout extends React.Component {

    render() {
        let wrapperClass = "gray-bg ";
        return (
            <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location}/>

                <div id="page-wrapper" className={wrapperClass}>
                    <TopHeader/>

                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/siteTemplates"/>)} />

                        <Route exact path="/dashboard" render={() => (<Redirect to="/dashboard/orders"/>)}/>
                        <Route exact path="/dashboard/orders" component={OrdersView}/>
                        <Route exact path="/dashboard/orders/" component={OrdersView}/>
                        <Route exact path="/dashboard/projects" component={ProjectsView}/>
                        <Route exact path="/dashboard/projects/" component={ProjectsView}/>
                        <Route exact path="/dashboard/projects/:id" component={ProjectDetailsView}/>

                        <PrivateRoute exact path="/users" component={UsersView} allowedRoles={'Admin'}/>
                        <Route exact path="/users/:id" component={UserInfoView}/>
                        <Route exact path="/users/:id/edit" component={UserEditView}/>

                        <Route exact path="/siteTemplates" component={SiteTemplatesView}/>
                        <Route exact path="/siteTemplates/create" component={SiteTemplateCreateView}/>
                        <Route exact path="/siteTemplates/:id" component={SiteTemplateView}/>
                        <Route exact path="/siteTemplates/:id/edit" component={SiteTemplateEditView}/>

                        <Route exact path="/cart" component={ShoppingCartView}/>
                        <Route exact path="/cart/" component={ShoppingCartView}/>
                    </Switch>

                    <Footer />
                </div>

            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default MainLayout