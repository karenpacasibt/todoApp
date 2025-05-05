import { Outlet } from "react-router-dom";
import Navbar from "../main/Navbar";
import Sidebar from "../main/Sidebar";
import Footer from "../main/Footer";
import '@styles/Layout.css'

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex d-flex">
                <Sidebar />
                <div className="layout-content">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </div>
    );
}
