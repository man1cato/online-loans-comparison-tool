import React from 'react';
import FilterForm from './FilterForm';

const LoanFilter = ({tool, filters, handleFilterChange, handleCollapse}) => (
    <div className="filter">
        <a  className="filter__collapser"
            id="filterCollapser"
            href="#filterForm"
            role="button" 
            data-toggle="collapse" 
            data-target="#filterForm"
            aria-expanded="false"  
            aria-controls="#filterForm"
            onClick={handleCollapse}
        >
            <img  
                className="arrow-down"           
                src="/images/arrow-icon-down.png"    
            />
            <span> View Filters</span>
        </a>

        <FilterForm id="filterForm" tool={tool} filters={filters} handleFilterChange={handleFilterChange} />
        <FilterForm tool={tool} filters={filters} handleFilterChange={handleFilterChange} />
        
    </div>    
)

export default LoanFilter;
