//The componenet that displays the contents of a entry.
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import { Context } from '../Context';


const JEntry = () => {
  const [errors, setErrors] = useState();
  const authUser = useContext(Context).cookies.user;
  const journal = useContext(Context).data.createEntry;

  const titleJ = React.createRef();
  const entryTextJ = React.createRef();
  let navigate = useNavigate();

  const entryValues = () => {
    const values = {
      title: titleJ.current.value,
      entry: entryTextJ.current.value,
      author: authUser._id
    }
    return values;
  } 

  const journalEntry = () => {
    let entryBody = entryValues();
 
    const { email } = authUser
    const { password } = authUser;

    journal(entryBody, email, password)
    .then(result => {
      if (result !== null) {
        setErrors([result]);
      } else {
        console.log(`SUCCESS! An Entry was made`);
        navigate('/journal');
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const submit = (e) => {
    e.preventDefault();
    journalEntry();
  }

  // Cancles signing in & returns to the homepage.    
  const cancle = () => {
    navigate('/journal');
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
                <h4 className="entry--label">Journal</h4>
                <div><input id="title" name="title" type="text" className="input-title entry--title--input" placeholder="Entry title..." ref={ titleJ }></input></div>
                <p></p>
              </div>
              <div className="entry--description">
                <div><textarea id="description" name="description" className="" placeholder="Entry text..." ref={ entryTextJ }></textarea></div>
              </div>
            </div>
            
            <div className="grid-100 pad-bottom"><button className="button move-left" type="submit">Create Entry</button><button className="button button-secondary" onClick={ cancle }>Cancel</button></div>
          </form>
        </div>
      </div>
  );   
}

export default JEntry;