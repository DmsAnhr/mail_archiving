import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Login from './pages/login/views/Login';

import Home from './pages/home/views/Home';
import Category from './pages/category/views/Category';
import About from './pages/about/views/About'

import ViewDocument from './pages/document/views/ViewDocument'
import DocumentEditor from './pages/document/views/DocumentEditor'
import EditorCategory from './pages/category/views/EditorCategory'

import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  const location = useLocation();

  // Tentukan apakah sidebar perlu ditampilkan
  const showSidebar = location.pathname !== '/login';

  return (
    <div  className={`${showSidebar ? 'main-layout' : ''}`}>
      {showSidebar && <Sidebar />}
      <div className={`w-100 ${showSidebar ? 'p-4' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute/>}>

          </Route>

          <Route path="/" element={<Navigate to="document" replace />} /> 
          <Route path="/document" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>}/>
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>}/>

          <Route path="/document/upload" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>}/>
          <Route path="/document/update/:id" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>}/>
          <Route path="/document/detail/:id" element={<ProtectedRoute><ViewDocument /></ProtectedRoute>}/>

          <Route path="/category/create" element={<EditorCategory />} />
          <Route path="/category/detail/:id" element={<EditorCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
