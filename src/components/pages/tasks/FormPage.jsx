import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import CategoryService from '@services/categoryService';
import TaskService from '@services/taskService';
import TagService from '@services/tagService';

function FormPage() {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', id_category: '' });
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, tagRes] = await Promise.all([
                    CategoryService.getAll(),
                    TagService.getAll()
                ]);

                const tagOptions = tagRes.data.map(tag => ({
                    value: tag.id,
                    label: tag.name
                }));

                setCategories(categoryRes.data);
                setTags(tagOptions);

                if (id) {
                    const taskRes = await TaskService.get(id);
                    const task = taskRes.data;

                    setFormData({
                        title: task.title,
                        description: task.description,
                        id_category: task.id_category
                    });

                    const selected = task.tags.map(tag => ({
                        value: tag.id,
                        label: tag.name
                    }));
                    setSelectedTags(selected);
                }

            } catch (error) {
                console.error('Error al cargar datos del formulario', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            ...formData,
            id_category: parseInt(formData.id_category),
            tags: selectedTags.map(tag => tag.value),
            action_suggestion: selectedOption?.value || ''
        };

        const request = id
            ? TaskService.update(payload, id)
            : TaskService.store(payload);

        request
            .then(() => navigate('/task'))
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
            <h3 className='text-center mb-4'>{id ? 'Editar' : 'Crear'} Tarea</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Nombre de la Tarea</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Ingrese la tarea"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción de la tarea</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Ingrese la descripción de la tarea"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                    name="id_category"
                    value={formData.id_category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Etiquetas</Form.Label>
                <Select
                    isMulti
                    options={tags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    placeholder="Seleccione etiquetas..."
                />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">{id ? 'Guardar' : 'Crear'}</Button>
            </div>
        </Form>
    );
}

export default FormPage;