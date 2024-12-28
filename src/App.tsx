import React, { useEffect, useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Profile } from './components/Profile';
import { ResetPassword } from './components/ResetPassword';
import { Background3D } from './components/Background3D';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';
import { User } from '@supabase/supabase-js';
import { Shield, Key, Lock } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    setIsResetPassword(hash.includes('type=recovery'));

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <Background3D />
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {!user && !isResetPassword && (
          <div className="max-w-4xl mx-auto mb-12 text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                <Shield className="w-16 h-16 text-white animate-pulse-slow" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
              Password Vault & Generator
            </h1>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center space-x-2 text-indigo-600">
                <Lock className="w-5 h-5" />
                <span>Secure Storage</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Key className="w-5 h-5" />
                <span>Strong Generation</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto glass-effect p-6 rounded-xl">
              Your secure destination for password management. Generate strong, unique passwords 
              and keep them safe. Features include password strength analysis, customizable 
              generation options, and secure storage.
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center min-h-[600px]">
          {isResetPassword ? (
            <div className="animate-slide-up hover-card">
              <ResetPassword />
            </div>
          ) : user ? (
            <div className="animate-fade-in hover-card">
              <Profile user={user} onSignOut={handleSignOut} />
            </div>
          ) : (
            <div className="animate-slide-up hover-card">
              <AuthForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;