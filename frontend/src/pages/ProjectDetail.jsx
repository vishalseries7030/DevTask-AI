import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { bugService } from '../services/bugService';
import { ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import KanbanBoard from '../components/tasks/KanbanBoard';
import BugList from '../components/bugs/BugList';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import CreateBugModal from '../components/bugs/CreateBugModal';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const [projectData, tasksData, bugsData] = await Promise.all([
        projectService.getProjectById(id),
        taskService.getTasks(id),
        bugService.getBugs(id),
      ]);

      setProject(projectData.project);
      setTasks(tasksData.tasks || []);
      setBugs(bugsData.bugs || []);
    } catch (error) {
      toast.error('Failed to fetch project data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(id, taskData);
      toast.success('Task created successfully!');
      setShowTaskModal(false);
      fetchProjectData();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      await bugService.createBug(id, bugData);
      toast.success('Bug reported successfully!');
      setShowBugModal(false);
      fetchProjectData();
    } catch (error) {
      toast.error('Failed to create bug');
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      await taskService.updateTask(taskId, updates);
      fetchProjectData();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
        <Link to="/projects" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description || 'No description'}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tasks'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('bugs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bugs'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Bugs ({bugs.length})
          </button>
        </nav>
      </div>

      {activeTab === 'tasks' && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowTaskModal(true)} className="btn btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </button>
          </div>
          <KanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        </div>
      )}

      {activeTab === 'bugs' && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowBugModal(true)} className="btn btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Report Bug</span>
            </button>
          </div>
          <BugList bugs={bugs} projectId={id} onRefresh={fetchProjectData} />
        </div>
      )}

      {showTaskModal && (
        <CreateTaskModal onClose={() => setShowTaskModal(false)} onCreate={handleCreateTask} />
      )}

      {showBugModal && (
        <CreateBugModal onClose={() => setShowBugModal(false)} onCreate={handleCreateBug} />
      )}
    </div>
  );
};

export default ProjectDetail;
