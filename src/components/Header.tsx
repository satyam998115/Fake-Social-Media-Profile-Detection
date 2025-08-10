import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">FakeGuard</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#statistics" className="text-slate-300 hover:text-white transition-colors">Statistics</a>
          <a href="#education" className="text-slate-300 hover:text-white transition-colors">Learn</a>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors">
           Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;