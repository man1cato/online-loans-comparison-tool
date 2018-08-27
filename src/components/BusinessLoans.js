import React from 'react';
import numeral from 'numeral';

const BusinessLoans = ({loans}) => (
    <div className="loan">
        {/* <div className="grid--4col">
            <h4>Est. APR</h4>
            <h4>Est. Interest</h4>
            <h4>Min Credit Score</h4>
        </div> */}

        {loans.map((loan, i) => (
            <div className="grid--loan" key={i}>
                <div className="grid__col1">
                    <h3>{loan.minApr}% - {loan.maxApr}%</h3>
                    <h5>Est. APR</h5>
                </div>
                <div className="grid__col2">
                    <h3>{numeral(loan.minInterest).format('$0,0')} - {numeral(loan.maxInterest).format('$0,0')}</h3>
                    <h5>Est. Interest</h5>
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
                    <h4>Pros</h4>
                    <div>{loan.pros}</div>
                </div>
        
                <div className="grid__col3-4">
                    <h4>Cons</h4>
                    <div>{loan.cons}</div>
                </div>
        
                <div className="grid__col-span">
                    <h4>Other Requirements</h4>
                    <div>{loan.otherReqs}</div>
                </div>
            </div>
        ))}
    </div>
)

export default BusinessLoans;