import { Alert, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import CategoryService from '@services/categoryService';
import { useEffect, useState } from 'react';

function FormPage() {
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '' });


    useEffect(() => {
        if (id) {
            CategoryService.get(id).then(response => {
                setFormData({ name: response.data.name });
            }).catch(error => {
                console.error('Error al cargar la categoria', error);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const request = id
            ? CategoryService.update(formData, id)
            : CategoryService.store(formData);
        request
            .then(() => navigate('/category'))
            .catch(error => {
                if (error.response?.status === 422) {
                    const validation = error.response.data.errors;
                    setError(validation.name?.[0] || 'Error de validación');
                } else {
                    console.error('Error inesperado al guardar la categoría:', error);
                }
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>{id ? 'Editar' : 'Crear'} Categoria</h3>
            <Form.Group className="mb-3">
                <Form.Label>Nombre la categoria</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la categoria" value={formData.name}
                    name="name"
                    onChange={handleChange}
                    required
                />
                {error && <Alert variant="danger">{error}</Alert>}
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">{id ? 'Guardar' : 'Crear'}</Button>
            </div>
        </Form>
    );
}

export default FormPage;