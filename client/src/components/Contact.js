import React from 'react';
import github from '../github.png';
import linkedin from '../linkedin.png';

// My About page component
const Contact = () => {
    return(
        <div className="container-fluid contactus bg-light text-dark">
          <h3 className="display-2 pt-3 pb-5 font-weight-bold text-uppercase">get in touch</h3>
          <p className="display-6 text-center react-me">Reach Me Via Social Media</p>
          <a href="https://www.linkedin.com/in/osman-kamara-1459881b0/" target="_blank"><img className="linkedin mt-5" src={linkedin} alt="linkedIn icon" /></a>
          <a href="https://github.com/osmankbk" target="_blank"> <img className="github mt-5" src={github} alt="github icon"/></a>
          <p className="display-4 mt-5 email">Send Me An Email</p>
          <a className="text-center display-4 text-wrap word-wrap d-block font-weight-bold text-dark text-uppercase" href="mailto:mackiekbk@yahoo.com">mackiekbk@yahoo.com</a>
        </div>
    );
}

export default Contact;