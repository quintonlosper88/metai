import React from 'react';
import { Calculator, CheckCircle2, Clock } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      icon: Calculator,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      title: 'Crusher Efficiency Calculation',
      time: 'Updated 2 hours ago'
    },
    {
      icon: CheckCircle2,
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-500',
      title: 'Mill Performance Report',
      time: 'Completed yesterday'
    },
    {
      icon: Clock,
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-500',
      title: 'Maintenance Schedule',
      time: 'Due in 3 days'
    }
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`${activity.iconBg} p-2 rounded-lg`}>
              <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
            </div>
            <div>
              <h3 className="text-white font-medium">{activity.title}</h3>
              <p className="text-gray-400 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;