import { useState } from 'react';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import Auth from '@services/authService';
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ full_name: '', mail: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { full_name, mail, password } = form;

        if (!full_name || !mail || !password) {
            return setError('All fields are required');
        }

        if (!validatePassword(password)) {
            return setError('Password must be at least 10 characters and include uppercase, lowercase, number and symbol.');
        }

        try {
            await Auth.register(form);
            setSuccess('Account created! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className='div-login'>
            <Card className="login-card shadow-lg">
                <Card.Body>
                    <h2 className="text-center mb-4">Registro</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={form.full_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="mail"
                                placeholder="Email"
                                value={form.mail}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye'}`}></i>
                                </Button>
                                <Form.Text muted>
                                    Debe tener más de 10 caracteres e incluir un símbolo, un número, una letra minúscula y una mayúscula.
                                </Form.Text>
                            </InputGroup>
                            <div>
                                <span>Ya tengo uan cuenta</span>
                                <Button variant="link" onClick={() => navigate('/login')}>
                                    Ingresar
                                </Button>
                            </div>
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="success" type="submit" className="gradient-btn">
                                Registrar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
