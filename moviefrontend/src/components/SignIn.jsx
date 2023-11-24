import React from 'react';
import Form from 'react-bootstrap/Form';

function SignIn() {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label column sm="2"> Password </Form.Label>
                <Form.Control type="password" placeholder="password" />
            </Form.Group>

        </Form>
    );
}

export default SignIn;