import React from 'react';

const ReagentTimeline = ({ reagents }) => {
  const getAllReagents = () => {
    return Object.entries(reagents)
      .flatMap(([type, list]) => 
        list.map(reagent => ({
          ...reagent,
          type,
          timeNum: parseInt(reagent.time)
        }))
      )
      .filter(reagent => reagent.time)
      .sort((a, b) => a.timeNum - b.timeNum);
  };

  const sortedReagents = getAllReagents();
  const totalTime = Math.max(...sortedReagents.map(r => r.timeNum), 0);

  return (
    <div className="glass-card p-6">
      <h3 className="text-md font-semibold text-white mb-4">Addition Timeline</h3>
      <div className="relative py-4">
        <div className="absolute left-0 right-0 h-1 bg-gray-700 top-1/2 transform -translate-y-1/2"></div>
        <div className="relative flex justify-between">
          {sortedReagents.map((reagent, index) => (
            <div key={index} className="text-center">
              <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-2"></div>
              <p className="text-xs text-gray-400">{reagent.name}</p>
              <p className="text-xs text-gray-400">{reagent.time} min</p>
            </div>
          ))}
          <div className="text-center">
            <div className="w-4 h-4 bg-success rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-400">Start Float</p>
            <p className="text-xs text-gray-400">{totalTime + 2} min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReagentTimeline;