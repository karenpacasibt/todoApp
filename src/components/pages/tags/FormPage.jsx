import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import TagService from '@services/tagService';
import { useState } from 'react';

function FormPage() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        TagService.store({ name })
            .then(() => {
                navigate('/tag');
            })
            .catch((error) => {
                console.error("Error al crear la etiqueta:", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>Crear Etiqueta</h3>
            <Form.Group className="mb-3">
                <Form.Label>Nombre la etiqueta</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la etiqueta" value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">Crear</Button>
            </div>
        </Form>
    );
}

export default FormPage;