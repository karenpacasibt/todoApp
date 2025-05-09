import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import CategoryService from '@services/categoryService';
import { useEffect, useState } from 'react';

function FormPage() {
    const [name, setName] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id
            ? CategoryService.update(formData, id)
            : CategoryService.store(formData);
        request
            .then(() => navigate('/category'))
            .catch(error => {
                console.error('Error al guardar la categoria: ', error);
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
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">{id ? 'Guardar' : 'Crear'}</Button>
            </div>
        </Form>
    );
}

export default FormPage;