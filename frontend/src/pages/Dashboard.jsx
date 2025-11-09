import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  FolderKanban, 
  Bug, 
  Code2, 
  Sparkles, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Zap,
  Activity,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    bugs: 0,
    snippets: 0,
    aiQuotaRemaining: 3,
    aiQuotaUsed: 0,
    aiQuotaTotal: 100,
  });
  const [loading, setLoading] = useState(true);

  // Mock data for charts (in real app, fetch from API)
  const activityData = [
    { name: 'Mon', tasks: 4, bugs: 2, ai: 1 },
    { name: 'Tue', tasks: 6, bugs: 3, ai: 2 },
    { name: 'Wed', tasks: 8, bugs: 1, ai: 3 },
    { name: 'Thu', tasks: 5, bugs: 4, ai: 2 },
    { name: 'Fri', tasks: 7, bugs: 2, ai: 1 },
    { name: 'Sat', tasks: 3, bugs: 1, ai: 0 },
    { name: 'Sun', tasks: 2, bugs: 0, ai: 0 },
  ];

  const productivityData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, snippetsRes, userRes] = await Promise.all([
        api.get('/projects'),
        api.get('/snippets'),
        api.get('/auth/me'),
      ]);

      const aiUsed = userRes.data.user.aiQuota.used || 0;
      const aiTotal = userRes.data.user.aiQuota.daily || 100;
      
      setStats({
        projects: projectsRes.data.count || 0,
        tasks: 0, // Will be calculated from projects
        bugs: 0, // Will be calculated from projects
        snippets: snippetsRes.data.count || 0,
        aiQuotaRemaining: aiTotal - aiUsed,
        aiQuotaUsed: aiUsed,
        aiQuotaTotal: aiTotal,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/projects',
      change: '+12%',
    },
    {
      title: 'Code Snippets',
      value: stats.snippets,
      icon: Code2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/snippets',
      change: '+8%',
    },
    {
      title: 'AI Requests',
      value: `${stats.aiQuotaRemaining}/100`,
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: null,
      change: 'Available',
    },
    {
      title: 'Active Tasks',
      value: stats.tasks,
      icon: CheckCircle2,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/projects',
      change: '+5%',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 text-lg">Here's your productivity overview for today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            {stat.link && (
              <Link
                to={stat.link}
                className={`flex items-center gap-1 text-sm ${stat.textColor} hover:underline mt-3`}
              >
                View details
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/projects"
              className="group p-5 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <FolderKanban className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">New Project</h3>
              </div>
              <p className="text-sm text-gray-600">
                Create a project to organize tasks and track bugs
              </p>
            </Link>

            <Link
              to="/snippets"
              className="group p-5 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Code2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Save Snippet</h3>
              </div>
              <p className="text-sm text-gray-600">
                Store reusable code snippets for quick access
              </p>
            </Link>

            <Link
              to="/tools"
              className="group p-5 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Developer Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                JSON formatter, regex tester, and API testing
              </p>
            </Link>

            <Link
              to="/projects"
              className="group p-5 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                  <Bug className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Report Bug</h3>
              </div>
              <p className="text-sm text-gray-600">
                Track bugs and get AI-powered fix suggestions
              </p>
            </Link>

            <Link
              to="/focus"
              className="group p-5 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Focus Mode</h3>
              </div>
              <p className="text-sm text-gray-600">
                Pomodoro timer for distraction-free productivity
              </p>
            </Link>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">AI Assistant</h2>
          </div>
          
          <p className="text-purple-100 mb-6 text-sm leading-relaxed">
            Get intelligent bug fix suggestions powered by Google Gemini AI. Fast, accurate, and always available.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-100">Daily Quota</span>
              <span className="text-sm font-semibold">{stats.aiQuotaRemaining}/100</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${(stats.aiQuotaRemaining / 100) * 100}%` }}
              ></div>
            </div>
          </div>

          <Link
            to="/projects"
            className="block w-full bg-white text-purple-600 text-center py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Try AI Assistant
          </Link>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Weekly Activity</h2>
              <p className="text-sm text-gray-600">Your productivity this week</p>
            </div>
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="tasks" stroke="#6366F1" fillOpacity={1} fill="url(#colorTasks)" />
              <Area type="monotone" dataKey="bugs" stroke="#EF4444" fillOpacity={1} fill="url(#colorBugs)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-sm text-gray-600">Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-sm text-gray-600">Bugs</span>
            </div>
          </div>
        </div>

        {/* Productivity Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Task Distribution</h2>
              <p className="text-sm text-gray-600">Current status breakdown</p>
            </div>
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productivityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {productivityData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <p className="text-xs text-gray-600">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Usage Analytics */}
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">AI Usage Analytics</h2>
            <p className="text-purple-100">Track your AI assistant usage</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-purple-100 text-sm mb-1">Used Today</p>
            <p className="text-3xl font-bold">{stats.aiQuotaUsed}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-purple-100 text-sm mb-1">Remaining</p>
            <p className="text-3xl font-bold">{stats.aiQuotaRemaining}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-purple-100 text-sm mb-1">Daily Limit</p>
            <p className="text-3xl font-bold">{stats.aiQuotaTotal}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Usage Progress</span>
            <span className="text-sm font-semibold">{Math.round((stats.aiQuotaUsed / stats.aiQuotaTotal) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500 relative overflow-hidden"
              style={{ width: `${(stats.aiQuotaUsed / stats.aiQuotaTotal) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
            </div>
          </div>
          {stats.aiQuotaRemaining <= 10 && stats.aiQuotaRemaining > 0 && (
            <div className="mt-3 flex items-center gap-2 text-yellow-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Only {stats.aiQuotaRemaining} requests remaining today!</span>
            </div>
          )}
          {stats.aiQuotaRemaining === 0 && (
            <div className="mt-3 flex items-center gap-2 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Daily quota exhausted. Resets at midnight UTC.</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FolderKanban className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Welcome to DevTask AI!</p>
              <p className="text-xs text-gray-600">Start by creating your first project</p>
            </div>
            <span className="text-xs text-gray-500">Just now</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Achievement Unlocked!</p>
              <p className="text-xs text-gray-600">You've joined DevTask AI community</p>
            </div>
            <span className="text-xs text-gray-500">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
