import { useEffect, useState } from 'react';
import TaskService from '@services/taskService';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../../layouts/Paginate';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 8;

    useEffect(() => {
        TaskService.getAll()
            .then(data => { setTasks(data.data.data); })
            .catch(err => console.error(err));
    }, []);

    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
                    {currentTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.status}</td>
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
                                <Link to={`#`}>
                                    <Button size="sm" variant="warning" className="me-2"><i className="bi bi-pencil-fill"></i></Button>
                                </Link>
                                <Link to={`#`}>
                                    <Button size="sm" variant="primary" className="me-2"><i className="bi bi-eye-fill"></i></Button>
                                </Link>
                                <Button size="sm" variant="danger"><i className="bi bi-trash-fill"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Task;