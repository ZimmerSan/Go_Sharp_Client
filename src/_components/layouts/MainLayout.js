import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import {Redirect, Route, Switch} from "react-router-dom";

import MainView from '../../views/Main';
import SiteTemplatesView from '../../views/SiteTemplate/SiteTemplatesView';
import SiteTemplateView from '../../views/SiteTemplate/SiteTemplateView';
import SiteTemplateEditView from "../../views/SiteTemplate/SiteTemplateEditView";
import SiteTemplateCreateView from "../../views/SiteTemplate/SiteTemplateCreateView";
import {connect} from "react-redux";
import ShoppingCartView from "../../views/ShoppingCartView";

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
                        <Route exact path="/" render={() => (<Redirect to="/main" />)} />
                        <Route exact path="/main" component={MainView}/>
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