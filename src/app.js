import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import {getBusinessLoans, getPersonalLoans, getAutoLoans, getHomeLoans} from './utils/airtableCalls'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ComparisonTool from './components/ComparisonTool';

export default async (tool, multi = false) => {
    console.log('tool: ', tool);
    try {  
        let businessLoans, personalLoans, autoLoans, homeLoans;
        if (!!multi) {
             [businessLoans, personalLoans, autoLoans, homeLoans] = await Promise.all([
                getBusinessLoans(), 
                getPersonalLoans(), 
                getAutoLoans(), 
                getHomeLoans()
            ]);
        } else {            
            businessLoans = tool === 'business' && await getBusinessLoans();
            personalLoans = tool === 'personal' && await getPersonalLoans(); 
            autoLoans = tool === 'auto' && await getAutoLoans();
            homeLoans = tool === 'home' && await getHomeLoans();
        }
        const props = {
            businessLoans,
            personalLoans,
            autoLoans,
            homeLoans
        }        

        ReactDOM.render(
            <ComparisonTool 
                {...props}
                tool={tool}
                multi={multi}
            />, document.getElementById('app')
        );
    } catch (e) {
        console.log(e);
    }
}

