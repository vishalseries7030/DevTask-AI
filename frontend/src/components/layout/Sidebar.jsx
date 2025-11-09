import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Code2, Wrench, Sparkles, TrendingUp, Settings } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { 
      to: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50'
    },
    { 
      to: '/projects', 
      icon: FolderKanban, 
      label: 'Projects',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      hoverBg: 'hover:bg-indigo-50'
    },
    { 
      to: '/snippets', 
      icon: Code2, 
      label: 'Snippets',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverBg: 'hover:bg-green-50'
    },
    { 
      to: '/tools', 
      icon: Wrench, 
      label: 'Tools',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-50'
    },
    { 
      to: '/settings', 
      icon: Settings, 
      label: 'Settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      hoverBg: 'hover:bg-gray-50'
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-20 h-full bg-white/95 backdrop-blur-md border-r border-gray-200 transition-all duration-300 shadow-lg z-40 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <nav className="p-4 space-y-2">
        {/* AI Badge */}
        <div className="mb-6 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold">AI-Powered</span>
          </div>
          <p className="text-xs opacity-90">Get smart suggestions</p>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? `${item.bgColor} ${item.color} font-semibold shadow-sm`
                  : `text-gray-700 ${item.hoverBg} hover:shadow-sm`
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-500 group-hover:' + item.color}`} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Stats Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="px-4 py-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-gray-700">Quick Stats</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>This Week</span>
                <span className="font-semibold text-gray-900">+12%</span>
              </div>
              <div className="flex justify-between">
                <span>Productivity</span>
                <span className="font-semibold text-green-600">High</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
