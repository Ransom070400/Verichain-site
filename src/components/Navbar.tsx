import React from 'react';
import { Shield } from 'lucide-react';
import WalletConnect from './WalletConnect';

function Navbar({ onNavigate }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">VeriChain</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="text-gray-600 hover:text-blue-600"
            >
              How it Works
            </button>
            <button 
              onClick={() => onNavigate('platforms')}
              className="text-gray-600 hover:text-blue-600"
            >
              Supported Platforms
            </button>
            <button 
              onClick={() => onNavigate('docs')}
              className="text-gray-600 hover:text-blue-600"
            >
              Documentation
            </button>
            <WalletConnect />
          </div>

          <button className="md:hidden">
            <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;