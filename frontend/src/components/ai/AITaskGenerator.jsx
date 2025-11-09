import React, { useState } from 'react';
import { Sparkles, Wand2, CheckCircle2, Loader2, Plus } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AITaskGenerator = ({ projectId, onTasksGenerated }) => {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const generateTasks = async () => {
    if (!goal.trim()) {
      toast.error('Please enter a goal or description');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/ai/generate-tasks', {
        goal: goal,
        projectId: projectId,
      });

      setGeneratedTasks(response.data.tasks || []);
      setShowResults(true);
      toast.success('Tasks generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to generate tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTasksToProject = async () => {
    try {
      // Add all generated tasks to the project
      for (const task of generatedTasks) {
        await api.post(`/projects/${projectId}/tasks`, {
          title: task.title,
          description: task.description,
          priority: task.priority || 'medium',
          status: 'todo',
        });
      }
      
      toast.success(`${generatedTasks.length} tasks added to project!`);
      setShowResults(false);
      setGoal('');
      setGeneratedTasks([]);
      
      if (onTasksGenerated) {
        onTasksGenerated();
      }
    } catch (error) {
      toast.error('Failed to add tasks to project');
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">AI Task Generator</h3>
            <p className="text-purple-100 text-sm">Describe your goal, get structured tasks instantly</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Example: Build a login system with Node.js and JWT authentication, including password hashing and email verification"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:border-white/40 resize-none"
            rows={4}
          />

          <button
            onClick={generateTasks}
            disabled={loading || !goal.trim()}
            className="w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Tasks...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Tasks with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && generatedTasks.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Generated Tasks</h3>
              <p className="text-sm text-gray-600">{generatedTasks.length} tasks ready to add</p>
            </div>
            <button
              onClick={addTasksToProject}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add All to Project
            </button>
          </div>

          <div className="space-y-3">
            {generatedTasks.map((task, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg mt-1">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    {task.priority && (
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority.toUpperCase()} PRIORITY
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Example Goals:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• "Build a REST API for user authentication with JWT"</li>
          <li>• "Create a React dashboard with charts and analytics"</li>
          <li>• "Implement a real-time chat system with Socket.io"</li>
          <li>• "Set up CI/CD pipeline with GitHub Actions"</li>
        </ul>
      </div>
    </div>
  );
};

export default AITaskGenerator;
