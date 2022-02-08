import React, { useContext} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from './Context.js'

const RequireAuth = () => {
    const { authenticatedUser } = useContext(Context);
    const location = useLocation();
    return authenticatedUser ? <Outlet />: <Navigate to="/login" state={{from: location}}/>;
}

export default RequireAuth;