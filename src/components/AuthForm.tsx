import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkAccountLockout, updateLoginAttempts } from '../lib/auth';
import toast from 'react-hot-toast';

type AuthMode = 'login' | 'register' | 'reset';

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'login') {
        // Check for account lockout
        const isLocked = await checkAccountLockout(email);
        if (isLocked) {
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          await updateLoginAttempts(email, false);
          throw error;
        }
        
        await updateLoginAttempts(email, true);
        toast.success('Logged in successfully!');
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Registration successful!');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) throw error;
        toast.success('Password reset instructions sent to your email.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <div className="p-3 bg-indigo-100 rounded-full">
          <Lock className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
        {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
        </div>

        {mode !== 'reset' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'}
        </button>
      </form>

      <div className="mt-6">
        {mode === 'login' ? (
          <div className="space-y-2 text-sm text-center">
            <button
              onClick={() => setMode('register')}
              disabled={loading}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create new account
            </button>
            <span className="block">or</span>
            <button
              onClick={() => setMode('reset')}
              disabled={loading}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMode('login')}
            disabled={loading}
            className="block w-full text-sm font-medium text-center text-indigo-600 hover:text-indigo-500"
          >
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
}