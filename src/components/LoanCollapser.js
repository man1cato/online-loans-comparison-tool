import React from 'react';


const LoanCollapser = ({loanId, handleCollapse}) => (
    <a className="loan__col-span loan__collapser" 
        id={`loan${loanId}Collapser`} alt="View Details"
        href={`#loan${loanId}Details`} 
        role="button" 
        data-toggle="collapse" 
        data-target={`#loan${loanId}Details`} 
        aria-expanded="false"  
        aria-controls={`loan${loanId}Details`}
        onClick={handleCollapse}
    >
        <img       
            className="arrow-down"           
            src="/images/arrow-icon-down.png"                  
        />
        <span> View Details</span>
    </a>
);

export default LoanCollapser;