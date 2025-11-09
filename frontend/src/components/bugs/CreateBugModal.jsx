import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateBugModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onCreate({
      title,
      description,
      attachments: [],
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Report Bug</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bug Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Login button not working"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              rows={5}
              placeholder="Describe the bug, steps to reproduce, expected vs actual behavior, error messages..."
              required
              maxLength={5000}
            />
            <p className="text-xs text-gray-500 mt-1">
              Include error messages and logs for better AI suggestions
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn btn-primary">
              {loading ? 'Reporting...' : 'Report Bug'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBugModal;
