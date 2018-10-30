import React from 'react';
import Cleave from 'cleave.js/react';


const FilterForm = ({id, tool, filters, handleFilterChange}) => (
    <form className={id ? "filter__form--header collapse": "filter__form--sidebar"} id={id}>         
        { (tool === 'auto' || tool === 'home') &&
            <div className="filter__group">
                <label>Loan Purpose</label>
                <div className="filter__group--radio">
                    <label>
                        <input type="radio" name="purpose" id="purpose1" value="Purchase" defaultChecked onChange={handleFilterChange}/>
                        <span>Purchase</span>
                    </label>
                    <label>
                        <input type="radio" name="purpose" id="purpose2" value="Refinance" onChange={handleFilterChange}/>
                        <span>Refinance</span>
                    </label>
                </div>           
            </div>
        }

        <div className="filter__group">
            <label htmlFor="loanAmount">Funding Amount</label>
            <Cleave 
                className="form-control input-block-level"
                type="text" 
                name="loanAmount" 
                options={{
                    numeral: true, 
                    numeralThousandsGroupStyle: 'thousand',
                    numeralPositiveOnly: true,
                    prefix: "$"
                }}
                value={filters.loanAmount}
                onChange={handleFilterChange}
            /> 
        </div>

        { tool === 'auto' && 
            <div className="filter__group">
                <label htmlFor="termMonths">Loan Term</label>
                <select className="form-control" name="termMonths" defaultValue="60" onChange={handleFilterChange}>
                    <option value="24">2 yrs (24 mths)</option>
                    <option value="36">3 yrs (36 mths)</option>
                    <option value="48">4 yrs (48 mths)</option>
                    <option value="60">5 yrs (60 mths)</option>
                    <option value="72">6 yrs (72 mths)</option>
                    <option value="84">7 yrs (84 mths)</option>
                </select>
            </div>
        }
        
        { tool === 'auto' && filters.purpose === 'Refinance' &&
            <div className="filter__group">
                <label htmlFor="age">Vehicle Age</label>
                <select className="form-control" name="age" defaultValue="0" onChange={handleFilterChange}>
                    <option value="0">{"<"} 5 yrs</option>
                    <option value="5">5 - 10 yrs</option>
                    <option value="11">11+ yrs</option>
                </select>
            </div>
        }

        { tool === 'home' && 
            <div className="filter__group">
                <label htmlFor="termMonths">Type</label>
                <select className="form-control" name="termMonths" defaultValue="360" onChange={handleFilterChange}>
                    <option value="360">30-Year Fixed</option>
                    <option value="240">20-Year Fixed</option>
                    <option value="180">15-Year Fixed</option>
                    <option value="120">10-Year Fixed</option>
                    <option value="96">7/1 ARM</option>
                    <option value="72">5/1 ARM</option>
                    <option value="48">3/1 ARM</option>
                </select>
            </div>
        }

        { tool === 'business' &&
            <div className="filter__group">
                <label htmlFor="type">Funding Type(s)</label>
                <select multiple 
                    className="form-control" 
                    name="type" 
                    defaultValue={['Line of Credit', 'Term Loan', 'Equipment Financing', 'Invoice Factoring']} 
                    onChange={handleFilterChange}
                >
                    <option value="Equipment Financing">Equipment Financing</option>
                    <option value="Invoice Factoring">Invoice Factoring</option>
                    <option value="Line of Credit">Line of Credit</option>
                    <option value="Term Loan">Term Loan</option>
                </select>        
            </div>

        }

        { tool === 'business' &&
            <div className="filter__group">
                <label htmlFor="timeInBusiness">Time in Business</label>
                <select className="form-control" name="timeInBusiness" defaultValue="12" onChange={handleFilterChange}>
                    <option value="0">{"<"} 6 months</option>
                    <option value="6">6 months - 1 year</option>
                    <option value="12">1 - 2 years</option>
                    <option value="24">2+ years</option>
                </select>        
            </div>
        }

        { tool === 'business' &&                
            <div className="filter__group">
                <label htmlFor="annualRevenue">Annual Revenue</label>
                <select className="form-control" name="annualRevenue" defaultValue="100000" onChange={handleFilterChange}>
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
        }

        { tool === 'personal' &&            
            <div className="filter__group">
                <label htmlFor="income">Annual Income</label>    
                <select className="form-control" name="income" defaultValue="50000" onChange={handleFilterChange}>
                    <option value="0">{"<"} $15,000</option>
                    <option value="15000">$15,000 - $29,999</option>
                    <option value="30000">$30,000 - $49,999</option>
                    <option value="50000">$50,000 - $99,999</option>
                    <option value="100000">$100,000 - $149,999</option>
                    <option value="150000">$150,000+</option>
                </select>  
            </div>
        }

        <div className="filter__group">
                <label htmlFor="creditScore">Credit Score</label>  
            <select className="form-control" name="creditScore" defaultValue="720" onChange={handleFilterChange}>
                <option value="720">Excellent (720+)</option>
                <option value="690">Good (690 - 719)</option>
                <option value="630">Average (630 - 689)</option>
                <option value="0">Poor ({"<"} 629)</option>
            </select>  
        </div>
    </form>
);

export default FilterForm;