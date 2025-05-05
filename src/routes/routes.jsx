import React from 'react'
import Login from '../components/Login'
import MainLayout from '../components/Navbar'
import '../stylesheets/Login.css'

export const routes = [
    { path: '/', element: <MainLayout /> },
    { path: '/login', element: <div className='div-login'> <Login /> </div> }
];