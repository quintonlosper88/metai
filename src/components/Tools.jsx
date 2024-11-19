import React from 'react';
import { BarChart2, Settings, ArrowRight } from 'lucide-react';

const Tools = () => {
  return (
    <section id="tools" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Powerful Metallurgical Tools
            </h2>
            <p className="text-gray-400 mb-8">
              Access a comprehensive suite of tools for process optimization,
              equipment selection, and performance analysis.
            </p>
            
            <div className="space-y-4">
              {['Crushing & Screening', 'Milling & Classification', 'Flotation', 'Leaching'].map((tool, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-primary gap-2 mt-8">
              Explore Tools <ArrowRight size={20} />
            </button>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Crusher Performance Calculator
              </h3>
              <BarChart2 className="w-6 h-6 text-primary" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Feed Rate (t/h)
                </label>
                <input
                  type="number"
                  className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CSS (mm)
                </label>
                <input
                  type="number"
                  className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="btn btn-primary w-full">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;