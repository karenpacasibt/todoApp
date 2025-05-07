import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import TagService from '@services/tagService';
import { useEffect, useState } from 'react';

function FormPage() {
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            TagService.get(id).then(response => {
                setName(response.data.name);
            }).catch(error => {
                console.error('Error al cargar la etiqueta:', error);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name };

        const request = id
            ? TagService.update(data, id)
            : TagService.store(data);
        request
            .then(() => navigate('/tag'))
            .catch(error => {
                console.error("Error al guardar la etiqueta:", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>{id ? 'Editar' : 'Crear'} Etiqueta</h3>
            <Form.Group className="mb-3">
                <Form.Label>Nombre la etiqueta</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la etiqueta" value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
            </div>
        </Form>
    );
}

export default FormPage;