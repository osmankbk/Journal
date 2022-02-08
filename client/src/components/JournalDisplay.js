//My Journal component.
import React, {useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';
import { Context } from '../Context.js';

// Displays my Journal entries
const JournalDisplay = () => {
// Set Modal's state
    const [show, setShow] = useState(false);
// Set Component's state.    
    const [entries, setEntries] = useState();

// Gives Meditation Component access to the Context component.
    const user = useContext( Context ).authenticatedUser;
    const { getSingleEntry, deleteJournal } = useContext( Context ).data;

// Call react-bootstrap modal show functions    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

// Save UseParams function's id to variable id; for access throughout component.
    const { id } = useParams();
// save useNavigation to navigate variable; for access throughout component.
    const navigate = useNavigate();
  
// Calls all embeded funcs upon component's mount.
    useEffect(() => {
        const one = getOneEntry();
        return () => {
            setEntries(null);
        }
    }, []);

// Get a single entry to be displayed
    const getOneEntry = () => {
        getSingleEntry(id)
        .then(result => {
            if(result.error) {
                return navigate('/NotFound');
            } else if(result) {
                return (user._id !== result.author) 
                ?  
                navigate('/forbidden') 
                : 
                setEntries(result);

            } else {
                return navigate('/error');
            }
        }).catch(errors => {
            console.log(errors);
        })
    }

// Deletes the current(id) entry being displayed.
    const deleteEntry = () => {
        deleteJournal(id)
        .then(result => {
            if(result === null) {
                navigate('/journal');
            }
            else if(result?.error) {
                navigate('/NotFound');
            }
            else {
                navigate('/error');
            }
        });
    }
// A functions the class the delete function.
    const deleteJ = () => {
        deleteEntry();
    }

    return (
        <div>
        {/* The pop-up react-bootstrap modal; gives users a breathing room for the deletion of an entry. */}
        <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="bg-dark">
            <Modal.Title className="text-light">Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-light">This action is permanent. Do you wish to proceede?</Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" className="bg-dark" onClick={handleClose}>
              Abort
            </Button>
            <Button  variant="primary" onClick={handleClose, deleteJ}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
        <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span><Link to={`/journal/${id}/update`} className="button">Update Course</Link><a className="button" onClick={ handleShow }>Delete Course</a></span><Link to='/journal' className="button button-secondary">
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

export default JournalDisplay;