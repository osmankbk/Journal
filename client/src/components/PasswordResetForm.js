import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation, useParams} from 'react-router-dom';
import { Context } from '../Context.js'

//This component displays when a user is trying to sign in.
const PassResetForm = () => {
  // login state
  const [errors, setErrors] = useState();
  // The state for showing the login in link
  const [showSigninLink, setShowSigninLink] = useState(false);
    // The state for showing the reset password in link
  const [showResetPassLink, setShowResetPassLink] = useState(false);
  // Holds the reset password func from Context API.
  const { resetPassword } = useContext( Context ).data;

// Used React Refs to reference my form inputs.
  let passwordP = React.createRef();
  let confirmPasswordC = React.createRef();

  // Access browser's params & save to variable.
  const { id } = useParams();
  const { pathname } = useLocation();

// useNavigate instance hook; gives access to the navigation object 
  const navigate = useNavigate();

// Func returns an obj that would hold the new passwords.
const newCred = () => {
    const credentials = {
        password: passwordP.current.value,
        confirmPassword: confirmPasswordC.current.value,
    }
    return credentials;
}

// Reset password func.
const resetPasswordFunc = () => {
    const newPassword = newCred();
    const tokenId = id
    const userId = pathname.slice(16, 40);

    if(newPassword.password === newPassword.confirmPassword) {
        resetPassword(userId, tokenId, newPassword)
        .then(result => {
        if(!result) {
            setErrors(`Password Successfully changed!`);
            setShowSigninLink(true);
        } else {
            setErrors("An invalid link or expired, Please make another request.");
            setShowResetPassLink(true);
        }
        }).catch(error => {
        console.log(error);
        });
    } else {
        return setErrors("Your Passwords Need To Match");
    }
}

// Submit func that calls the signin func.
  const submit = (event) => {
      event.preventDefault();
      resetPasswordFunc();
    }
   const backToLogin = () => {
      return navigate("/login");
   } 

    return(
    <div className="bounds">
    <div className="grid-33 centered signin" id="new-pass-boss">
    {/* Errors are displayed here  */}
      {
          <ul>
            <li>{errors}</li>
        </ul> 
      }
      <h1>Reset Password</h1>
      <div id="new-pass-mini">
      <form onSubmit={ submit } id="new-pass-form">
      <div id="new-pass-input-div"><input id="password" name="password" type="password" className="" placeholder="Password" ref={ passwordP }></input></div>
        <div id="new-pass-confrm-div"><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
            ref={ confirmPasswordC }></input></div>
           <div id="new-pass-btns" className="grid-100 pad-bottom"><button className="button" type="submit">Reset</button><button id="cancle-btn" className="button button-secondary" onClick={ backToLogin }>Cancel</button></div>
        </form>
      </div>
      <p>&nbsp;</p>
      {
          showSigninLink 
          ? 
          <p>Your password was sucessfully reset! Click <Link to="/login">here</Link> to Sign In!</p> 
          : 
          null
      }
      {
        showResetPassLink
        ? <p>Click <Link to="/reset-password">here</Link> to request another link</p>  
        :
        null
      }
    </div>
  </div>
    );
}

export default PassResetForm;