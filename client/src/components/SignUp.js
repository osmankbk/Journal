import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../Context';

// SignUp Component
const SignUp = () => {
  const [errors, setErrors] = useState([])
  const { createUser } = useContext(Context).data;
  const { signin } = useContext(Context).actions;

// Used React Refs to reference my form inputs.
  const firstNameR = React.createRef()
  const lastNameR = React.createRef()
  const emailAddressR = React.createRef()
  const passwordR = React.createRef()
  const confirmPasswordR = React.createRef()

// useNavigate hook; gives access to the navigation object 
  const navigate = useNavigate();
// useLocation hook; returns the location obj that represent the current URL.
  const location = useLocation();
// After a new user is created, navigate to previous location if any, else, go to the homepage.
  const { from } = location.state || { from: { pathname: '/'} } 

// The functions that returns the inputs value of my signup form.
  const userInfo = () => {
    const user = {
      firstName: firstNameR.current.value,
      lastName: lastNameR.current.value,
      email: emailAddressR.current.value,
      password: passwordR.current.value,
      confirmPassword: confirmPasswordR.current.value
    } 
    return user;
  }

// Creates a new User if all conditions are met.
  const newUser = () => {
// Calls the userInfo func, use it returned value for createUser arguemnt.
    const user = userInfo();
    if(user.password === user.confirmPassword) {
// Creates a new user, func.
      createUser(user)
      .then( errors => {
        if(errors.length) {
          setErrors([errors]);
        } else {
          signin(user.email, user.password)
          .then( () => {
            navigate(from, { replace: true });
          });
        }
      }).catch(err => {
        navigate('/error');
      });
    } else {
      setErrors("Your Passwords Need To Match");
    }
  }
// Submit func that calls the signup func.
  const submit = (e) => {
     e.preventDefault();
     newUser();
   }

// Cancles signing in & returns to the homepage.   
  const cancle = () => {
    navigate('/');
  }
     

  return(
  <div className="bounds">
  <div className="grid-33 centered signin">
    <h1>Sign Up</h1>
    <div>
   {/* Errors are displayed here  */}
    {
        <ul>
          <li>{errors}</li>
      </ul> 
    }
      <form onSubmit={ submit }>
        <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" ref={ firstNameR }></input></div>
        <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" ref={ lastNameR }></input></div>
        <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={ emailAddressR }></input></div>
        <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={ passwordR }></input></div>
        <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
            ref={ confirmPasswordR }></input></div>
        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={ cancle }>Cancel</button></div>
      </form>
    </div>
    <p>&nbsp;</p>
    <p>Already have a user account? <Link to="/login">Click here</Link> to sign in!</p>
  </div>
</div>
  );

}

export default SignUp;