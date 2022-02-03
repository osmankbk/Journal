// My react Context to pass props and avoiding props drilling.
import React, { useState, useEffect} from 'react';
import { useCookies } from "react-cookie";
import Data from './Data';

export const Context = React.createContext();

// Pro
export const Provider = (props) =>  {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    // const [ authenticatedUser, setAuthenticatedUser] = useState(cookies);
    // Passing my data file stored with my HTTP function calls to Provider, ensures that all my component has access to them.
    const data = new Data();


    const signIn = async (email, password) => {
        const user = await data.getUser(email, password);
        if(user !== null) {
            setCookie('user', user, { path: '/'});
        }
     }

    const signOut = () => {
        return removeCookie('user');
    }
    
    return(
        <Context.Provider value={{
            cookies,
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
