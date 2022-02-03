import React from 'react';
//This component runs when access is denied
const Forbidden = () => {
    return(
        <div>
        <div className="bounds">
          <h1>Forbidden</h1>
          <p>Oops! You are not authorized to view this page.</p>
        </div>
      </div>
    );
}

export default Forbidden;