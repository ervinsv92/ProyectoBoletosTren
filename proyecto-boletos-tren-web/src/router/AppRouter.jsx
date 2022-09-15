import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Historial } from '../components/Historial';
import { Venta } from '../components/Venta';

export const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Venta/>} />
            <Route path='/historial' element={<Historial/>} />
        </Routes>
    </Router>
  )
}
