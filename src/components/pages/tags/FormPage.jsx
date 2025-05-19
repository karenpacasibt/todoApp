import { Alert, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import TagService from '@services/tagService';
import { useEffect, useState } from 'react';

function FormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            TagService.get(id).then(response => {
                setFormData({ name: response.data.name });
            }).catch(error => {
                console.error('Error al cargar la etiqueta:', error);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const request = id
            ? TagService.update(formData, id)
            : TagService.store(formData);
        request
            .then(() => navigate('/tag'))
            .catch(error => {
                if (error.response?.status === 422) {
                    const validation = error.response.data.errors;
                    setError(validation.name?.[0] || 'Error de validación');
                } else {
                    console.error('Error inesperado al guardar la etiqueta:', error);
                }
            });

    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>{id ? 'Editar' : 'Crear'} Etiqueta</h3>
            <Form.Group className="mb-3">
                <Form.Label>Nombre la etiqueta</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la etiqueta" name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {error && <Alert variant="danger">{error}</Alert>}
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
            </div>
        </Form>
    );
}

export default FormPage;