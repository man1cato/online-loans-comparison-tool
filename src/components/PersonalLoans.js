import React from 'react';
import numeral from 'numeral';


const PersonalLoans = ({loans}) => (
    <div>
        {/* <div className="grid--4col">
            <h4 className="grid__col1">Est. APR</h4>
            <h4 className="grid__col2">Est. Monthly Payment</h4>
            <h4 className="grid__col3">Min Credit Score</h4>
        </div> */}

        {loans.map((loan, i) => (
            <div className="grid--loan" key={i}>
                <div className="grid__col1">
                    <div>{loan.minApr}% - {loan.maxApr}%</div>
                    <div>Est. APR</div>
                </div>
                <div className="grid__col2">
                    <div>{numeral(loan.minMonthlyPayment).format('$0,0')} - {numeral(loan.maxMonthlyPayment).format('$0,0')}</div>
                    <div>Est. Monthly Payment</div>
                </div>        
                <div className="grid__col3">
                    <div>{loan.minCreditScore}</div>
                    <div>Min Credit Score</div>
                </div>
        
                <div className="grid__col4">
                    <button className="btn btn-primary">Apply Now</button>
                    <h5>{loan.lender}</h5>
                </div>
        
                <div className="grid__col1-2">
                    <div>Notes</div>
                    <div>{loan.notes}</div>
                </div>
        
                <div className="grid__col3-4">
                    <div>Other Requirements</div>
                    <div>{loan.otherReqs}</div>
                </div>
            </div>
        ))}
    </div>
)

export default PersonalLoans;