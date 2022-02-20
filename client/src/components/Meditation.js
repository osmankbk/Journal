//My Meditation component.

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../Context.js'

const Meditation = () => {   
// Gives the Journal access to Context component.
  const context = useContext(Context);
// Access the user stored in cookies, in the Context component
  const user = useContext(Context).authenticatedUser;

// Access the query string through the useLocation func
  const location = useLocation();
  const page = location.search;

// Call the useNavigation func and save it to a variable to be used throughtout the journal component.
const navigate = useNavigate();

// Set Component's state.
  const [ inputValue, setInputValue ] = useState(page.slice(6, 8) || '1');
  const [ entries, setEntries ] = useState();


// Immediately run all Embeded functions when component mounts.
  useEffect(() => {
    disableBtns();
    getAllMEntries();
    return () => {
      setEntries(null);
    }
  }, []);


// Get all entries    
  const getAllMEntries = async () => {
    const email = user?.email;
    const password = user?.password;
    if( user ) {
      await context.data.getAllMeditations(email, password, page)
    .then(response => {
      if(response) {
       setEntries(response);
      } else {
        navigate('/error')
      }
    });
    }
  }

// This allows the search input's value to be that of the Users, as it is typed.
  const changeInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'page') {
      setInputValue(value);
    }
  }

// Disables the "older entries" button when user is on the last page.
  const disableBtns = () => {
    const currentPage = parseInt(inputValue);
    const left =  document.getElementById('left-nav');

    if(currentPage <= 1) {
      left.removeAttribute('href', 'true');
      left.style.color = 'gray';
    } 
  }

// Map over entries from backend, and display each as a module on the journal page.
  const thoughts = entries?.meditations?.map((entry, i) => 
    <div className="grid-33" key={i}><Link to={`/meditations/${entry._id}`} className="entry--module entry--link">
      <h4 className="entry--label">{entry.createdAt.slice(0, 10)}</h4>
      <h3 className="entry--title">{entry.title}</h3>
      </Link>
    </div>
  )
      

  return (
      <div className="bounds"> 
        { thoughts }
      <div className="grid-33"><Link to="/meditations/create" className="entry--module entry--add--module">
          <h3 className="entry--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Entry</h3>
        </Link></div>

        {/* Pagination and Search-able pagination section below */}
        <div id="footer">
        <nav className="pagination">
                <span className="left-arr-span">
                    <a id="left-nav" className="nav-hook" href={`/meditations/?page=${inputValue -1}`} >
                      <span className="span-in-btn">
                          <p><i id="left" className="arrow left"></i>Newer Entries</p>
                      </span>
                    </a>
                </span>

                <form className="pagination-form" action={`/meditations/?page=${inputValue}`} method="get">
                    <input type="text" id="form-input" name="page" onChange={ changeInputValue } value={ inputValue } autoComplete="off"/>
                </form>

                <span>
                    <span id="num-of-pages">
                        {`of ${entries?.numOfPages || '1'} pages`}
                    </span>
                </span>

                <span className="right-arr-span">
                      <a id="right-nav" className="nav-hook" href={`/meditations/?page=${parseInt( inputValue ) +1}`} >
                        <span className="span-in-btn">
                            <p>Older Entries <i className="arrow right"></i></p>
                        </span>
                      </a>
                </span>
            </nav>

        </div>
    </div>
  );
}

export default Meditation;