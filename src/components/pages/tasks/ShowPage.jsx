import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import CategoryService from '@services/categoryService';
import TagService from '@services/tagService';
import TaskService from '@services/taskService';
import ErrorModal from './ErrorModal';

export default function ShowPage() {
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        Promise.all([
            CategoryService.getAll(),
            TagService.getAll(),
            TaskService.get(id)
        ])
            .then(([categoryRes, tagRes, taskRes]) => {
                setCategories(categoryRes.data);
                setTags(tagRes.data);
                setTask(taskRes.data);
            })
            .catch(error => {
                console.error(error);
                setError('Ocurrió un error al hacer cargar los datos, vuelva intertarlo después.');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center mt-5">Cargando...</p>;
    if (!task) return <p className="text-center text-danger">No se encontró la tarea.</p>;

    const categoryName = categories.find(c => c.id === task.id_category)?.name || 'Desconocida';
    const tagNames = task.tags?.map(tag => tag.name).join(', ') || 'Sin etiquetas';

    return (
        <>
            <div className="w-75 m-auto mt-5 bg-white p-5 rounded shadow">
                <h3 className="text-center mb-4">Información de la Tarea</h3>
                <ErrorModal error={error} onClose={() => setError(null)} />
                <p><strong>ID:</strong> {task.id}</p>
                <p><strong>Título:</strong> {task.title}</p>
                <p><strong>Descripción:</strong> {task.description}</p>
                <p><strong>Categoría:</strong> {categoryName}</p>
                <p><strong>Etiquetas:</strong></p>
                {task.tags && task.tags.length > 0 ? (
                    <ul className="list-group list-group-flush mb-3">
                        {task.tags.map(tag => (
                            <li key={tag.id} className="list-group-item">
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">Sin etiquetas</p>
                )}


                <div className="text-center mt-4">
                    <Link to="/task">
                        <Button variant="primary">Atrás</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
