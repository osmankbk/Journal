import React from 'react';

//This component runs when a course is not found
const NotFound = () => {
    return(
        <div>
        <div className="bounds">
          <h1>Not Found</h1>
          <p>Sorry! We couldn't find the page you're looking for.</p>
          <a href="/">Home Page</a>
        </div>
      </div>
    );
}

export default NotFound;