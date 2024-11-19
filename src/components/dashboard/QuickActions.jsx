import React from 'react';

const QuickActions = () => {
  const actions = [
    'New Calculation',
    'Create Report',
    'View Tools',
    'Team Chat'
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="btn btn-outline border-gray-700 hover:bg-primary hover:border-primary"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;