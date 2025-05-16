import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import '../stylesheets/Login.css';
import UserService from '@services/userService';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login(credentials);
            const token = response.token;
            localStorage.setItem('token', token);
            navigate('/me');
        } catch (error) {
            console.error('Login failed', error);
        }
    }
    return (
        <div className='div-login'>
            <Card className="login-card shadow-lg">
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
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
