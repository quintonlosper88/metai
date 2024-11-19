import React from 'react';
import { Users, Calculator, Brain, Database } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Connect with metallurgists worldwide and share knowledge'
  },
  {
    icon: Calculator,
    title: 'Process Tools',
    description: 'Advanced calculators for crushing, milling, and flotation'
  },
  {
    icon: Brain,
    title: 'AI Insights',
    description: 'Get intelligent recommendations based on historical data'
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Store and analyze your process data securely'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-gray-400">
            Powerful tools and features designed for metallurgists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;