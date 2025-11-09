import React, { useState, useEffect } from 'react';
import { snippetService } from '../services/snippetService';
import { Plus, Code2, Copy, Trash2, Check, Download, FileJson } from 'lucide-react';
import toast from 'react-hot-toast';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import CreateSnippetModal from '../components/snippets/CreateSnippetModal';

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, [filterLanguage]);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippets]);

  const fetchSnippets = async () => {
    try {
      const data = await snippetService.getSnippets(filterLanguage || null);
      setSnippets(data.snippets || []);
    } catch (error) {
      toast.error('Failed to fetch snippets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async (snippetData) => {
    try {
      await snippetService.createSnippet(snippetData);
      toast.success('Snippet created successfully!');
      setShowCreateModal(false);
      fetchSnippets();
    } catch (error) {
      toast.error('Failed to create snippet');
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;

    try {
      await snippetService.deleteSnippet(id);
      toast.success('Snippet deleted');
      fetchSnippets();
    } catch (error) {
      toast.error('Failed to delete snippet');
    }
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Copied to clipboard!');
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(snippets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `snippets-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Snippets exported as JSON!');
  };

  const exportAsZIP = async () => {
    // Simple text file export (in production, use JSZip library)
    const content = snippets.map(s => 
      `// ${s.title}\n// Language: ${s.language}\n// Tags: ${s.tags.join(', ')}\n\n${s.code}\n\n${'='.repeat(80)}\n\n`
    ).join('');
    
    const dataBlob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `snippets-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Snippets exported!');
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
          <p className="text-gray-600 mt-1">Save and organize reusable code</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportAsJSON}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
            title="Export as JSON"
          >
            <FileJson className="w-5 h-5" />
            <span className="hidden md:inline">JSON</span>
          </button>
          <button
            onClick={exportAsZIP}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            title="Export as File"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">Export</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Snippet</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter by language:</label>
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="input w-48"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {snippets.length === 0 ? (
        <div className="card text-center py-12">
          <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No snippets yet</h3>
          <p className="text-gray-600 mb-6">Start building your code library</p>
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            Create Snippet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {snippets.map((snippet) => (
            <div key={snippet._id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{snippet.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                      {snippet.language}
                    </span>
                    {snippet.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopyCode(snippet.code, snippet._id)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Copy code"
                  >
                    {copiedId === snippet._id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteSnippet(snippet._id)}
                    className="p-2 hover:bg-red-100 rounded"
                    title="Delete snippet"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className={`language-${snippet.language}`}>{snippet.code}</code>
                </pre>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Created {new Date(snippet.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateSnippetModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateSnippet}
        />
      )}
    </div>
  );
};

export default Snippets;
