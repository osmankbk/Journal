import React from 'react';

// My About page component
const About = () => {
    return(
        <div className="about bg-light text-light">
            <div className="about-two">
                <h1 className="about-header">About</h1>
                <p className="about-summary">Dotπdown is a web app that makes journaling easy and efficient entry, editing, 
                    updating, deletion, and always accessible wherever and whenever. It’s also a space of meditation; dotting down 
                    our curious, beautiful, complex, or troubling thoughts is one path to clarity; DotπDown is an opening toward that clarity. 
                    An ideal space to preserve one’s contemplations(for those in the same boat as I am; with handwriting so terrible that 
                    reading words we wrote a couple of weeks prior require a decipherer)  and are legible upon revisit, regardless of penmanship. 
                    Thank you for visiting, and If this app could serve your journaling needs in any way, please explore your heart content.
                </p>
            </div>
        </div>
    );
}

export default About;