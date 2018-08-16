console.log("app.js is running");

import React from 'react';
import ReactDOM from 'react-dom';
import {getBusinessLoans, getPersonalLoans} from './utils'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ComparisonTool from './components/ComparisonTool';


getBusinessLoans().then((loans) => {
    ReactDOM.render(<ComparisonTool businessLoans={loans}/>, document.getElementById('app'));
}).catch((e) => {
    console.log("Error at app.js");
})

