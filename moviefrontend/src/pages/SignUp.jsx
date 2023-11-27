import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/AuthContext';
import AccountClient from '../api/accountClient';
import { useNavigate } from 'react-router';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUsernameChange = (event) => {
        console.log('Username changed:', event.target.value);
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const calculatePasswordStrength = () => {
        return password.length * 10;
    };

    const getPasswordStrengthVariant = () => {
        const strength = calculatePasswordStrength();
        if (strength < 50) {
            return 'danger';
        }
        if (strength < 80) {
            return 'warning';
        }
        return 'success';
    }

    const handleSignUp = async () => {
        console.log('Signing up with username:', username);
        try {
            const accountClient = new AccountClient();
            const signUpResponse = await accountClient.SignUp(username, email, password, role);

            if (!signUpResponse.ok) {
                throw new Error('Error signing up');
            }

            const signInReponse = await accountClient.SignIn(username, password);

            if (!signInReponse.ok) {
                throw new Error('Error signing in');
            }

            const data = await signInReponse.json();
            console.log('Signed in: ', data);
            const jwttoken = data.token;
            const jwtusername = data.userName;

            // Use the login function from useAuth to update the authentication state
            login(jwttoken, jwtusername);
            navigate('/');
            // TODO: pop up a message to let user know they are signed up and signed in?
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <p>Sign up for an account to save your favorite movies!</p>
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="username"
                        value={username}
                        onChange={handleUsernameChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                         />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <ProgressBar className="mb-3" animated now={calculatePasswordStrength()} striped variant={getPasswordStrengthVariant()} />

                <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                        type="role" 
                        placeholder="role"
                        value={role}
                        onChange={handleRoleChange}
                         />
                </Form.Group>

                <Button onClick={handleSignUp} variant="primary">
                    Sign Up
                </Button>
            </Form>
        </>
    );
}

export default SignUp;