import axios from 'axios';
import _ from 'lodash';

const airtableBaseUrl = 'https://api.airtable.com/v0/apprEaBSfPkubZY2R';
const airtableApiKey = process.env.AIRTABLE_API_KEY;


// Calculator Formulas
const simpleInterest = (loanAmount, apr, termMonths) => loanAmount * apr/100 * termMonths/12;
const monthlyPayment = (loanAmount, apr, termMonths) => loanAmount * (1 + apr/100 * termMonths/12) / termMonths;
const homeFixedMonthlyPayment = (loanAmount, apr, termMonths) => apr/100/12 * loanAmount / (1 - Math.pow((1 + apr/100/12), (-1 * termMonths)));
const homeFixedInterest = (monthlyPayment, termMonths, loanAmount) => monthlyPayment * termMonths - loanAmount;


//Loan Filter
const filterLoans = (tool, loans, filters) => {
    let filteredLoans = loans;
    if (tool === 'business') {
        filteredLoans = filteredLoans.filter((loan) => 
            loan.minTimeInBusiness <= filters.timeInBusiness 
            && loan.minAnnualRevenue <= filters.annualRevenue 
            && filters.type.includes(loan.type) 
        );  
    }
    if (tool === 'auto') {
        filteredLoans = filteredLoans.filter((loan) => 
            loan.purpose === filters.purpose 
            && loan.maxTermMonths >= filters.termMonths
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
    if (tool === 'home') {
        filteredLoans = filteredLoans.filter((loan) => 
            loan.purpose === filters.purpose
            && loan.termMonths === filters.termMonths
        );
    }

    filteredLoans = filteredLoans.filter((loan) => loan.minCreditScore <= filters.creditScore);
    return filteredLoans;
}



module.exports = {
    monthlyPayment,
    simpleInterest,
    homeFixedMonthlyPayment,
    homeFixedInterest,
    filterLoans
}