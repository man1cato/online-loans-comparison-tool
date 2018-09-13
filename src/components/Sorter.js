import React from 'react';

const Sorter = ({tool, handleSort}) => (
    <div className={tool === 'business' ? 'layout__header--5col' : 'layout__header'} role="group" aria-label="Sorting tabs">    
        {tool === 'business' && 
            <button 
                id="sortType" 
                name="type" 
                value="Type"
                aria-label="Sort by type" 
                onClick={handleSort}
            >
                Type
            </button>
        }
        <button 
            id="sortApr" 
            name="minApr" 
            value="Est. APR"
            aria-label="Sort by APR" 
            onClick={handleSort}
        >
            Est. APR
        </button>
        {tool !== 'business' && 
            <button 
                id="sortMonthlyPayment" 
                name="minMonthlyPayment" 
                value="Est. Monthly Payment"
                aria-label="Sort by monthly payment" 
                onClick={handleSort}
            >
                Est. Monthly Payment
            </button>
        }
        <button 
            id="sortInterest" 
            name="minInterest" 
            value="Est. Interest"
            aria-label="Sort by interest" 
            onClick={handleSort}
        >
            Est. Interest
        </button>
        {tool === 'business' && 
            <button 
                id="sortCreditScore" 
                name="minCreditScore" 
                value="Min Credit Score"
                aria-label="Sort by credit score" 
                onClick={handleSort}
            >
                Min Credit Score
            </button>
        }
        <button 
            className="layout__header__lender"
            id="sortLender" 
            name="lender" 
            value="Lender"
            aria-label="Sort by lender" 
            onClick={handleSort}
        >
            Lender
        </button>
    </div>
)

export default Sorter;