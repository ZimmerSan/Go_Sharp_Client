import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import SiteTemplatesView from '../views/SiteTemplates';
import SiteTemplateView from '../views/SiteTemplate';

import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/main" />
            <Route path="/main" component={MainView}/>
            <Route path="/siteTemplates" component={SiteTemplatesView}/>
            <Route path="/siteTemplates/:id" component={SiteTemplateView}/>
        </Route>
    </Router>

);