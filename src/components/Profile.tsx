import React from 'react';
import { User } from '@supabase/supabase-js';
import { Mail, User as UserIcon } from 'lucide-react';
import { PasswordGenerator } from './PasswordGenerator';

interface ProfileProps {
  user: User;
  onSignOut: () => void;
}

export function Profile({ user, onSignOut }: ProfileProps) {
  return (
    <div className="w-full max-w-4xl p-8 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-indigo-100 rounded-full">
            <UserIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Your Profile</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">{user.email}</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">ID: {user.id}</span>
            </div>
          </div>
          
          <button
            onClick={onSignOut}
            className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>

      <PasswordGenerator />
    </div>
  );
}