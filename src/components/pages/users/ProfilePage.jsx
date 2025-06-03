import { useEffect, useState } from 'react';
import userService from '@services/userService';

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getProfile();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Perfil de Usuario</h1>
            <p><strong>Nombre:</strong> {user.full_name}</p>
            <p><strong>Correo:</strong> {user.mail}</p>
        </div>
    );
}
