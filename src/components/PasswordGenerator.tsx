import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { generatePassword, checkPasswordStrength } from '../lib/passwordUtils';
import toast from 'react-hot-toast';

export function PasswordGenerator() {
  const [password, setPassword] = useState(() => generatePassword());
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const strength = checkPasswordStrength(password);

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!');
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Generator</h2>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 p-2 border rounded-md font-mono bg-gray-50"
          />
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 hover:text-gray-900"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={handleGenerate}
            className="p-2 text-gray-600 hover:text-gray-900"
            title="Generate new password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              strength.score < 2 ? 'bg-red-500' :
              strength.score < 3 ? 'bg-orange-500' :
              strength.score < 4 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{strength.feedback}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length: {length}
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  [key]: e.target.checked
                }))}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}