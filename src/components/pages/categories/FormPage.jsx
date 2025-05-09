import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import CategoryService from '@services/categoryService';
import { useState } from 'react';

function FormPage() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        CategoryService.store({ name })
            .then(() => {
                navigate('/category');
            })
            .catch((error) => {
                console.error("Error al crear la categoria:", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>Crear Categoria</h3>
            <Form.Group className="mb-3">
                <Form.Label>Nombre la categoria</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la categoria" value={name}
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