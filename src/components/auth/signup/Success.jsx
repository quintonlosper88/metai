import React from 'react';
import { CheckCircle } from 'lucide-react';

const Success = ({ onClose }) => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-primary/20 p-3">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">
        Welcome to MetalHub!
      </h2>
      <p className="text-gray-400 mb-8">
        Your account has been successfully created
      </p>

      <button 
        onClick={onClose}
        className="btn btn-primary"
      >
        Get Started
      </button>
    </div>
  );
};

export default Success;