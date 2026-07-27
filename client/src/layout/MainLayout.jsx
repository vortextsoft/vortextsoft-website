import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cosmic3DRouter from '../components/Cosmic3DRouter';

const MainLayout = () => {
    return (
        <div className="main-layout" style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Conditional 3D WebGL Background Router */}
            <Cosmic3DRouter />

            <Navbar />
            <main id="main-content" style={{ position: 'relative', zIndex: 2 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
