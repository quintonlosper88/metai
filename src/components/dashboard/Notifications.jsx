import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      icon: AlertTriangle,
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-500',
      title: 'High Power Consumption',
      message: 'Mill #2 requires attention'
    },
    {
      icon: Clock,
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-500',
      title: 'Maintenance Due',
      message: 'Scheduled for Crusher #1'
    }
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`${notification.iconBg} p-2 rounded-lg`}>
              <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
            </div>
            <div>
              <h3 className="text-white font-medium">{notification.title}</h3>
              <p className="text-gray-400 text-sm">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;