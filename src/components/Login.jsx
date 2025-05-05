import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import '../stylesheets/Login.css'

const Login = () => {
    return (
        <div className='div-login'>
            <Card className="login-card shadow-lg">
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit" className="gradient-btn">
                            Login
                        </Button>
                    </div>
                </Form>

                <div className="mt-3 text-center">
                    <a href="#">Forgot <strong>Password?</strong></a>
                </div>
                <div className="mt-2 text-center">
                    Don't have an account? <a href="#"><strong>Sign up</strong></a>
                </div>
            </Card.Body>
        </Card>
        </div>
    );
};

export default Login;
