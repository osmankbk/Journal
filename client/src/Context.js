// My react Context to pass props and avoiding props drilling.
import React, { useState, useEffect} from 'react';
// import { useCookies } from "react-cookie";
// import Cookies from "js-cookie";
import { ReactSession } from 'react-client-session';
import Data from './Data';

ReactSession.setStoreType('sessionStorage');

export const Context = React.createContext();

// Provide function
export const Provider = (props) =>  {
    // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [ authenticatedUser, setAuthenticatedUser] = useState(ReactSession.get('user') || null);
    // Passing my data file stored with my HTTP function calls to Provider, ensures that all my component has access to them.
    const data = new Data();


    const signIn = async (email, password) => {
        const user = await data?.getUser(email, password);
        if(user !== null) {
            setAuthenticatedUser(user);
            ReactSession.set('user', user);
        }
        return user;
     }

    const signOut = () => {
        ReactSession.remove('user');
        setAuthenticatedUser(null);
    }
    
    return(
        <Context.Provider value={{
            authenticatedUser,
            data,
            actions: {
            signin: signIn,
            logout: signOut
            }
        }}>
            {props.children}
        </Context.Provider>
    )
}


// A Higher Order consumer function
export default function contextConsumer(Component) {
    return function componentWithContext(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={ context }/>}
            </Context.Consumer>
        );
    }
}
