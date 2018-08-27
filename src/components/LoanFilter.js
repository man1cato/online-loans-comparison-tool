import React from 'react';
import Cleave from 'cleave.js/react';

const LoanFilter = ({handleChange, tool, filters}) => (
    <form>        
        <div className="form-group">
            <label htmlFor="loanAmount">Loan Amount</label>
            <Cleave 
                className="form-control input-block-level"
                type="text" 
                id="loanAmount" 
                options={{
                    numeral: true, 
                    numeralThousandsGroupStyle: 'thousand',
                    numeralPositiveOnly: true,
                    prefix: "$"
                }}
                value={filters.loanAmount}
                onChange={handleChange}
            /> 
        </div>

        { tool === 'auto' && 
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select className="form-control" id="type" defaultValue="Purchase" onChange={handleChange}>
                    <option value="Purchase">Purchase</option>
                    <option value="Refinance">Refinance</option>
                </select>
            </div>
        }
        
        { tool === 'auto' && filters.type === 'Refinance' &&
            <div className="form-group">
                <label htmlFor="age">Vehicle Age</label>
                <select className="form-control" id="age" defaultValue="0" onChange={handleChange}>
                    <option value="0">{"<"} 5 yrs</option>
                    <option value="5">5 - 10 yrs</option>
                    <option value="11">11+ yrs</option>
                </select>
            </div>
        }

        { tool === 'business' &&
            <div>
                <div className="form-group">
                    <label htmlFor="timeInBusiness">Time in Business</label>
                    <select className="form-control" id="timeInBusiness" defaultValue="12" onChange={handleChange}>
                        <option value="0">{"<"} 6 months</option>
                        <option value="6">6 months - 1 year</option>
                        <option value="12">1 - 2 years</option>
                        <option value="24">2+ years</option>
                    </select>        
                </div>
                
                <div className="form-group">
                    <label htmlFor="annualRevenue">Annual Revenue</label>
                    <select className="form-control" name="annualRevenue" defaultValue="100000" onChange={handleChange}>
                        <option value="0">{"<"} $10,000</option>
                        <option value="10000">$10,000 - $24,999</option>
                        <option value="25000">$25,000 - $49,999</option>
                        <option value="50000">$50,000 - $74,999</option>
                        <option value="75000">$75,000 - $99,999</option>
                        <option value="100000">$100,000 - $149,999</option>
                        <option value="150000">$150,000 - $199,999</option>
                        <option value="200000">$200,000+</option>
                    </select>  
                </div>
            </div>
        }

        { tool === 'personal' &&            
            <div className="form-group">
                <label htmlFor="income">Annual Income</label>    
                <select className="form-control" id="income" defaultValue="50000" onChange={handleChange}>
                    <option value="0">{"<"} $15,000</option>
                    <option value="15000">$15,000 - $29,999</option>
                    <option value="30000">$30,000 - $49,999</option>
                    <option value="50000">$50,000 - $99,999</option>
                    <option value="100000">$100,000 - $149,999</option>
                    <option value="150000">$150,000+</option>
                </select>  
            </div>
        }

        <div className="form-group">
                <label htmlFor="creditScore">Credit Score</label>  
            <select className="form-control" id="creditScore" defaultValue="720" onChange={handleChange}>
                <option value="720">Excellent (720+)</option>
                <option value="690">Good (690 - 719)</option>
                <option value="630">Average (630 - 689)</option>
                <option value="0">Poor ({"<"} 629)</option>
            </select>  
        </div>
        
    </form>
)

export default LoanFilter;
