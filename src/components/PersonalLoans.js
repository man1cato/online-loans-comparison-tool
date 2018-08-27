import React from 'react';
import numeral from 'numeral';


const PersonalLoans = ({loans}) => (
    <div className="loan">
        {/* <div className="grid--4col">
            <h4 className="grid__col1">Est. APR</h4>
            <h4 className="grid__col2">Est. Monthly Payment</h4>
            <h4 className="grid__col3">Min Credit Score</h4>
        </div> */}

        {loans.map((loan, i) => (
            <div className="grid--loan" key={i}>
                <div className="grid__col1">
                    <h3>{loan.minApr}% - {loan.maxApr}%</h3>
                    <h5>Est. APR</h5>
                </div>
                <div className="grid__col2">
                    <h3>{numeral(loan.minMonthlyPayment).format('$0,0')} - {numeral(loan.maxMonthlyPayment).format('$0,0')}</h3>
                    <h5>Est. Monthly Payment</h5>
                </div>        
                <div className="grid__col3">
                    <h3>{loan.minCreditScore}</h3>
                    <h5>Min Credit Score</h5>
                </div>
        
                <div className="grid__col4">
                    <button className="btn btn-primary">Apply Now</button>
                    <h5>{loan.lender}</h5>
                </div>
        
                <div className="grid__col1-2">
                    <h4>Notes</h4>
                    <div>{loan.notes}</div>
                </div>
        
                <div className="grid__col3-4">
                    <h4>Other Requirements</h4>
                    <div>{loan.otherReqs}</div>
                </div>
            </div>
        ))}
    </div>
)

export default PersonalLoans;