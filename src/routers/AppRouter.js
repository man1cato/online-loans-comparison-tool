import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import BusinessLoans from '../components/BusinessLoans';
import PersonalLoans from '../components/PersonalLoans';
import AutoLoans from '../components/AutoLoans';
import HomeLoans from '../components/HomeLoans';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <BusinessLoans path="/small-business" />
                <PersonalLoans path="/personal" />
                <AutoLoans path="/auto"  />
                <HomeLoans path="/home"  />
                {/* <Route component={NotFoundPage} /> */}
            </Switch>
        </div>
    </Router>
);

export default AppRouter;