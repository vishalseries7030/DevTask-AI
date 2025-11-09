import { useState } from 'react';
import axios from 'axios';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('json');
  const [uuid, setUuid] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366F1');
  const [timestamp, setTimestamp] = useState(Date.now());
  const [hashInput, setHashInput] = useState('');
  const [hashOutput, setHashOutput] = useState({ md5: '', sha256: '' });

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuid(uuid);
    navigator.clipboard.writeText(uuid);
    toast.success('UUID generated and copied!');
  };

  const encodeBase64 = () => {
    try {
      const encoded = btoa(base64Input);
      setBase64Output(encoded);
    } catch (error) {
      toast.error('Failed to encode');
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(base64Input);
      setBase64Output(decoded);
    } catch (error) {
      toast.error('Invalid Base64 string');
    }
  };

  const generateHash = async () => {
    if (!hashInput) return;
    
    // Simple hash simulation (in production, use crypto library)
    const simpleHash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(32, '0');
    };

    setHashOutput({
      md5: simpleHash(hashInput + 'md5'),
      sha256: simpleHash(hashInput + 'sha256'),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Developer Tools</h1>
        <p className="mt-2 text-gray-600">
          Handy utilities for everyday development tasks
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="-mb-px flex space-x-4">
          {['json', 'regex', 'api', 'uuid', 'base64', 'color', 'timestamp', 'hash'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm capitalize`}
            >
              {tab === 'json' ? 'JSON' : 
               tab === 'regex' ? 'Regex' : 
               tab === 'api' ? 'API' :
               tab === 'uuid' ? 'UUID' :
               tab === 'base64' ? 'Base64' :
               tab === 'color' ? 'Color' :
               tab === 'timestamp' ? 'Timestamp' :
               'Hash'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'json' && <JsonFormatter />}
      {activeTab === 'regex' && <RegexTester />}
      {activeTab === 'api' && <ApiTester />}
      {activeTab === 'uuid' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">UUID Generator</h2>
          <div className="space-y-4">
            <button
              onClick={generateUUID}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Generate UUID
            </button>
            {uuid && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <code className="text-lg font-mono text-indigo-600">{uuid}</code>
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'base64' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Base64 Encoder/Decoder</h2>
          <div className="space-y-4">
            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Enter text to encode/decode..."
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={encodeBase64}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Encode
              </button>
              <button
                onClick={decodeBase64}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                Decode
              </button>
            </div>
            {base64Output && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <code className="text-sm font-mono text-gray-900 break-all">{base64Output}</code>
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'color' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Color Picker</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-32 h-32 rounded-xl cursor-pointer border-4 border-gray-200"
              />
              <div className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 w-20">HEX:</span>
                    <code className="flex-1 px-4 py-2 bg-gray-50 rounded-lg font-mono text-gray-900">{selectedColor}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 w-20">RGB:</span>
                    <code className="flex-1 px-4 py-2 bg-gray-50 rounded-lg font-mono text-gray-900">
                      {parseInt(selectedColor.slice(1, 3), 16)}, {parseInt(selectedColor.slice(3, 5), 16)}, {parseInt(selectedColor.slice(5, 7), 16)}
                    </code>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full h-32 rounded-xl"
              style={{ backgroundColor: selectedColor }}
            ></div>
          </div>
        </div>
      )}
      {activeTab === 'timestamp' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Timestamp Converter</h2>
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-sm text-gray-600 mb-2">Current Timestamp</div>
              <div className="text-3xl font-bold text-indigo-600 mb-4">{timestamp}</div>
              <button
                onClick={() => setTimestamp(Date.now())}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
              >
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-semibold text-gray-700 mb-2">Date & Time</div>
                <div className="text-gray-900">{new Date(timestamp).toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-semibold text-gray-700 mb-2">ISO Format</div>
                <div className="text-gray-900 text-sm">{new Date(timestamp).toISOString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'hash' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hash Generator</h2>
          <div className="space-y-4">
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
            />
            <button
              onClick={generateHash}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Generate Hashes
            </button>
            {hashOutput.md5 && (
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">MD5 (Simulated)</div>
                  <code className="text-sm font-mono text-gray-900 break-all">{hashOutput.md5}</code>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">SHA-256 (Simulated)</div>
                  <code className="text-sm font-mono text-gray-900 break-all">{hashOutput.sha256}</code>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// JSON Formatter Component
const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    setError('');
    setOutput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/v1/tools/json-format', {
        json: input,
      });

      setOutput(response.data.formatted);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to format JSON');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"John","age":30}'
          className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
        <button
          onClick={handleFormat}
          disabled={loading || !input}
          className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Formatting...' : 'Format JSON'}
        </button>
      </div>

      {/* Output */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Formatted Output
          </label>
          {output && (
            <button
              onClick={handleCopy}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Copy
            </button>
          )}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Formatted JSON will appear here..."
          className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
        />
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Regex Tester Component
const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/v1/tools/regex-test', {
        pattern,
        flags,
        testString,
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to test regex');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Regex Pattern
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\\d{3}-\\d{3}-\\d{4}"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-center"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Flags: g (global), i (case-insensitive), m (multiline)
        </p>
      </div>

      {/* Test String */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against the pattern..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
      </div>

      <button
        onClick={handleTest}
        disabled={loading || !pattern || !testString}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Testing...' : 'Test Pattern'}
      </button>

      {/* Results */}
      {result && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Results</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.isMatch
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {result.isMatch ? 'Match Found' : 'No Match'}
            </span>
          </div>

          {result.allMatches && result.allMatches.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Found {result.matchCount} match(es)
              </p>
              <div className="space-y-2">
                {result.allMatches.map((match, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <code className="text-sm font-mono text-indigo-600">
                        {match.match}
                      </code>
                      <span className="text-xs text-gray-500">
                        Index: {match.index}
                      </span>
                    </div>
                    {match.groups && match.groups.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        Groups: {match.groups.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

// API Tester Component
const ApiTester = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setError('');
    setResponse(null);
    setLoading(true);

    try {
      let parsedHeaders = {};
      if (headers.trim()) {
        parsedHeaders = JSON.parse(headers);
      }

      let parsedBody = null;
      if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
        parsedBody = JSON.parse(body);
      }

      const res = await axios.post('/api/v1/tools/api-test', {
        method,
        url,
        headers: parsedHeaders,
        body: parsedBody,
      });

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to test API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Method and URL */}
      <div className="flex gap-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Headers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Headers (JSON)
        </label>
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder='{"Content-Type": "application/json"}'
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
      </div>

      {/* Body */}
      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body (JSON)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          />
        </div>
      )}

      <button
        onClick={handleTest}
        disabled={loading || !url}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending Request...' : 'Send Request'}
      </button>

      {/* Response */}
      {response && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Response</h3>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  response.status >= 200 && response.status < 300
                    ? 'bg-green-100 text-green-800'
                    : response.status >= 400
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {response.status} {response.statusText}
              </span>
              <span className="text-sm text-gray-500">{response.time}ms</span>
            </div>
          </div>

          {/* Response Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Body
            </label>
            <pre className="bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto text-sm font-mono">
              {JSON.stringify(response.body, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Tools;
