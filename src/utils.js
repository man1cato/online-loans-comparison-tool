import axios from 'axios';

const airtableBaseUrl = 'https://api.airtable.com/v0/apprEaBSfPkubZY2R';
const airtableApiKey = process.env.AIRTABLE_API_KEY;


// Calculator Formulas
const simpleInterest = (loanAmount, apr, termMonths) => loanAmount * apr/100 * termMonths/12;
const monthlyPayment = (loanAmount, apr, termMonths) => loanAmount * (1 + apr/100 * termMonths/12) / termMonths;
const homeFixedMonthlyPayment = (loanAmount, apr, termMonths) => apr/100/12 * loanAmount / (1 - Math.pow((1 + apr/100/12), (-1 * termMonths)));
const homeFixedInterest = (monthlyPayment, termMonths, loanAmount) => monthlyPayment * termMonths - loanAmount;

// Airtable Calls
const getBusinessLoans = async () => {
    const response = await axios.get(`${airtableBaseUrl}/Business Loans?api_key=${airtableApiKey}`);
    
    return response.data.records.map((record) => {
        const loanAmount = 50000; //Default $50000 loan amount
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minTermMonths = record.fields["Min Term Length (mths)"];  //Given in months
        const maxTermMonths = record.fields["Max Term Length (mths)"];  //Given in months
        const minInterest = simpleInterest(loanAmount, minApr, minTermMonths);
        const maxInterest = simpleInterest(loanAmount, maxApr, maxTermMonths);

        return {
            id: record.id,
            type: record.fields["Type"],
            lender: record.fields["Lender Text"], 
            logo: record.fields.Logo[0].url,
            minCreditScore: record.fields["Min Credit Score"],
            minTimeInBusiness: record.fields["Min Time in Business (mths)"],
            minAnnualRevenue: record.fields["Min Annual Revenue"],
            minApr, 
            maxApr,
            minTermMonths,
            maxTermMonths,
            minInterest,
            maxInterest, 
            pros: record.fields["Pros"], 
            cons: record.fields["Cons"], 
            otherReqs: record.fields["Other Requirements"] || 'None'
        }
    });
}


const getPersonalLoans = async () => {
    const response = await axios.get(`${airtableBaseUrl}/Personal Loans?api_key=${airtableApiKey}`);
    
    return response.data.records.map((record) => {
        const loanAmount = 10000;   //Default $10000 loan amount
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minTermMonths = record.fields["Min Term Length (mths)"];  //Given in months
        const maxTermMonths = record.fields["Max Term Length (mths)"];  //Given in months
        const minMonthlyPayment = monthlyPayment(loanAmount, minApr, minTermMonths);
        const maxMonthlyPayment = monthlyPayment(loanAmount, maxApr, maxTermMonths);
        const minInterest = simpleInterest(loanAmount, minApr, minTermMonths);
        const maxInterest = simpleInterest(loanAmount, maxApr, maxTermMonths);
        
        return {
            id: record.id,
            lender: record.fields["Lender Text"], 
            logo: record.fields.Logo[0].url, 
            minCreditScore: record.fields["Min Credit Score"],
            minIncome: record.fields["Min Income"],
            minCreditHistory: record.fields["Min Credit History (yrs)"],
            minLoanAmount: record.fields["Min Amount"],
            maxLoanAmount: record.fields["Max Amount"],
            minApr, 
            maxApr,
            minInterest,
            maxInterest,
            minOrigFee: record.fields["Min Origination Fee"],
            maxOrigFee: record.fields["Max Origination Fee"],
            minTermMonths,
            maxTermMonths,
            minMonthlyPayment,
            maxMonthlyPayment, 
            otherReqs: record.fields["Other Requirements"] || 'None',
            notes: record.fields["Notes"]
        }
    });
}

const getAutoLoans = async () => {
    const response = await axios.get(`${airtableBaseUrl}/Auto Loans?api_key=${airtableApiKey}`);
    
    return response.data.records.map((record) => {
        const loanAmount = 15000;   //Default $15000 loan amount
        const termMonths = 60;      //Default 5 year term
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minMonthlyPayment = monthlyPayment(loanAmount, minApr, termMonths);
        const maxMonthlyPayment = monthlyPayment(loanAmount, maxApr, termMonths);
        const minInterest = simpleInterest(loanAmount, minApr, termMonths);
        const maxInterest = simpleInterest(loanAmount, maxApr, termMonths);

        return {
            id: record.id,
            lender: record.fields["Lender Text"], 
            logo: record.fields.Logo[0].url, 
            purpose: record.fields.Purpose,
            minCreditScore: record.fields["Min Credit Score"],
            minLoanAmount: record.fields["Min Amount"],
            maxLoanAmount: record.fields["Max Amount"] || 100000,
            minApr, 
            maxApr,
            minInterest,
            maxInterest,
            maxTermMonths: record.fields["Max Term Length (mths)"] || 84,
            minMonthlyPayment,
            maxMonthlyPayment, 
            maxVehicleAge: record.fields["Max Vehicle Age (yrs)"],  //Given in years
            maxVehicleMileage: record.fields["Max Vehicle Mileage"],
            otherReqs: record.fields["Other Requirements"] || 'None',
            excludedStates: record.fields["Excluded States"],
            notes: record.fields["Notes"]
        }
    });
}

const getHomeLoans = async () => {
    const response = await axios.get(`${airtableBaseUrl}/Home Loans?api_key=${airtableApiKey}`);
    
    return response.data.records.map((record) => {
        const loanAmount = 200000; //Default $200000 loan amount
        const termMonths = record.fields["Term Length (mths)"];  //Given in months
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minMonthlyPayment = homeFixedMonthlyPayment(loanAmount, minApr, termMonths);
        const maxMonthlyPayment = homeFixedMonthlyPayment(loanAmount, maxApr, termMonths);
        const minInterest = homeFixedInterest(minMonthlyPayment, termMonths, loanAmount);
        const maxInterest = homeFixedInterest(maxMonthlyPayment, termMonths, loanAmount);

        return {
            id: record.id,
            lender: record.fields["Lender Text"], 
            logo: record.fields.Logo[0].url, 
            purpose: record.fields.Purpose,
            type: record.fields.Type,
            minCreditScore: record.fields["Min Credit Score"],
            minIncome: record.fields["Min Income"],
            minCreditHistory: record.fields["Min Credit History (yrs)"],
            minApr, 
            maxApr,
            termMonths,
            minMonthlyPayment,
            maxMonthlyPayment, 
            minInterest,
            maxInterest,
            otherReqs: record.fields["Other Requirements"] || 'None',
            notes: record.fields["Notes"]
        }
    });
}


module.exports = {
    monthlyPayment,
    simpleInterest,
    homeFixedMonthlyPayment,
    homeFixedInterest,
    getBusinessLoans,
    getPersonalLoans,
    getAutoLoans,
    getHomeLoans
}