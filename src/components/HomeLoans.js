import React from 'react';
import numeral from 'numeral';


const HomeLoans = ({loans}) => (

    <div className="accordion" id="accordion">

        {loans.map((loan, i) => (
            <div className="loan" key={i}>
                
                <div className="loan__main" >
                    <div className="grid__col1">
                        <h3>{loan.minApr}% - {loan.maxApr}%</h3>
                    </div>
                    <div className="grid__col2">
                        <h3>{numeral(loan.minMonthlyPayment).format('$0,0')} - {numeral(loan.maxMonthlyPayment).format('$0,0')}</h3>
                    </div>        
                    <div className="grid__col3">
                        <h3>{numeral(loan.minInterest).format('$0,0')} - {numeral(loan.maxInterest).format('$0,0')}</h3>
                    </div>            
                    <div className="grid__col4">
                        <img src={loan.logo} alt={loan.lender} />
                        <button className="btn btn-secondary">Apply Now</button>
                    </div>

                    <div className="grid__col-span loan__collapser">
                        <a href={`#loan${i}Details`} role="button" data-toggle="collapse" data-target={`#loan${i}Details`} aria-expanded="false"  aria-controls={`loan${i}Details`}>
                            View Details
                        </a>
                    </div>
                </div>

                <div className="grid__col-span loan__details collapse" id={`loan${i}Details`} data-parent="#accordion">
                    <div className="loan__right-divider">
                        <h4>Other Requirements</h4>
                        {loan.otherReqs ? 
                            <ul>
                                {loan.otherReqs.map((item, j) => (
                                    <li key={`${i}req${j}`}>{item}</li>
                                ))}
                            </ul>
                            :
                            <p>None</p>
                        }

                    </div>

                    <div>
                        <h4>Notes</h4>
                        {loan.notes ? 
                            <ul>
                                {loan.notes.map((item, j) => (
                                    <li key={`${i}note${j}`}>{item}</li>
                                ))}
                            </ul>
                            :
                            <p>None</p>
                        }
                    </div>
                </div>

            </div>
        ))}

    </div>

);


export default HomeLoans;