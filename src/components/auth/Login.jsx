import { useState } from 'react';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import '@styles/Login.css';
import Auth from '@services/authService';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ mail: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Auth.login(credentials);
            const token = response.token;           
            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            setError('The username or password are incorrect!');
            console.error('Login failed', error);
        }
    };

    return (
        <div className='div-login'>
            <Card className="login-card shadow-lg">
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>

                    {error && (
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="mail"
                                name="mail"
                                placeholder="mail"
                                value={credentials.mail}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye'}`}></i>
                                </Button>
                            </InputGroup>

                        </Form.Group>

                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                className="gradient-btn"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="text-center mt-3">
                            <span>Don't have an account? </span>
                            <Button variant="link" onClick={() => navigate('/register')}>
                                Create one
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
