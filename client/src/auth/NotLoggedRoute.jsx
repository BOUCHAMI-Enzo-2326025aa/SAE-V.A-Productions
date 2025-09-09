import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const NotLoggedRoute = ({children}) => {
    const { user } = useAuth();

    if(user) {
        return <Navigate to={"/dashboard"} replace />;
    }

    return <>{children}</>
}

export default NotLoggedRoute
