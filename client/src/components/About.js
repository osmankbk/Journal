import React from 'react';
import github from '../github.png';
import linkedin from '../linkedin.png';

// My About page component
const About = () => {
    return(
        <div className="conatct-main-div container-fluid about bg-light text-light">
            <div className="container-fluid about-two">
                <h1 className="about-header">About</h1>
                <p className="about-summary">Dotπdown is a web app that makes journaling easy and efficient entry, editing, 
                    updating, deletion, and always accessible wherever and whenever. It’s also a space of meditation; dotting down 
                    our curious, beautiful, complex, or troubling thoughts is one path to clarity; DotπDown is an opening toward that clarity. 
                    An ideal space to preserve one’s contemplations(for those in the same boat as I am; with handwriting so terrible that 
                    reading words we wrote a couple of weeks prior require a decipherer)  and are legible upon revisit, regardless of penmanship. 
                    Thank you for visiting, and If this app could serve your journaling needs in any way, please explore your heart content.
                </p>
            </div>
            <div className="contact-link text-center">
                <a className="text-light" href="/contact-us"><p className="text-uppercase">Contact Us</p></a>
            </div>
        </div>
    );
}

export default About;