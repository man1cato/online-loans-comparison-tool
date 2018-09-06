import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import {getBusinessLoans, getPersonalLoans, getAutoLoans, getHomeLoans} from './utils/airtableCalls'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ComparisonTool from './components/ComparisonTool';


const getLoanData = async () => {
    try {
        const [businessLoans, personalLoans, autoLoans, homeLoans] = await Promise.all([
            getBusinessLoans(), 
            getPersonalLoans(), 
            getAutoLoans(), 
            getHomeLoans()
        ]);
        ReactDOM.render(
            <ComparisonTool 
                businessLoans={businessLoans}
                personalLoans={personalLoans}
                autoLoans={autoLoans}
                homeLoans={homeLoans}
            />, document.getElementById('app')
        );
    } catch (e) {
        console.log("Error at app.js", e);
    }
}

getLoanData();

