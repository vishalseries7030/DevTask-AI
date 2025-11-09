import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Snippets from './pages/Snippets';
import Tools from './pages/Tools';
import Settings from './pages/Settings';
import FocusMode from './pages/FocusMode';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Focus Mode - Full Screen */}
          <Route path="/focus" element={<PrivateRoute><FocusMode /></PrivateRoute>} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
