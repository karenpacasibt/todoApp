import { useEffect, useState } from 'react';
import CategoryService from '@services/categoryService';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../../layouts/Paginate';
import DeleteModal from './DeleteModal';

function Category() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [pagination, setPagination] = useState({});

    const fetchCategories = (page = 1) => {
        CategoryService.getAll(page)
            .then(data => {
                setCategories(data.data);
                setPagination(data);
                setCurrentPage(data.current_page);
            })
            .catch(err => console.error('Error al cargar las categorias:', err));
    };

    useEffect(() => {
        fetchCategories(currentPage);
    }, []);

    const handlePageChange = (pageNumber) => {
        fetchCategories(pageNumber);
    };

    const handleOpenModal = (category) => {
        setCategoryToDelete(category);
    };

    const handleCloseModal = () => {
        setCategoryToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await CategoryService.destroy(categoryToDelete.id);
            handleCloseModal();
            fetchCategories(currentPage);
            setCategories(prev => prev.filter(category => category.id !== categoryToDelete.id));

        } catch (error) {
            console.error('Error al eliminar la categoria:', error);
        }
    };
    return (
        <div className='w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5'>
            <Link to="/category/create">
                <Button variant="success">+ Nueva Categoria</Button>
            </Link>
            <h2>Listado de Categorias</h2>
            <Table>
                <thead>
                    <tr>
                        <th className="col-md-1" scope="col">ID</th>
                        <th className="col-md-6" scope="col">Nombre categoria</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link to={`/category/edit/${category.id}`}>
                                    <Button size="sm" variant="warning" className="me-2"><i className="bi bi-pencil-fill"></i></Button>
                                </Link>
                                <Link to={`/category/${category.id}`}>
                                    <Button size="sm" variant="primary" className="me-2"><i className="bi bi-eye-fill"></i></Button>
                                </Link>
                                <Button size="sm" variant="danger" onClick={() => handleOpenModal(category)}><i className="bi bi-trash-fill"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate
                currentPage={pagination.current_page}
                totalPages={pagination.last_page}
                onPageChange={handlePageChange}
            />
            <DeleteModal
                show={!!categoryToDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                category={categoryToDelete}
            />
        </div>
    );
}

export default Category