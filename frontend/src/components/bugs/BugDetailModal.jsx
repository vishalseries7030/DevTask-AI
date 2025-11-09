import React, { useState } from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { bugService } from '../../services/bugService';
import { snippetService } from '../../services/snippetService';
import toast from 'react-hot-toast';

const BugDetailModal = ({ bug, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(bug.aiSuggestion?.content || '');
  const [copied, setCopied] = useState(false);

  const handleGetAISuggestion = async () => {
    setLoading(true);
    try {
      const response = await aiService.suggestFix(bug.title, bug.description);
      console.log('AI Response:', response); // Debug log
      
      // Update bug with AI suggestion in database
      await bugService.updateBug(bug._id, {
        aiSuggestion: {
          content: response.suggestion,
          tokensUsed: response.tokensUsed,
          generatedAt: new Date(),
        },
      });
      
      // Set the suggestion in state AFTER the update succeeds
      setAiSuggestion(response.suggestion);
      console.log('AI Suggestion set:', response.suggestion); // Debug log
      
      toast.success(`AI suggestion generated! ${response.quotaRemaining} requests remaining today`);
    } catch (error) {
      console.error('AI Error:', error); // Debug log
      if (error.response?.data?.error?.code === 'AI_QUOTA_EXCEEDED') {
        toast.error('Daily AI quota exhausted. Resets at midnight UTC.');
      } else {
        toast.error(error.response?.data?.error?.message || 'Failed to get AI suggestion');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(aiSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard!');
  };

  const handleSaveAsSnippet = async () => {
    try {
      // Extract code blocks from AI suggestion
      const codeMatch = aiSuggestion.match(/```(\w+)?\n([\s\S]*?)```/);
      if (!codeMatch) {
        toast.error('No code block found in suggestion');
        return;
      }

      const language = codeMatch[1] || 'javascript';
      const code = codeMatch[2].trim();

      await snippetService.createSnippet({
        title: `Fix for: ${bug.title}`,
        code,
        language,
        tags: ['ai-generated', 'bug-fix'],
      });

      toast.success('Saved as snippet!');
    } catch (error) {
      toast.error('Failed to save snippet');
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{bug.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bug.status)}`}>
                  {bug.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Reported by {bug.reporter?.name} on {new Date(bug.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{bug.description}</p>
          </div>

          {bug.attachments && bug.attachments.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Attachments</h3>
              <div className="space-y-2">
                {bug.attachments.map((attachment, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    📎 {attachment.filename}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>AI-Powered Fix Suggestion</span>
              </h3>
              {!aiSuggestion && (
                <button
                  onClick={handleGetAISuggestion}
                  disabled={loading}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Generating...' : 'Get AI Suggestion'}</span>
                </button>
              )}
            </div>

            {aiSuggestion ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <div className="flex justify-end space-x-2 mb-4">
                  <button
                    onClick={handleCopyToClipboard}
                    className="btn btn-secondary text-sm flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleSaveAsSnippet}
                    className="btn btn-primary text-sm"
                  >
                    Save as Snippet
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">{aiSuggestion}</pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Click "Get AI Suggestion" to generate a fix using Gemini AI</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugDetailModal;
