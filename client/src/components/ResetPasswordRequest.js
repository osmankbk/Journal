import React, { useState, useContext } from 'react';
import { Context } from '../Context.js'

//This component displays when a user is trying to sign in.
const ResetRequest = () => {
  // login state
  const [resetRequestSent, setResetRequestSent] = useState();
  const { requestResetPass } = useContext( Context ).data;

// Used React Refs to reference my form inputs.
  let emailAddress = React.createRef()
  
const userEmail = () => {
    const user = {
        email: emailAddress.current.value,
    }
    return user;
}

const getPassResetLink = () => {
    const email = userEmail();

    requestResetPass(email)
    .then(result => {
        if(result) {
            return setResetRequestSent("Request sucessfully sent! Please, check your email for instructions to reset your password.")
        } else if(result === null) {
            return setResetRequestSent("A user with that Email was not found.");
        } else {
            return setResetRequestSent("An unexpected error occured.")
        }
    }).catch(error => {
      console.log(error);
    });
}

// Submit func that calls the signin func.
  const submit = (event) => {
      event.preventDefault();
      getPassResetLink();
    }

    return(
    <div className="bounds" id="reset-div-boss">
    <div className="grid-33 centered signin" id="reset-div-mini">
      <h1 id="reset-h1">Request Reset</h1>
      <div id="reset">
      <form onSubmit={ submit }>
          <div id="reset-input"><input name="email" type="text" className="" placeholder="Email Address" ref={ emailAddress }></input></div>
          <div id="reset-btn-div" className="grid-100 pad-bottom"><button id="reset-btn" className="button" type="submit">Send</button></div>
        </form>

         {/* Reset result info is displayed here  */}
        {
          <ul>
            <li>{resetRequestSent}</li>
        </ul> 
      }
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
    );
}

export default ResetRequest;