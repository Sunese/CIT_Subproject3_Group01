import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import AccountClient from '../api/accountClient';
import { useNavigate } from 'react-router';

const SignIn = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            console.log('Signing in with username:', username);
            const accountClient = new AccountClient();
            const response = await accountClient.SignIn(username, password);

            if (!response.ok) {
                console.error('Error signing in:', response);
                setErrorMessage('Invalid credentials');
                return;
            }

            const data = await response.json();
            console.log('Signed in: ', data);
            const signedInUsername = data.userName;
            const token = data.token;

            // Use the login function from useAuth to update the authentication state
            login(token, signedInUsername);
            navigate('/');
            // TODO: pop up a message to let user know they are signed in?
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSignIn}>Sign In</button>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        </div>
    );
};

export default SignIn;