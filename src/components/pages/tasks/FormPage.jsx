import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getAll()
            .then(data => setCategories(data.data))
            .catch(err => console.error(err));

        TagService.getAll()
            .then(data => {
                const tagOptions = data.data.map(tag => ({ value: tag.id, label: tag.name }));
                setTags(tagOptions);
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        TaskService.store({
            ...formData,
            id_category: parseInt(formData.id_category),
            tags: selectedTags.map(tag => tag.value),
            action_suggestion: selectedOption?.value || ''
        })
            .then(() => navigate('/task'))
            .catch((error) => console.error("Error al crear la tarea:", error));
    };

    return (
        <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5">
            <h3 className='text-center mb-4'>Crear Tarea</h3>

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
                <Button variant="primary" type="submit">Crear</Button>
            </div>
        </Form>
    );
}

export default FormPage;