import React from 'react';

//This component runs when an unexpected error occurs.
const UnhandledError = () => {
    return(
        <div>
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </div>
    );
}

export default UnhandledError;