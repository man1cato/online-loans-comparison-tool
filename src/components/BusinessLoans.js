import React from 'react';
import numeral from 'numeral';

const BusinessLoans = ({loans}) => (
    <div>
        <div className="grid--4col">
            <h4 className="grid__col1">Est. APR</h4>
            <h4 className="grid__col2">Est. Interest</h4>
            <h4 className="grid__col3">Min Credit Score</h4>
        </div>

        {loans.map((loan, i) => (
            <div className="grid--loan" key={i}>
                <div className="grid__col1">
                    <div>{loan.minApr}% - {loan.maxApr}%</div>
                    <div>Est. APR</div>
                </div>
                <div className="grid__col2">
                    <div>{numeral(loan.minInterest).format('$0,0')} - {numeral(loan.maxInterest).format('$0,0')}</div>
                    <div>Est. Interest</div>
                </div>        
                <div className="grid__col3">
                    <div>{loan.minCreditScore}</div>
                    <div>Min Credit Score</div>
                </div>
        
                <div className="grid__col4">
                    <button>Apply Now</button>
                    <div>{loan.lender}</div>
                </div>
        
                <div className="grid__col1-2">
                    <div>Pros</div>
                    <div>{loan.pros}</div>
                </div>
        
                <div className="grid__col3-4">
                    <div>Cons</div>
                    <div>{loan.cons}</div>
                </div>
        
                <div className="grid__col-span">
                    <div>Other Requirements</div>
                    <div>{loan.otherReqs}</div>
                </div>
            </div>
        ))}
    </div>
)

export default BusinessLoans;