import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return ( 
        <div ref={ref}>All my products are here!</div>
     );
});
 