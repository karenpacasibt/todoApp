import { Outlet } from "react-router-dom";
import Navbar from "../main/Navbar";
import Sidebar from "../main/Sidebar";
import Footer from "../main/Footer";
import { useEffect, useState } from 'react';
import api from '@services/api'

export default function MainLayout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex d-flex">
                <Sidebar />
                <div className="layout-content w-100">
                    <Outlet />

                    <Footer />
                </div>
            </div>
        </div>
    );
}


