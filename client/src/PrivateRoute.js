import React, { useContext} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from './Context.js'

const RequireAuth = () => {
    const { user } = useContext(Context).cookies
    const location = useLocation();
    return user ? <Outlet />: <Navigate to="/login" state={{from: location}}/>;
}

export default RequireAuth;