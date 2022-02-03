import React, {useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { Context } from '../Context.js';

const UpdateMeditation = () => {
    const [ errors, setErrors ] = useState();
    const [ title, setTitle ] = useState('');
    const [ entry, setEntry ] = useState('');
    const { id } = useParams();
    const { updateMeditation, getSingleThought } = useContext(Context).data;
    const { user } = useContext(Context).cookies

    const navigate = useNavigate();

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

    const entryValues = () => {
        const values = {
            title,
            entry
        }
        return values;
    }
    
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
    
    const change = (event) => {
        const name = event.target.name
        const value = event.target.value;
        (name === 'title') ? setTitle(value) : setEntry(value);
    }

    const submit = (e) => {
        e.preventDefault();
        updateEntry();
    }

   const goBack = () => {
    return navigate(-1)
   }
   
    useEffect( () => {
        meditationToUpdate();
        return () => {
            setTitle(null);
            setEntry(null);
        }
    },[]);

    return (
        <div className="bounds entry--detail">
    <h1 className="entry">Update Meditation</h1>
    <div>
      <form>
        <div className="grid-66  entry-desc">
          <div className="entry--header">
            <h4 className="entry--label">Meditation</h4>
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