import React, { useState } from 'react';
import { Bug, Sparkles } from 'lucide-react';
import BugDetailModal from './BugDetailModal';

const BugList = ({ bugs, projectId, onRefresh }) => {
  const [selectedBug, setSelectedBug] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'inprogress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (bugs.length === 0) {
    return (
      <div className="card text-center py-12">
        <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs reported</h3>
        <p className="text-gray-600">Great! Your project is bug-free 🎉</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bugs.map((bug) => (
          <div
            key={bug._id}
            onClick={() => setSelectedBug(bug)}
            className="card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-bold text-gray-900">{bug.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bug.status)}`}>
                    {bug.status}
                  </span>
                  {bug.aiSuggestion && (
                    <span className="flex items-center space-x-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Suggested</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{bug.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Reported by {bug.reporter?.name}</span>
                  <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                  {bug.attachments?.length > 0 && (
                    <span>{bug.attachments.length} attachment(s)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBug && (
        <BugDetailModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default BugList;
