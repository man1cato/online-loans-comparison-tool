import React from 'react';
import numeral from 'numeral';
import update from 'immutability-helper';

import BusinessLoans from './BusinessLoans';
import PersonalLoans from './PersonalLoans';
import AutoLoans from './AutoLoans';
import HomeLoans from './HomeLoans';
import LoanFilter from './LoanFilter';
import {monthlyPayment, simpleInterest, homeFixedMonthlyPayment, homeFixedInterest} from '../utils';


const filterLoans = (tool, loans, filters) => {
    let filteredLoans = loans;
    if (tool === 'auto') {
        filteredLoans = filteredLoans.filter((loan) => loan.purpose === filters.purpose);
    }
    if (tool === 'business') {
        filteredLoans = filteredLoans.filter((loan) => 
            loan.minTimeInBusiness <= filters.timeInBusiness 
            && loan.minAnnualRevenue <= filters.annualRevenue
        ); 
    }
    if (tool === 'auto' || tool === 'personal') {
        filteredLoans = filteredLoans.filter((loan) => 
            loan.minLoanAmount <= filters.loanAmount 
            && loan.maxLoanAmount >= filters.loanAmount
        ); 
    }
    if (tool === 'personal') {
        filteredLoans = filteredLoans.filter((loan) => loan.minIncome <= filters.income); 
    }
    console.log(filteredLoans);
    if (tool === 'home') {
        filteredLoans = filteredLoans.filter((loan) => loan.termMonths === filters.termMonths);
    }

    filteredLoans = filteredLoans.filter((loan) => loan.minCreditScore <= filters.creditScore);
    console.log(filteredLoans);
    return filteredLoans;
}


export default class ComparisonTool extends React.Component {    
    state = {
        tool: 'business',
        filters: {
            loanAmount: 50000,
            timeInBusiness: 12,
            annualRevenue: 150000,
            creditScore: 720
        },
        filteredLoans: this.props.businessLoans
    }

    handleTabClick = (e) => {
        const tool = e.target.id;        

        const filters = {
            business: {
                loanAmount: 50000,
                timeInBusiness: 12,
                annualRevenue: 150000,
                creditScore: 720
            },
            personal: {
                loanAmount: 10000,
                income: 50000,
                creditScore: 720
            },
            auto: {
                purpose: 'Purchase',
                loanAmount: 15000,
                creditScore: 720
            },
            home: {
                loanAmount: 200000,
                creditScore: 720,
                termMonths: 360 
            }
        }[tool];

        const filteredLoans = filterLoans(tool, this.props[`${tool}Loans`], filters);
        
        this.setState({
            tool,
            filteredLoans,
            filters
        })
    }

    handleFilterChange = (e) => {
        const filter = e.target.id;
        let value = e.target.value;
        value = numeral(value).value() ? numeral(value).value() : value;  //ISN'T ACCOUNTING FOR ZERO
        if (filter === 'loanAmount') { value = numeral(e.target.rawValue).value() };
            
        this.setState((prevState) => {  
            const tool = prevState.tool;          
            let loans = {
                business: this.props.businessLoans,
                personal: this.props.personalLoans,
                auto: this.props.autoLoans,
                home: this.props.homeLoans,
            }[tool];

            if (filter === 'loanAmount') { 
                if (tool === 'home') {
                    loans = loans.map((loan) => {
                        const minMonthlyPayment = homeFixedMonthlyPayment(value, loan.minApr, loan.termMonths);
                        const maxMonthlyPayment = homeFixedMonthlyPayment(value, loan.maxApr, loan.termMonths);
                        loan.minInterest = homeFixedInterest(minMonthlyPayment, loan.termMonths, value);
                        loan.maxInterest = homeFixedInterest(maxMonthlyPayment, loan.termMonths, value);
                        loan.minMonthlyPayment = minMonthlyPayment;
                        loan.maxMonthlyPayment = maxMonthlyPayment;
                        return loan;
                    });
                } else {
                    loans = loans.map((loan) => {
                        loan.minInterest = simpleInterest(value, loan.minApr, loan.minTermMonths);
                        loan.maxInterest = simpleInterest(value, loan.maxApr, loan.maxTermMonths);
                        loan.minMonthlyPayment = monthlyPayment(value, loan.minApr, loan.minTermMonths);
                        loan.maxMonthlyPayment = monthlyPayment(value, loan.minApr, loan.minTermMonths);
                        return loan;
                    });        
                }
            };

            const filters = update(prevState.filters, {
                [filter]: { $set: value }
            });
            const filteredLoans = filterLoans(tool, loans, filters);

            return {
                filters,
                filteredLoans
            }
        })
    }   


    render () {
        return (
            <div className="container">
                <div className="grid">
                    <div className="grid__sidebar">
                        <LoanFilter 
                            handleChange={this.handleFilterChange}
                            filters={this.state.filters}
                            tool={this.state.tool}
                        />
                    </div>

                    <div className="grid__header btn-toolbar" role="group" aria-label="Tool tabs">
                        <button id="business" className={`grid__col1 btn btn-secondary ${this.state.tool === 'business' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'business'} onClick={this.handleTabClick}>Business</button>
                        <button id="personal" className={`grid__col2 btn btn-secondary ${this.state.tool === 'personal' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'personal'} onClick={this.handleTabClick}>Personal</button>
                        <button id="auto" className={`grid__col3 btn btn-secondary ${this.state.tool === 'auto' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'auto'} onClick={this.handleTabClick}>Auto</button>
                        <button id="home" className={`grid__col4 btn btn-secondary ${this.state.tool === 'home' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'home'} onClick={this.handleTabClick}>Home</button>
                    </div>
                    
                    <div className="grid__body">
                        {{
                            business: <BusinessLoans loans={this.state.filteredLoans} />,
                            personal: <PersonalLoans loans={this.state.filteredLoans} />,
                            auto: <AutoLoans loans={this.state.filteredLoans} />,
                            home: <HomeLoans loans={this.state.filteredLoans} />,
                        }[this.state.tool]}
                    </div>
                </div>
            </div>
        )
    }
}
