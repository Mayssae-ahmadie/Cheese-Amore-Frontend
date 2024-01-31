import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles, fallbackPath }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole) {
        return <Navigate to="/SignIn" />;
    }

    if (!(allowedRoles.includes(userRole))) {
        return <Navigate to={fallbackPath} />;
    }

    return element;
};

export default PrivateRoute;