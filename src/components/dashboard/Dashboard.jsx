import React from 'react';
import { Bell, MessageSquare, Search, Calculator, PlusCircle, Brain, Edit3, ChevronRight, Home, Wrench, Users, BookOpen } from 'lucide-react';

const Dashboard = ({ onSignOut, onCalculator }) => {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navigation */}
      <nav className="bg-neutral border-b border-gray-800 fixed w-full top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">MetNet</span>
              </div>
              {/* Main Navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary border-b-2 border-transparent hover:border-primary">
                  <Home className="h-5 w-5 inline-block mr-1" />
                  Home
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary border-b-2 border-transparent hover:border-primary">
                  <Wrench className="h-5 w-5 inline-block mr-1" />
                  Tools
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary border-b-2 border-transparent hover:border-primary">
                  <Users className="h-5 w-5 inline-block mr-1" />
                  Community
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary border-b-2 border-transparent hover:border-primary">
                  <BookOpen className="h-5 w-5 inline-block mr-1" />
                  Resources
                </button>
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
              <div className="ml-3 relative">
                <div>
                  <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-primary">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="User"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="sm:hidden pb-2 flex space-x-4 overflow-x-auto">
            <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary whitespace-nowrap">
              <Home className="h-5 w-5 inline-block mr-1" />
              Home
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary whitespace-nowrap">
              <Wrench className="h-5 w-5 inline-block mr-1" />
              Tools
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary whitespace-nowrap">
              <Users className="h-5 w-5 inline-block mr-1" />
              Community
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary whitespace-nowrap">
              <BookOpen className="h-5 w-5 inline-block mr-1" />
              Resources
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:w-64 lg:pr-8">
              <div className="sticky top-20">
                <div className="bg-neutral rounded-lg border border-gray-800 p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="Profile"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-200">John Smith</h3>
                      <p className="text-xs text-gray-400">Senior Metallurgist</p>
                      <p className="text-xs text-gray-400">Mining Corp</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-primary">
                            Profile Completion
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-primary">
                            75%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
                        <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="space-y-1">
                  <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-neutral rounded-lg border border-gray-800 hover:border-primary hover:text-primary">
                    My Network
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-neutral rounded-lg border border-gray-800 hover:border-primary hover:text-primary">
                    My Projects
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-neutral rounded-lg border border-gray-800 hover:border-primary hover:text-primary">
                    Saved Items
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <button 
                  onClick={onCalculator}
                  className="flex items-center justify-center px-4 py-3 border border-gray-800 text-sm font-medium rounded-lg text-gray-200 bg-neutral hover:border-primary hover:text-primary"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  New Calculation
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-800 text-sm font-medium rounded-lg text-gray-200 bg-neutral hover:border-primary hover:text-primary">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Start Project
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-800 text-sm font-medium rounded-lg text-gray-200 bg-neutral hover:border-primary hover:text-primary">
                  <Brain className="mr-2 h-5 w-5" />
                  Ask AI
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-800 text-sm font-medium rounded-lg text-gray-200 bg-neutral hover:border-primary hover:text-primary">
                  <Edit3 className="mr-2 h-5 w-5" />
                  Create Post
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-neutral rounded-lg border border-gray-800 mb-6">
                <div className="px-4 py-5 border-b border-gray-800 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-200">
                    Recent Activity
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex space-x-3 border-b border-gray-800 pb-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${item}`}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-200">
                            Calculation completed: Crusher efficiency analysis
                          </p>
                          <p className="text-sm text-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="bg-neutral rounded-lg border border-gray-800">
                <div className="px-4 py-5 border-b border-gray-800 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-200">
                    Network Feed
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((post) => (
                      <div key={post} className="border-b border-gray-800 pb-4">
                        <div className="flex space-x-3">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Post${post}`}
                            alt=""
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-200">
                              Technical Discussion
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                              Latest findings on crusher liner wear patterns and their impact on performance...
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;