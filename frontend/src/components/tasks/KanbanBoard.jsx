import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const KanbanBoard = ({ tasks, onTaskUpdate }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = {
    todo: { title: 'To Do', color: 'bg-gray-100' },
    inprogress: { title: 'In Progress', color: 'bg-blue-100' },
    done: { title: 'Done', color: 'bg-green-100' },
  };

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    inprogress: tasks.filter((t) => t.status === 'inprogress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      onTaskUpdate(draggedTask._id, { status: newStatus });
    }
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(columns).map(([status, { title, color }]) => (
        <div key={status} className="flex flex-col">
          <div className={`${color} rounded-t-lg px-4 py-3`}>
            <h3 className="font-bold text-gray-900">
              {title} ({tasksByStatus[status].length})
            </h3>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className={`flex-1 p-4 rounded-b-lg border-2 border-t-0 min-h-[400px] transition-colors ${
              draggedTask && draggedTask.status !== status
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="space-y-3">
              {tasksByStatus[status].map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow ${
                    draggedTask?._id === task._id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 flex-1">{task.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {task.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {task.assignee && (
                      <span className="text-primary-600">{task.assignee.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {tasksByStatus[status].length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm">No tasks</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
