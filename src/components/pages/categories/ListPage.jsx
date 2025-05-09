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
    const categoriesPerPage = 8;

    useEffect(() => {
        CategoryService.getAll()
            .then(data => { setCategories(data.data ?? data); })
            .catch(err => console.error(err));
    }, []);

    const totalPages = Math.ceil(categories.length / categoriesPerPage);
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            await CategoryService.delete(categoryToDelete.id);
            handleCloseModal();
            setCategories(prev => prev.filter(category => category.id !== categoryToDelete.id));

        } catch (error) {
            console.error('Error al eliminar la etiqueta:', error);
        }
    };
    return (
        <div className='w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5'>
            <Link to="/category/create">
                <Button variant="success">+ New Category</Button>
            </Link>
            <h2>Listado de Category</h2>
            <Table>
                <thead>
                    <tr>
                        <th className="col-md-1" scope="col">#</th>
                        <th className="col-md-6" scope="col">Category name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories.map((category) => (
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
                currentPage={currentPage}
                totalPages={totalPages}
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