import React from 'react';
import BusinessLoans from './BusinessLoans';
import PersonalLoans from './PersonalLoans';
import AutoLoans from './AutoLoans';
import LoanFilter from './LoanFilter';
import numeral from 'numeral';

import {getPersonalLoans, getAutoLoans} from '../utils';

let personalLoans, autoLoans, homeLoans;
getPersonalLoans().then((loans) => {
    personalLoans = loans;
}).catch((e) => {
    console.log('Error at getPersonalLoans in ComparisonTool');
});
getAutoLoans().then((loans) => {
    autoLoans = loans;
}).catch((e) => {
    console.log('Error at getPersonalLoans in ComparisonTool');
});


export default class ComparisonTool extends React.Component {    
    state = {
        tool: 'business',
        loans: this.props.businessLoans,
        loanAmount: 50000
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = name === 'loanAmount' ? numeral(e.target.rawValue).value() : numeral(e.target.value).value();
        let loans;
        if (name === 'loanAmount') {
            loans = this.props.businessLoans.map((loan) => {
                loan.minInterest = value * loan.minApr/100 * loan.minTermLength/12;
                loan.maxInterest = value * loan.maxApr/100 * loan.maxTermLength/12;
                return loan;
            })
        } else {
            loans = this.props.businessLoans.filter((loan) => {
                if (name === 'timeInBusiness') {
                    return loan.minTimeInBusiness < value
                }
                if (name === 'annualRevenue') {
                    return loan.minAnnualRevenue < value
                }
                if (name === 'creditScore') {
                    return loan.minCreditScore < value
                }
                if (name === 'type') {
                    return loan.type === value
                }
            })
        }
        this.setState({
            [name]: value,
            loans
        })
    }

    handleClick = (e) => {
        const tool = e.target.name;
        const loans = {
            business: this.props.businessLoans,
            personal: personalLoans,
            auto: autoLoans,
            home: homeLoans,
        }[tool];
        const loanAmount = {
            business: 50000,
            personal: 5000,
            auto: 10000,
            home: 250000,
        }[tool];
        this.setState({
            tool,
            loans,
            loanAmount
        })
    }


    render () {
        return (
            <div className="grid">
                <div className="grid__sidebar">
                    <LoanFilter 
                        handleChange={this.handleChange}
                        loanAmount={this.state.loanAmount}
                        tool={this.state.tool}
                    />
                </div>

                <div className="grid__header">
                    <button className="grid__col1" name="business" onClick={this.handleClick}>Business</button>
                    <button className="grid__col2" name="personal" onClick={this.handleClick}>Personal</button>
                    <button className="grid__col3" name="auto" onClick={this.handleClick}>Auto</button>
                    <button className="grid__col4" name="home" onClick={this.handleClick}>Home</button>
                </div>
                
                {{
                    business: <BusinessLoans loans={this.state.loans} />,
                    personal: <PersonalLoans loans={this.state.loans} />,
                    auto: <AutoLoans loans={this.state.loans} />,
                    home: null,
                }[this.state.tool]}
                
            </div>
        )
    }
}
