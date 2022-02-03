//This holds the list of entrys on my page. 

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../Context.js'

const Journal = () => {   
  const [ entries, setEntries ] = useState();
  const context = useContext(Context);
  const { user } = useContext(Context).cookies;

  const navigate = useNavigate();
    
  const getAllJEntries = async () => {
    const email = user?.email;
    const password = user?.password;
    if( user ) {
      await context.data.getAllJournalEntries(email, password)
    .then(response => {
      if(response) {
       setEntries(response);
      } else {
        console.log(response);
        navigate('/error')
      }
    });
    }
  }
    useEffect(() => {
      getAllJEntries();
      return () => {
        setEntries(null);
      }
    }, []);

      const journals = entries?.map((entry, i) => 
        <div className="grid-33" key={i}><Link to={`/journal/${entry._id}`} className="entry--module entry--link">
          <h4 className="entry--label">{entry.createdAt}</h4>
          <h3 className="entry--title">{entry.title}</h3>
          </Link>
        </div>
      )
      

  return (
      <div className="bounds"> 
        { journals }
      <div className="grid-33"><Link to="/journal/entry" className="entry--module entry--add--module">
          <h3 className="entry--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Entry</h3>
        </Link></div>
    </div>
  );
}

export default Journal;