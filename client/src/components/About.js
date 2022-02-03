import React from 'react';

//This component runs when an unexpected error occurs.
const About = () => {
    return(
        <div className="container-fluid about bg-light text-light">
            <div className="container-fluid about-two">
                <h1 className="about-header">About</h1>
                <p>My "About" summery goes here!</p>
            </div>
        </div>
    );
}

export default About;