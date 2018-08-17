import axios from 'axios';

const airtableBaseUrl = 'https://api.airtable.com/v0/apprEaBSfPkubZY2R';
const airtableApiKey = 'key3K9tGEczfYDL5s';
// const airtableApiKey = process.env.AIRTABLE_API_KEY;


const getBusinessLoans = async () => {
    const response = await axios.get(`${airtableBaseUrl}/Business Loans?api_key=${airtableApiKey}`);
    
    return response.data.records.map((record) => {
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minTermLength = record.fields["Min Term Length (mths)"];  //Given in months
        const maxTermLength = record.fields["Max Term Length (mths)"];  //Given in months
        const minInterest = 50000 * minApr/100 * minTermLength/12;     //Default $50000 loan amount
        const maxInterest = 50000 * maxApr/100 * maxTermLength/12;     //Default $50000 loan amount

        return {
            id: record.id,
            type: record.fields["Type"],
            lender: record.fields["Lender Text"], 
            minCreditScore: record.fields["Min Credit Score"],
            minTimeInBusiness: record.fields["Min Time in Business (mths)"],
            minAnnualRevenue: record.fields["Min Annual Revenue"],
            minApr, 
            maxApr,
            minTermLength,
            maxTermLength,
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
        const minLoanAmount = record.fields["Min Amount"];
        const maxLoanAmount = record.fields["Max Amount"];
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const minTermLength = record.fields["Min Term Length (mths)"];  //Given in months
        const maxTermLength = record.fields["Max Term Length (mths)"];  //Given in months
        const minMonthlyPayment = 10000 * (1 + minApr/100 * minTermLength/12) / minTermLength;   //Default $5000 loan amount
        const maxMonthlyPayment = 10000 * (1 + maxApr/100 * maxTermLength/12) / maxTermLength;   //Default $5000 loan amount

        return {
            id: record.id,
            lender: record.fields["Lender Text"], 
            minCreditScore: record.fields["Min Credit Score"],
            minIncome: record.fields["Min Income"],
            minCreditHistory: record.fields["Min Credit History (yrs)"],
            minLoanAmount,
            maxLoanAmount,
            minApr, 
            maxApr,
            minOrigFee: record.fields["Min Origination Fee"],
            maxOrigFee: record.fields["Max Origination Fee"],
            minTermLength,
            maxTermLength,
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
        const minLoanAmount = record.fields["Min Amount"];
        const maxLoanAmount = record.fields["Max Amount"];
        const minApr = record.fields["Min APR"];    //Given in percentage value
        const maxApr = record.fields["Max APR"];    //Given in percentage value
        const maxTermLength = record.fields["Max Term Length (mths)"];  //Given in months
        const minMonthlyPayment = 15000 * (1 + minApr/100 * maxTermLength/12) / maxTermLength;   //Default $5000 loan amount
        const maxMonthlyPayment = 15000 * (1 + maxApr/100 * maxTermLength/12) / maxTermLength;   //Default $5000 loan amount

        return {
            id: record.id,
            type: record.fields.Type,
            lender: record.fields["Lender Text"], 
            minCreditScore: record.fields["Min Credit Score"],
            minLoanAmount,
            maxLoanAmount,
            minApr, 
            maxApr,
            maxTermLength,
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

module.exports = {
    getBusinessLoans,
    getPersonalLoans,
    getAutoLoans
}