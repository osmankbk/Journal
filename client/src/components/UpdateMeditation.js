import React, {useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { Context } from '../Context.js';

const UpdateMeditation = () => {
// Set Component's states.    
    const [ errors, setErrors ] = useState();
    const [ title, setTitle ] = useState('');
    const [ entry, setEntry ] = useState('');

// Access Data functions from the instance store in the Context component
const { updateMeditation, getSingleThought } = useContext(Context).data;

// Access current user in the Context component    
    const user = useContext(Context).authenticatedUser;

// Access browser's params & save to variable.
    const { id } = useParams();

// Save useNavigate func to a variable
    const navigate = useNavigate();

// Runs all functions within it as soon as component mounts.
// & sets setTitle & setEntry states to null when component unmounts.
useEffect( () => {
    meditationToUpdate();
    return () => {
        setTitle(null);
        setEntry(null);
    }
},[]);

// Gets the journal entry to be udated.
    const meditationToUpdate = () => {
        getSingleThought(id)
        .then(result => {
            if(result.error) {
                navigate('/NotFound');
            } else if(result) {
                if(user._id !== result.author) {
                    navigate('/forbidden');
                }
                setTitle(result.title);
                setEntry(result.entry);
            } else {
                navigate('/error');
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

// A function that returns the inputs values of the displayed journal entry.
    const entryValues = () => {
        const values = {
            title,
            entry
        }
        return values;
    }
    
// Posts the updated journal entry.
    const updateEntry = () => {
        const entry = entryValues();

        updateMeditation(id, entry)
        .then(data => {
            if(!data) {
                navigate(`/meditations/${id}`)
            } else if(data?.error) {
                setErrors([data?.error])
            } else {
                navigate('/error');
            }
        }).catch( error => {
            console.log(error);
        });
    }
   
// Sets the inputs value to that of a user as it is typed in.   
    const change = (event) => {
        const name = event.target.name
        const value = event.target.value;
        (name === 'title') ? setTitle(value) : setEntry(value);
    }

// Prevent the form from submitting & calls the updateentry func.   
    const submit = (e) => {
        e.preventDefault();
        updateEntry();
    }

// Go back(1 page back) to previous page.    
   const goBack = () => {
    return navigate(-1)
   }

    return (
        <div className="bounds entry--detail">
    <h1 className="entry">Update Meditation</h1>
    <div>
      <form>
        <div className="grid-66  entry-desc">
          <div className="entry--header">
            <h4 className="entry--label">Meditation</h4>
            {/* errors go here */}
            {<ul>
              {errors?.map((error, i) => 
                <li key={i}>{error}</li>
              )}
            </ul>}
            <div><input id="title" name="title" type="text" className="input-title entry--title--input" placeholder="Meditation Title..." onChange={ change } value={ title }></input></div>
            <p></p>
          </div>
          <div className="entry--description">
            <div><textarea id="description" name="entry" className="" placeholder="Meditation Entry..." onChange={ change } value={ entry }></textarea></div>
          </div>
        </div>
      </form>
      <div className="grid-100 pad-bottom"><button className="button  move-left" type="submit" onClick={ submit }>Update Meditation</button><button className="button button-secondary" onClick={ goBack }>Cancel</button></div>
    </div>
  </div>
    );
}

export default UpdateMeditation;