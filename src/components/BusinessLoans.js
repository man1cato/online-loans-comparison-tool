import React from 'react';
import numeral from 'numeral';

import LoanCollapser from './LoanCollapser';
import ApplyButton from './ApplyButton';

const BusinessLoans = ({loans, handleCollapse}) => (

    <div className="accordion" id="accordion">

        {loans.map((loan, i) => (
            <div className="loan" key={i}>
                
                <div className="loan__main" >

                    <div className="loan__content--5col">
                        <div className="loan__col">
                            <h3>{loan.type}</h3>
                        </div>

                        <div className="loan__col">
                            <h3>{loan.minApr}% - {loan.maxApr}%</h3>
                        </div>

                        <div className="loan__col">
                            <h3>{numeral(loan.minInterest).format('$0,0')} - {numeral(loan.maxInterest).format('$0,0')}</h3>
                        </div>        
                        <div className="loan__col">
                            <h3>{loan.minCreditScore}</h3>
                        </div>

                        <div className="loan__col">
                            <ApplyButton loan={loan}/>
                        </div>
                    </div>
                    
                    <LoanCollapser loanId={i} handleCollapse={handleCollapse}/>

                </div>

                <div className="collapse" id={`loan${i}Details`} data-parent="#accordion">
                    <div className="loan__details--3col">

                        <h3>Type: {loan.type}</h3>

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
                            <h4>Pros</h4>
                            {loan.pros ? 
                                <ul>
                                    {loan.pros.map((item, j) => (
                                        <li key={`${i}pro${j}`}>{item}</li>
                                    ))}
                                </ul>
                                :
                                <p>None</p>
                            }
                        </div>

                        <div>
                            <h4>Cons</h4>
                            {loan.cons ? 
                                <ul>
                                    {loan.cons.map((item, j) => (
                                        <li key={`${i}con${j}`}>{item}</li>
                                    ))}
                                </ul>
                                :
                                <p>None</p>
                            }
                        </div>
                        
                        <div className="loan__details__button">
                            <ApplyButton loan={loan}/>
                        </div>

                    </div>
                </div>

            </div>
        ))}

    </div>

);


export default BusinessLoans;