import React from 'react';

const ApplyButton = ({loan}) => (
    <div className="loan__button">
        <div className="loan__lender-logo"><img src={loan.logo} alt={loan.lender} /></div>
        <a className="btn btn-secondary" role="button" href={loan.ctaLink} target="_blank">Apply Now</a>
    </div>
)

export default ApplyButton;