import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App = () => {
  return (
    <div className="main-body w-screen h-screen flex flex-wrap">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
