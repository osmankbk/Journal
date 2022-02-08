//The componenet that displays the contents of a entry.
import React, { useState, useContext } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { Context } from '../Context';


const MEntry = () => {
//Set error state
  const [errors, setErrors] = useState();
// Access the user stored in cookies, in the Context component
  const authUser = useContext(Context).authenticatedUser;

// Gives entry access to Context component.
  const meditation = useContext(Context).data.createEntryM;

// Use react's ref to capture user's input
  const navigate = useNavigate();
  const titleM = React.createRef();
  const entryTextM = React.createRef();

 // A function that returns the inputs values and current user's id. 
  const entryValues = () => {
    const values = {
      title: titleM.current.value,
      entry: entryTextM.current.value,
      author: authUser._id
    }
    return values;
  } 

// Creates an entry to the joural collection. 
  const meditationEntry = () => {
    let entryBody = entryValues();
 
// Stores current user email & password in variables for authentication.    
    const { email } = authUser
    const { password } = authUser;

    meditation(entryBody, email, password)
    .then(result => {
      if (result !== null) {
        setErrors([result])
      } else {
        console.log(`SUCCESS! An Entry was made`);
        navigate('/meditations');
      }
    }).catch(error => {
      console.log(error);
    })
  }

// On submit this function calls the func that creates an entry.
  const submit = (e) => {
    e.preventDefault();
    meditationEntry();
  }

// Cancles signing in & returns to the homepage.    
  const cancle = () => {
    navigate('/meditations');
  }

  return (
    <div className="bounds entry--detail">
        <h1 className="entry">Create Entry</h1>
        <div>
       { errors?.length ? <div>
        <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
            {
              <ul>
                <li>{errors}</li>
              </ul> 
            }
            </div>
          </div> : null }
         
          <form onSubmit={ submit }>
            <div className="grid-66 entry-desc">
              <div className="entry--header">
                <h4 className="entry--label">Meditations</h4>
                <div><input id="title" name="title" type="text" className="input-title entry--title--input" placeholder="Entry title..." ref={ titleM }></input></div>
                <p></p>
              </div>
              <div className="entry--description">
                <div><textarea id="description" name="description" className="" placeholder="Entry text..." ref={ entryTextM }></textarea></div>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button move-left" type="submit">Create Entry</button><button className="button button-secondary" onClick={ cancle }>Cancel</button></div>
          </form>
        </div>
      </div>
  );   
}

export default MEntry;