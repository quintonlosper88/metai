import React from 'react';
import { Calculator, Users, BookOpen, BarChart2 } from 'lucide-react';

const ProjectStats = () => {
  const stats = [
    {
      icon: Calculator,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      value: '24',
      label: 'Calculations'
    },
    {
      icon: Users,
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-500',
      value: '12',
      label: 'Team Members'
    },
    {
      icon: BookOpen,
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-500',
      value: '8',
      label: 'Reports'
    },
    {
      icon: BarChart2,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-500',
      value: '85%',
      label: 'Efficiency'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className={`${stat.iconBg} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;