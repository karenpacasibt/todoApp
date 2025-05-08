import { useEffect, useState } from 'react';
import TagService from '@services/tagService';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../../layouts/Paginate';
import DeleteModal from './DeleteModal'

function Tag() {
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tagsPerPage = 10;

    useEffect(() => {
        TagService.getAll()
            .then(data => { setTags(data.data ?? data); })
            .catch(err => console.error(err));
    }, []);

    const totalPages = Math.ceil(tags.length / tagsPerPage);
    const indexOfLastTag = currentPage * tagsPerPage;
    const indexOfFirstTag = indexOfLastTag - tagsPerPage;
    const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            await TagService.delete(tagToDelete.id);
            handleCloseModal();
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
                    {currentTags.map((tag, index) => (
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
                currentPage={currentPage}
                totalPages={totalPages}
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