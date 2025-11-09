import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateSnippetModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'go',
    'rust',
    'cpp',
    'csharp',
    'ruby',
    'php',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    await onCreate({
      title,
      code,
      language,
      tags: tagsArray,
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Create New Snippet</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="React useState Hook"
              required
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input">
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input font-mono text-sm"
              rows={12}
              placeholder="const [count, setCount] = useState(0);"
              required
              maxLength={10000}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input"
              placeholder="react, hooks, state"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum 10 tags, each max 20 characters</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn btn-primary">
              {loading ? 'Creating...' : 'Create Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippetModal;
