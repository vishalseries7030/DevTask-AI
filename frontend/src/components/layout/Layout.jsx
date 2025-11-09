import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex pt-20">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} min-h-screen`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
