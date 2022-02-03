import React, {useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import ReactMarkDown from 'react-markdown';
import { Context } from '../Context.js';

const MeditationDisplay = () => {
    const [entries, setEntries] = useState();
    const { user } = useContext( Context ).cookies;
    const { getSingleThought, deleteMeditation } = useContext( Context ).data;
    const { id } = useParams();
    const navigate = useNavigate();

    const getOneEntry = () => {
        getSingleThought(id)
        .then(result => {
            if(result.error) {
                navigate('/NotFound');
            } else if(result) {
                return (user._id !== result.author) 
                ?  
                navigate('/forbidden') 
                : 
                setEntries(result);
            } else {
                navigate('/error');
            }
        })
    }

    const deleteThought = () => {

        deleteMeditation(id)
        .then(result => {
            if(result === null) {
                navigate('/meditations');
            } else if(result?.error) {
                navigate('/NotFound');
            } else {
                navigate('/error');
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    const deleteM = () => {
        deleteThought();
    }

    useEffect(() => {
        getOneEntry();
        return () => {
            setEntries(null);
        }
    }, []);

    return (
        <div>
        <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span><Link to={`/meditations/${id}/update`} className="button">Update Course</Link><a className="button" onClick={ deleteM }>Delete Course</a></span><Link to='/meditations' className="button button-secondary">
            Return to List</Link></div>
        </div>
        </div>
        <div className="bounds entry--detail">
            <div className="grid-66">
            <div className="entry--header">
                <h4 className="entry--label">Journal</h4>
                <h3 className="entry--title">{entries?.title}</h3>
                <p>{`By ${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className="entry--description">
                {<ReactMarkDown children={entries?.entry} />}
            </div>
            </div>
            <div className="grid-25 grid-right">
            <div className="entry--stats">
                <ul className="entry--stats--list">
                <li className="entry--stats--list--item">
                    <h4>Date Created</h4>
                    <h3>{ entries?.createdAt.slice(0, 10) }</h3>
                </li>
                <li className="entry--stats--list--item">
                    <h4>Date Updated</h4>
                    <h3>{ entries?.updatedAt.slice(0, 10) }</h3>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    );
}

export default MeditationDisplay;