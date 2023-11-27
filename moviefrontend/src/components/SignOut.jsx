import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import AccountClient from '../api/accountClient';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const SignOut = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            logout();
            // redirect user back to home page when signed out
            // TODO: pop up a message to let user know they are signed out?
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Button variant='secondary' onClick={handleLogout}>Sign Out</Button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignOut;