import React from 'react';


const Collapser = ({i, handleCollapse}) => (
    <a className="loan__col-span loan__collapser" 
        href={`#loan${i}Details`} 
        role="button" 
        data-toggle="collapse" 
        data-target={`#loan${i}Details`} 
        aria-expanded="false"  
        aria-controls={`loan${i}Details`}
        onClick={handleCollapse}
    >
        <img 
            id={`loan${i}Collapser`} 
            src="/images/cta-details-view.png" 
            srcSet="images/cta-details-view@2x.png 2x, images/cta-details-view@3x.png 3x"
            alt="View Details" 
        />
    </a>
);

export default Collapser;