import React from 'react';
import { X, Clock, Beaker, Droplet, ArrowRight } from 'lucide-react';

const TestScheduleSummary = ({ conditions, onClose }) => {
  const calculateTotalScrapes = () => {
    if (!conditions.frothPullRate || !conditions.totalFlotationTime) return 0;
    return Math.round(parseFloat(conditions.frothPullRate) * parseFloat(conditions.totalFlotationTime));
  };

  const calculateReagentVolume = (reagent) => {
    if (!reagent.dosage || !reagent.concentration) return null;
    
    // For pH modifiers, return null as volume depends on pH curve
    if (reagent.type === 'phModifier') return null;

    // Convert g/t to total grams needed based on sample weight
    const sampleWeight = 1000; // Default to 1kg if not provided
    const totalGramsNeeded = (parseFloat(reagent.dosage) * (sampleWeight / 1000000));

    // Calculate volume in mL
    // Formula: (grams needed * 100) / concentration(%w/v)
    const volumeRequired = (totalGramsNeeded * 100) / parseFloat(reagent.concentration);

    return volumeRequired.toFixed(2);
  };

  const generateTimelineEvents = () => {
    const events = [];
    
    // Add reagent conditioning events
    Object.entries(conditions.reagents || {}).forEach(([type, reagentList]) => {
      reagentList.forEach(reagent => {
        if (reagent.time) {
          const volume = calculateReagentVolume(reagent);
          events.push({
            time: parseFloat(reagent.time),
            type: 'reagent',
            reagentType: type,
            description: `Add ${reagent.name} ${volume ? `(${volume} mL)` : ''}`,
            details: {
              concentration: reagent.concentration ? `${reagent.concentration}%w/v` : '-',
              dosage: reagent.dosage ? `${reagent.dosage} g/t` : '-',
              volume: volume ? `${volume} mL` : '-'
            }
          });
        }
      });
    });

    // Add water addition events
    if (conditions.waterAdditions) {
      conditions.waterAdditions.forEach(addition => {
        events.push({
          time: parseFloat(addition.time),
          type: 'water',
          description: `${addition.type} water addition (${addition.volume} mL)`
        });
      });
    }

    // Sort events by time
    return events.sort((a, b) => a.time - b.time);
  };

  const events = generateTimelineEvents();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Test Schedule Summary</h3>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Key Parameters Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Total Time</label>
            <div className="text-xl font-bold text-primary">
              {conditions.totalFlotationTime || '-'} min
            </div>
          </div>
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Pull Rate</label>
            <div className="text-xl font-bold text-primary">
              {conditions.frothPullRate || '-'} /min
            </div>
          </div>
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Total Scrapes</label>
            <div className="text-xl font-bold text-primary">
              {calculateTotalScrapes()}
            </div>
          </div>
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Temperature</label>
            <div className="text-xl font-bold text-primary">
              {conditions.targetTemp || '-'}°C
            </div>
          </div>
        </div>

        {/* Operating Parameters */}
        <div className="glass-card p-4 mb-6">
          <h4 className="text-md font-semibold text-white mb-4">Operating Parameters</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-400">Impeller Speed</label>
              <p className="text-primary">{conditions.impellerSpeed || '-'} rpm</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Air Flow</label>
              <p className="text-primary">{conditions.airFlow || '-'} L/min</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Froth Height</label>
              <p className="text-primary">{conditions.frothHeight || '-'} cm</p>
            </div>
          </div>
        </div>

        {/* Reagent Summary */}
        <div className="glass-card p-4 mb-6">
          <h4 className="text-md font-semibold text-white mb-4">Reagent Summary</h4>
          <div className="space-y-4">
            {Object.entries(conditions.reagents || {}).map(([type, reagents]) => (
              reagents.length > 0 && (
                <div key={type} className="glass-card p-4">
                  <h5 className="text-sm font-medium text-primary mb-2 capitalize">{type}</h5>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-gray-400">Reagent</div>
                    <div className="text-gray-400">Concentration</div>
                    <div className="text-gray-400">Dosage</div>
                    <div className="text-gray-400">Volume</div>
                    {reagents.map((reagent, index) => (
                      <React.Fragment key={index}>
                        <div className="text-white">{reagent.name || '-'}</div>
                        <div className="text-white">{reagent.concentration ? `${reagent.concentration}%w/v` : '-'}</div>
                        <div className="text-white">{reagent.dosage ? `${reagent.dosage} g/t` : '-'}</div>
                        <div className="text-white">{calculateReagentVolume(reagent) ? `${calculateReagentVolume(reagent)} mL` : '-'}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-4 mb-6">
          <h4 className="text-md font-semibold text-white mb-4">Test Timeline</h4>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-right text-gray-400">
                  {event.time} min
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  {event.type === 'reagent' ? (
                    <Beaker className="h-4 w-4 text-primary" />
                  ) : (
                    <Droplet className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="glass-card p-3">
                    <p className="text-white">{event.description}</p>
                    {event.details && (
                      <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-gray-400">
                        <div>Concentration: {event.details.concentration}</div>
                        <div>Dosage: {event.details.dosage}</div>
                        <div>Volume: {event.details.volume}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Final flotation start point */}
            <div className="flex items-center space-x-4">
              <div className="w-20 text-right text-gray-400">
                {conditions.totalFlotationTime} min
              </div>
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1 glass-card p-2">
                <p className="text-white">End of Test</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Requirements */}
        <div className="glass-card p-4">
          <h4 className="text-md font-semibold text-white mb-4">Monitoring Requirements</h4>
          <div className="space-y-2 text-gray-400">
            <p>• Record temperature every 5 minutes</p>
            {conditions.powerMonitoring && (
              <p>• Monitor and log power draw fluctuations</p>
            )}
            {conditions.bubbleTracking && (
              <p>• Track bubble size distribution</p>
            )}
            <p>• Maintain consistent froth depth of {conditions.frothHeight} cm</p>
            <p>• Log any operational anomalies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScheduleSummary;