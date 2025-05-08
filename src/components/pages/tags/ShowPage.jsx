import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import TagService from '@services/tagService';

export default function ShowPage() {
    const { id } = useParams();
    const [tag, setTag] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        TagService.get(id)
            .then(({data}) => {
                setTag(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar el tag:', error);
                setLoading(false);
            });
    }, [id]);
    if (loading) return <p className="text-center mt-5">Cargando...</p>;  
    
    return (
        <div className="w-75 m-auto mt-5 bg-white p-5 rounded shadow">
            <h3 className="text-center mb-4">Información de la Etiqueta</h3>
            <p><strong>ID:</strong> {tag.id}</p>
            <p><strong>Nombre:</strong> {tag.name}</p>
            
            <div className="text-center mt-4">
                <Link to="/tag/">
                    <Button variant="primary">Atrás</Button>
                </Link>
            </div>
        </div>
    );
}
