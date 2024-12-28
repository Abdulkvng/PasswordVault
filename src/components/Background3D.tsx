import React from 'react';

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-4s' }} />
      
      <div className="absolute top-1/4 left-1/3 w-48 h-48 border-8 border-indigo-200 rounded-full animate-spin-slow opacity-30" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 border-8 border-purple-200 rounded-full animate-spin-slow opacity-30" style={{ animationDirection: 'reverse' }} />
    </div>
  );
}