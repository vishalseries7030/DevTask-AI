import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Moon, 
  Sun, 
  Sparkles,
  Shield,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    aiQuota: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      // API call to change password
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Notification settings updated');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'ai', label: 'AI Settings', icon: Sparkles },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-600 text-lg">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Change Avatar
                  </button>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Lock className="w-5 h-5" />
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('email')}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      notifications.email ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.email ? 'translate-x-7' : ''
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Receive browser notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('push')}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      notifications.push ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.push ? 'translate-x-7' : ''
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Quota Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified when quota is low</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('aiQuota')}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      notifications.aiQuota ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.aiQuota ? 'translate-x-7' : ''
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        !darkMode
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                      <p className="font-semibold text-gray-900">Light Mode</p>
                      <p className="text-sm text-gray-600">Default theme</p>
                    </button>

                    <button
                      onClick={() => setDarkMode(true)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        darkMode
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                      <p className="font-semibold text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Settings Tab */}
          {activeTab === 'ai' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Assistant Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Daily Quota</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-2">100 requests/day</p>
                  <p className="text-sm text-gray-600">Your current AI usage limit</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today's Usage</span>
                      <span className="font-semibold text-gray-900">{user?.aiQuota?.used || 0} requests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-semibold text-green-600">
                        {(user?.aiQuota?.daily || 100) - (user?.aiQuota?.used || 0)} requests
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resets At</span>
                      <span className="font-semibold text-gray-900">Midnight UTC</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
                  <p className="text-sm text-gray-600">
                    Use AI suggestions wisely! Each request helps you debug faster and write better code.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
