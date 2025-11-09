import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Plus, FolderKanban, Users, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateProjectModal from '../components/projects/CreateProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data.projects || []);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      await projectService.createProject(projectData.name, projectData.description);
      toast.success('Project created successfully!');
      setShowCreateModal(false);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to create project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Projects
        </h1>
        <p className="text-gray-600 text-lg">Manage your projects and collaborate with your team</p>
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        title="Create New Project"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Desktop Create Button */}
      <div className="hidden md:flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Create New Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16 px-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderKanban className="w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No projects yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by creating your first project to organize tasks, track bugs, and collaborate with your team
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description || 'No description provided'}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 p-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{project.members?.length || 0} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-50 p-1.5 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
};

export default Projects;
