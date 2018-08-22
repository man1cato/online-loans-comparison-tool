console.log("app.js is running");

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import {getBusinessLoans, getPersonalLoans, getAutoLoans} from './utils'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ComparisonTool from './components/ComparisonTool';


const getLoanData = async () => {
    try {
        const [businessLoans, personalLoans, autoLoans] = await Promise.all([getBusinessLoans(), getPersonalLoans(), getAutoLoans()]);
        ReactDOM.render(
            <ComparisonTool 
                businessLoans={businessLoans}
                personalLoans={personalLoans}
                autoLoans={autoLoans}
            />, document.getElementById('app')
        );
    } catch (e) {
        console.log("Error at app.js");
    }
}

getLoanData();

