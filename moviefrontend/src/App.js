import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Name from './pages/Name';
import Title from './pages/Title';
import Index from './pages/Index';
import Layout from './pages/Layout';

const App = () =>
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Index/>} />
            <Route path="/title/:id" element={<Title/>} />
            <Route path="/name/:id" element={<Name/>} />
        </Route>
    </Routes>

export default App;