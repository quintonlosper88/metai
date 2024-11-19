import React, { useState } from 'react';
import { LogOut, User, Settings } from 'lucide-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-primary"
        >
          <img
            className="h-8 w-8 rounded-full"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="User"
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
          <div className="py-1 bg-neutral border border-gray-800 rounded-md">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>
            <div className="border-t border-gray-800">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;