import React from 'react';
import Cleave from 'cleave.js/react';

const LoanFilter = ({handleChange, loanAmount, tool}) => (
    <form>        

        <h4>Loan Amount</h4>        
        <Cleave 
            type="text" 
            name="loanAmount" 
            options={{
                numeral: true, 
                numeralThousandsGroupStyle: 'thousand',
                numeralPositiveOnly: true,
                prefix: "$"
            }}
            value={loanAmount}
            onChange={handleChange}
        /> 

        { tool === 'auto' && 
            <div>
                <h4>Type</h4>
                <select name="type" defaultValue="Purchase" onChange={handleChange}>
                    <option value="Purchase">Purchase</option>
                    <option value="Refinance">Refinance</option>
                </select>
                
                <h4>Vehicle Age</h4>
                <select name="age" defaultValue="0" onChange={handleChange}>
                    <option value="0">{"<"} 5 yrs</option>
                    <option value="5">5 - 10 yrs</option>
                    <option value="11">11+ yrs</option>
                </select>
            </div>
        }

        { tool === 'business' &&
            <div>
                <h4>Time in Business</h4>
                <select name="timeInBusiness" defaultValue="12" onChange={handleChange}>
                    <option value="0">{"<"} 6 months</option>
                    <option value="6">6 months - 1 year</option>
                    <option value="12">1 - 2 years</option>
                    <option value="24">2+ years</option>
                </select>        
                
                <h4>Annual Revenue</h4>
                <select name="annualRevenue" defaultValue="100000" onChange={handleChange}>
                    <option value="0">{"<"} $25,000</option>
                    <option value="25000">$25,000 - $49,999</option>
                    <option value="50000">$50,000 - $74,999</option>
                    <option value="75000">$75,000 - $99,999</option>
                    <option value="100000">$100,000 - $149,999</option>
                    <option value="150000">$150,000 - $199,999</option>
                    <option value="200000">$200,000+</option>
                </select>  
            </div>
        }

        { tool === 'personal' &&
            <div>     
                <h4>Annual Income</h4>
                <select name="income" defaultValue="50000" onChange={handleChange}>
                    <option value="0">{"<"} $15,000</option>
                    <option value="15000">$15,000 - $29,999</option>
                    <option value="30000">$30,000 - $49,999</option>
                    <option value="50000">$50,000 - $99,999</option>
                    <option value="100000">$100,000+</option>
                </select>  
            </div>
        }

        <h4>Credit Score</h4>
        <select name="creditScore" defaultValue="720" onChange={handleChange}>
            <option value="720">Excellent (720+)</option>
            <option value="690">Good (690 - 719)</option>
            <option value="630">Average (630 - 689)</option>
            <option value="0">Poor ({"<"} 629)</option>
        </select>  
        
    </form>
)

export default LoanFilter;
