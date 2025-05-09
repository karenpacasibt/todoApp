import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CategoryService from '@services/categoryService';

export default function ShowPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        CategoryService.get(id)
            .then(({ data }) => {

                setCategory(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar la categoria:', error);
                setLoading(false);
                if (error.response && error.response.status === 404) {
                    navigate('/category');
                }
            });
    }, [id, navigate]);
    if (loading) return <p className="text-center mt-5">Cargando...</p>;
    return (
        <div className="w-75 m-auto mt-5 bg-white p-5 rounded shadow">
            <h3 className="text-center mb-4">Información de la Categoria</h3>
            <p><strong>ID:</strong> {category.id}</p>
            <p><strong>Nombre:</strong> {category.name}</p>

            <div className="text-center mt-4">
                <Link to="/category/">
                    <Button variant="primary">Atrás</Button>
                </Link>
            </div>
        </div>
    );
}
