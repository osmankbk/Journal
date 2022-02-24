import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { Context } from '../Context.js'

//This component displays when a user is trying to sign in.
const SignIn = () => {
  // login state
  const [errors, setErrors] = useState();
  const { signin } = useContext(Context).actions;

// Used React Refs to reference my form inputs.
  let emailAddress = React.createRef()
  let passWord = React.createRef()

// useLocation hook; returns the location obj that represent the current URL.
  const location = useLocation()
// useNavigate instance hook; gives access to the navigation object 
  const navigate = useNavigate()

// Submit func that calls the signin func.
  const submit = (event) => {
      event.preventDefault();
      signing()
    }
  // useEffect( () => {
  //   const from = location.state = pathname;
  //   }, []);  
  
// Cancles signing in & returns to the homepage.    
  const cancle = () => {
      navigate('/');
    }

    const signing = () => {
  // After a user signs in, navigate to previous location if any, else, go to the homepage.
      const { from } = location.state || { from: { pathname: '/' } }
      const email = emailAddress.current.value;
      const password = passWord.current.value;
      const body = { email, passWord }
  // Calls the sing-in func from Context.
      signin(email, password)
      .then(data => {
        if(data === null) {
          setErrors( "Login Was Not Successful!" )
        } else {
          navigate(from, { replace: true });
        }
      }).catch(error => {
        console.log(error);
      });
    }
    return(
    <div className="bounds">
    <div className="grid-33 centered signin">
    {/* Errors are displayed here  */}
      {
          <ul>
            <li>{errors}</li>
        </ul> 
      }
      <h1>Sign In</h1>
      <div>
      <form onSubmit={ submit }>
          <div><input name="emailAddress" type="text" className="" placeholder="Email Address" ref={ emailAddress }></input></div>
          <div><input id="password" name="password" type="password" className="" placeholder="Password"  ref={ passWord }></input></div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={ cancle}>Cancel</button></div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>Forgot Password? Click <Link to="/reset-password">here</Link> to Reset Password</p>   
    </div>
  </div>
    );
}

export default SignIn;