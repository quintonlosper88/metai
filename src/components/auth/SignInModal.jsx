import React, { useState } from 'react';
import { X, Mail, Linkedin } from 'lucide-react';
import SignupFlow from './SignupFlow';

const SignInModal = ({ isOpen, onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  if (!isOpen) return null;
  
  if (showSignup) {
    return <SignupFlow onClose={onClose} />;
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    // In a real app, we would validate credentials here
    onSignInSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-neutral w-full max-w-md rounded-xl p-6 shadow-xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          Welcome Back
        </h2>

        <div className="space-y-3 mb-6">
          <button className="btn btn-outline gap-2 w-full border-gray-600 hover:bg-primary hover:border-primary">
            <Linkedin size={20} />
            Continue with LinkedIn
          </button>
          <button className="btn btn-outline gap-2 w-full border-gray-600 hover:bg-primary hover:border-primary">
            <Mail size={20} />
            Continue with Email
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral text-gray-400">or</span>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="btn btn-primary w-full"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className="text-primary hover:text-primary/80"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;