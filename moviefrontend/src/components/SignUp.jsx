import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

function SignUp() {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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

    return (
        <>
            <h1>Sign Up</h1>
            <p>Sign up for an account to save your favorite movies!</p>
        <Form>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
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

            <ProgressBar className="mb-3" animated now={calculatePasswordStrength()} striped variant={getPasswordStrengthVariant()}/>
        <Button variant="primary" type="submit">
            Sign Up
        </Button>
        </Form>
        </>
    );
}

export default SignUp;