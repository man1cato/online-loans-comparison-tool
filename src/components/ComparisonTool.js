import React from 'react';
import numeral from 'numeral';
import update from 'immutability-helper';
import _ from 'lodash';

import BusinessLoans from './BusinessLoans';
import PersonalLoans from './PersonalLoans';
import AutoLoans from './AutoLoans';
import HomeLoans from './HomeLoans';
import LoanFilter from './LoanFilter';
import Sorter from './Sorter';
import {monthlyPayment, simpleInterest, homeFixedMonthlyPayment, homeFixedInterest, filterLoans} from '../utils/utils';

const defaultFilters = {
    business: {
        loanAmount: 50000,
        timeInBusiness: 12,
        annualRevenue: 150000,
        creditScore: 720,
        type: ['Line of Credit', 'Term Loan', 'Equipment Financing', 'Invoice Factoring']
    },
    personal: {
        loanAmount: 10000,
        income: 50000,
        creditScore: 720
    },
    auto: {
        purpose: 'Purchase',
        loanAmount: 15000,
        creditScore: 720,
        termMonths: 60
    },
    home: {
        purpose: 'Purchase',
        loanAmount: 200000,
        creditScore: 720,
        termMonths: 360 
    }
}


export default class ComparisonTool extends React.Component {    
    state = {
        tool: this.props.tool,
        filters: defaultFilters[this.props.tool],
        filteredLoans: this.props[`${this.props.tool}Loans`],
        sortedBy: this.props.tool === 'business' ? 'sortType' : 'sortApr'
    }

    handleTabClick = (e) => {
        const tool = e.target.name;
        const filters = defaultFilters[tool];
        const sortedBy = tool === 'business' ? 'sortType' : 'sortApr';
        const filteredLoans = filterLoans(tool, this.props[`${tool}Loans`], filters);
        
        this.setState({
            tool,
            filteredLoans,
            filters,
            sortedBy
        })
    }

    handleFilterChange = (e) => {
        const filter = e.target.name;
        let value = e.target.value;
        value = numeral(value).value() ? numeral(value).value() : value;  //ISN'T ACCOUNTING FOR ZERO
        if (filter === 'loanAmount') { value = numeral(e.target.rawValue).value() };

        if (e.target.multiple) {
            const options = e.target.options;
            value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }                 
        }

        this.setState((prevState) => {  
            const tool = prevState.tool;          
            let loans = {
                business: this.props.businessLoans,
                personal: this.props.personalLoans,
                auto: this.props.autoLoans,
                home: this.props.homeLoans,
            }[tool];

            if (filter === 'loanAmount') {                 
                loans = loans.map((loan) => {
                    if (tool === 'auto') {
                        loan.minInterest = simpleInterest(value, loan.minApr, prevState.filters.termMonths);
                        loan.maxInterest = simpleInterest(value, loan.maxApr, prevState.filters.termMonths);
                        loan.minMonthlyPayment = monthlyPayment(value, loan.minApr, prevState.filters.termMonths);
                        loan.maxMonthlyPayment = monthlyPayment(value, loan.maxApr, prevState.filters.termMonths);
                    } else if (tool === 'home') {
                        loan.minMonthlyPayment = homeFixedMonthlyPayment(value, loan.minApr, prevState.filters.termMonths);
                        loan.maxMonthlyPayment = homeFixedMonthlyPayment(value, loan.maxApr, prevState.filters.termMonths);
                        loan.minInterest = homeFixedInterest(loan.minMonthlyPayment, loan.termMonths, value);
                        loan.maxInterest = homeFixedInterest(loan.maxMonthlyPayment, loan.termMonths, value);
                    } else {
                        loan.minInterest = simpleInterest(value, loan.minApr, loan.minTermMonths);
                        loan.maxInterest = simpleInterest(value, loan.maxApr, loan.maxTermMonths);
                        loan.minMonthlyPayment = monthlyPayment(value, loan.minApr, loan.minTermMonths);
                        loan.maxMonthlyPayment = monthlyPayment(value, loan.maxApr, loan.maxTermMonths);
                    }   
                    return loan;
                });      
            };

            if (filter === 'termMonths') {
                loans = loans.map((loan) => {
                    loan.minInterest = simpleInterest(prevState.filters.loanAmount, loan.minApr, value);
                    loan.maxInterest = simpleInterest(prevState.filters.loanAmount, loan.maxApr, value);
                    loan.minMonthlyPayment = monthlyPayment(prevState.filters.loanAmount, loan.minApr, value);
                    loan.maxMonthlyPayment = monthlyPayment(prevState.filters.loanAmount, loan.maxApr, value);
                    return loan;
                });                
            }

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

    handleCollapse = (e) => {
        const id = e.target.id;
        const target = document.getElementById(id);
        const arrow = target.children[0];
        const text = target.children[1];

        if (arrow.className === "arrow-up") {
            arrow.setAttribute("alt", "arrow-down");
            arrow.className = "arrow-down";
            text.innerHTML = id === "filterCollapser" ? " Hide Filters" :" Hide Details";
        } else {
            arrow.setAttribute("alt", "arrow-up");
            arrow.className = "arrow-up";
            text.innerHTML = id === "filterCollapser" ? " View Filters" :" View Details";
        }
    }

    handleSort = (e) => {
        const sortedBy = this.state.sortedBy;
        const id = e.target.id;
        const value = e.target.value;
        const name = e.target.name;
        const target = document.getElementById(id);
        let order = "asc";

        if (sortedBy !== id) {
            document.getElementById(sortedBy).innerHTML = document.getElementById(sortedBy).getAttribute('value');
        }

        if (target.innerHTML.endsWith("↑")) {
            target.innerHTML = value + " ↓";
            order = "desc";
        } else {
            target.innerHTML = value + " ↑"
        }
        this.setState((prevState) => ({
            filteredLoans: _.orderBy(prevState.filteredLoans, [name], [order]),
            sortedBy: id
        }));
    }

    render () {
        return (
            <div>
                {this.props.multi &&
                    <div className="grid__header btn-toolbar" role="group" aria-label="Tool tabs">
                        <button name="business" className={`grid__col1 btn btn-secondary ${this.state.tool === 'business' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'business'} onClick={this.handleTabClick}>Business</button>
                        <button name="personal" className={`grid__col2 btn btn-secondary ${this.state.tool === 'personal' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'personal'} onClick={this.handleTabClick}>Personal</button>
                        <button name="auto" className={`grid__col3 btn btn-secondary ${this.state.tool === 'auto' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'auto'} onClick={this.handleTabClick}>Auto</button>
                        <button name="home" className={`grid__col4 btn btn-secondary ${this.state.tool === 'home' && 'active'}`} data-toggle="button" aria-pressed={this.state.tool === 'home'} onClick={this.handleTabClick}>Home</button>
                    </div>
                }

                <div className="grid">
                    <div className="grid__corner">Choose your options</div>
                    
                    <LoanFilter 
                        tool={this.state.tool}
                        filters={this.state.filters}
                        handleFilterChange={this.handleFilterChange}
                        handleCollapse={this.handleCollapse}
                    />                

                    <Sorter tool={this.state.tool} handleSort={this.handleSort} />                    

                    <div className="grid__body">
                        {{
                            business: <BusinessLoans loans={this.state.filteredLoans} handleCollapse={this.handleCollapse}/>,
                            personal: <PersonalLoans loans={this.state.filteredLoans} handleCollapse={this.handleCollapse}/>,
                            auto: <AutoLoans loans={this.state.filteredLoans} handleCollapse={this.handleCollapse}/>,
                            home: <HomeLoans loans={this.state.filteredLoans} handleCollapse={this.handleCollapse}/>,
                        }[this.state.tool]}
                    </div>
                </div>
            </div>
        )
    }
}
