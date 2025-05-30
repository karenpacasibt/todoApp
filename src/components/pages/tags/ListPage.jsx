import { useEffect, useState } from 'react';
import TagService from '@services/tagService';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../../layouts/Paginate';
import DeleteModal from './DeleteModal'

function Tag() {
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const fetchTags = (page = 1) => {
        TagService.getAll(page)
            .then(data => {
                setTags(data.data);
                setPagination(data);
                setCurrentPage(data.current_page);
            })
            .catch(err => console.error('Error al cargar los tags:', err));
    };

    useEffect(() => {
        fetchTags(currentPage);
    }, []);

    const handlePageChange = (pageNumber) => {
        fetchTags(pageNumber);
    };

    const [tagToDelete, setTagToDelete] = useState(null);

    const handleOpenModal = (tag) => {
        setTagToDelete(tag);
    };

    const handleCloseModal = () => {
        setTagToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!tagToDelete) return;
        try {
            await TagService.destroy(tagToDelete.id);
            handleCloseModal();
            fetchTags(currentPage);
            setTags(prev => prev.filter(tag => tag.id !== tagToDelete.id));

        } catch (error) {
            console.error('Error al eliminar la etiqueta:', error);
        }
    };

    return (
        <div className='w-75 m-auto mt-5 bg-white d-flex justify-content-center flex-column p-5'>
            <Link to="/tag/create">
                <Button variant="success">+ New Tag</Button>
            </Link>
            <h2>Listado de Tag</h2>
            <Table>
                <thead>
                    <tr>
                        <th className="col-md-1" scope="col">#</th>
                        <th className="col-md-6" scope="col">Tag name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag.id}>
                            <td>{tag.id}</td>
                            <td>{tag.name}</td>
                            <td>
                                <Link to={`/tag/edit/${tag.id}`}>
                                    <Button size="sm" variant="warning" className="me-2"><i className="bi bi-pencil-fill"></i></Button>
                                </Link>
                                <Link to={`/tag/${tag.id}`}>
                                    <Button size="sm" variant="primary" className="me-2"><i className="bi bi-eye-fill"></i></Button>
                                </Link>
                                <Button size="sm" variant="danger" onClick={() => handleOpenModal(tag)}><i className="bi bi-trash-fill"></i></Button>
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
                show={!!tagToDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                tag={tagToDelete}
            />
        </div>
    );
}

export default Tag;