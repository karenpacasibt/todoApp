import { useEffect, useState } from 'react';
import TaskService from '@services/taskService';
import { Button, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../../layouts/Paginate';
import DeleteModal from './DeleteModal';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [paginate, setPaginate] = useState({});
    const handleToggleStatus = async (taskId, currentStatus) => {
        try {
            const updatedTask = await TaskService.update(taskId, {
                status: !currentStatus
            });

            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? { ...task, status: updatedTask.status } : task
                )
            );
            console.log(updatedTask);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchTasks = (page = 1) => {
        TaskService.getAll(page)
            .then(data => {
                setTasks(data.data);
                setPaginate(data);
                setCurrentPage(data.current_page);
            })
            .catch(err => console.error('Error al cargar las tareas:', err));
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const handleOpenModal = (task) => {
        setTaskToDelete(task);
    };

    const handleCloseModal = () => {
        setTaskToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;
        try {
            await TaskService.delete(taskToDelete.id);
            handleCloseModal();
            fetchTasks(currentPage);
            setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));

        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    return (
        <div className='w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5'>
            <Link to="/task/create">
                <Button variant="success">+ Nueva Tarea</Button>
            </Link>
            <h2>Listado de Tareas</h2>
            <Table>
                <thead>
                    <tr>
                        <th className="col-md-1" scope="col"><i className="bi bi-check-square"></i></th>
                        <th className="col-md-2" scope="col">Nombre Tarea</th>
                        <th className='col-md-2' scope='col'>Descripcion</th>
                        <th className='col-md-2' scope='col'>Categoria</th>
                        <th className='col-md-2' scope='col'>Etiquetas</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td><input type="checkbox"
                                checked={task.status}
                                onChange={() => handleToggleStatus(task.id, task.status)} />
                            </td>
                            <td>{task.title}</td>
                            <td className='fst-italic'>{truncateText(task.description, 20)}</td>
                            <td className='fw-light'>{task.category?.name}</td>
                            <td>
                                {task.tags.map(tag => (
                                    <span key={tag.id} className="badge bg-primary me-1">
                                        {tag.name}
                                    </span>
                                ))}
                            </td>
                            <td>
                                <Link to={`/task/edit/${task.id}`}>
                                    <Button size="sm" variant="warning" className="me-2"><i className="bi bi-pencil-fill"></i></Button>
                                </Link>
                                <Link to={`/task/${task.id}`}>
                                    <Button size="sm" variant="primary" className="me-2"><i className="bi bi-eye-fill"></i></Button>
                                </Link>
                                <Button size="sm" variant="danger" onClick={() => handleOpenModal(task)}><i className="bi bi-trash-fill"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate
                currentPage={paginate.current_page}
                totalPages={paginate.last_page}
                onPageChange={handlePageChange}
            />
            <DeleteModal
                show={!!taskToDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                task={taskToDelete}
            />
        </div>
    );
}

export default Task;