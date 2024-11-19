import React from 'react';
import { Bell, MessageSquare, Search, Home, Wrench, Users, BookOpen } from 'lucide-react';
import UserMenu from './UserMenu';

const TopNav = ({ onNavigate, currentPage = 'home' }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tools', icon: Wrench, label: 'Tools' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'resources', icon: BookOpen, label: 'Resources' }
  ];

  return (
    <nav className="bg-neutral border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">MetNet</span>
            </div>
            {/* Main Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors
                    ${currentPage === id 
                      ? 'text-primary border-primary' 
                      : 'text-gray-300 border-transparent hover:text-primary hover:border-primary'}`}
                >
                  <Icon className="h-5 w-5 inline-block mr-1" />
                  {label}
                </button>
              ))}
            </div>
            {/* Search Bar */}
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:ml-6">
              <div className="max-w-lg w-full lg:max-w-xs">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-secondary placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Search equipment, people, articles..."
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-primary">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary">
              <MessageSquare className="h-6 w-6" />
            </button>
            <UserMenu />
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden pb-2 flex space-x-4 overflow-x-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors
                ${currentPage === id 
                  ? 'text-primary' 
                  : 'text-gray-300 hover:text-primary'}`}
            >
              <Icon className="h-5 w-5 inline-block mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;