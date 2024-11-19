import React, { useState } from 'react';
import { 
  Settings,
  Wind,
  Thermometer,
  Timer,
  BarChart2,
  EyeOff,
  AlertTriangle,
  Plus,
  X,
  Clock
} from 'lucide-react';
import TestScheduleSummary from './TestScheduleSummary';

const ConditionsSetup = ({ conditions, onConditionsChange, reagents }) => {
  const [showSchedule, setShowSchedule] = useState(false);

  const handleInputChange = (field, value) => {
    onConditionsChange({
      ...conditions,
      [field]: value,
    });
  };

  const addWaterAddition = () => {
    const newAddition = {
      time: '',
      volume: '',
      type: 'wash',
    };
    handleInputChange('waterAdditions', [
      ...(conditions.waterAdditions || []),
      newAddition,
    ]);
  };

  const removeWaterAddition = (index) => {
    const updatedAdditions = conditions.waterAdditions.filter(
      (_, i) => i !== index
    );
    handleInputChange('waterAdditions', updatedAdditions);
  };

  const updateWaterAddition = (index, field, value) => {
    const updatedAdditions = conditions.waterAdditions.map((addition, i) =>
      i === index ? { ...addition, [field]: value } : addition
    );
    handleInputChange('waterAdditions', updatedAdditions);
  };

  const calculateTotalScrapes = () => {
    if (!conditions.frothPullRate || !conditions.totalFlotationTime) return 0;
    return Math.round(parseFloat(conditions.frothPullRate) * parseFloat(conditions.totalFlotationTime));
  };

  return (
    <div className="space-y-6">
      {/* Main Operating Parameters */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Settings className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">
              Primary Operating Conditions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Impeller Speed Control */}
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Impeller Speed (rpm)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="input input-bordered flex-1 bg-secondary text-white"
                placeholder="Enter speed"
                value={conditions.impellerSpeed || ''}
                onChange={(e) =>
                  handleInputChange('impellerSpeed', e.target.value)
                }
              />
              <div className="text-xs text-gray-500">
                Tip Speed:{' '}
                {conditions.impellerSpeed
                  ? (parseFloat(conditions.impellerSpeed) * 0.00524).toFixed(1)
                  : '0.0'}{' '}
                m/s
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Recommended: 900-1200 rpm
            </div>
          </div>

          {/* Air Flow Control */}
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Air Flow Rate (L/min)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="input input-bordered flex-1 bg-secondary text-white"
                placeholder="Enter flow rate"
                value={conditions.airFlow || ''}
                onChange={(e) => handleInputChange('airFlow', e.target.value)}
              />
              <div className="text-xs text-gray-500">
                Jg:{' '}
                {conditions.airFlow
                  ? (parseFloat(conditions.airFlow) * 0.2).toFixed(1)
                  : '0.0'}{' '}
                cm/s
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Recommended: 4-8 L/min
            </div>
          </div>
        </div>
      </div>

      {/* Froth Characteristics */}
      <div className="glass-card p-6">
        <h3 className="text-md font-semibold text-white mb-4">
          Froth Characteristics
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Froth Height (cm)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              placeholder="Enter height"
              value={conditions.frothHeight || ''}
              onChange={(e) => handleInputChange('frothHeight', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Pull Rate (scrapes/min)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              placeholder="Enter rate"
              value={conditions.frothPullRate || ''}
              onChange={(e) =>
                handleInputChange('frothPullRate', e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Froth Travel Distance (cm)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              placeholder="Enter distance"
              value={conditions.frothTravelDistance || ''}
              onChange={(e) =>
                handleInputChange('frothTravelDistance', e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Test Characteristics */}
      <div className="glass-card p-6">
        <h3 className="text-md font-semibold text-white mb-4">
          Flotation Test Parameters
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Total Flotation Time (min)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              placeholder="15 min"
              value={conditions.totalFlotationTime || ''}
              onChange={(e) => handleInputChange('totalFlotationTime', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Total Scrapes
            </label>
            <div className="p-3 bg-secondary/50 rounded-lg text-primary font-bold">
              {calculateTotalScrapes()}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Buffer Time (min)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              placeholder="2 min"
              value={conditions.bufferTime || ''}
              onChange={(e) => handleInputChange('bufferTime', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Conditioning time after last reagent addition
            </p>
          </div>
        </div>
      </div>

      {/* Environmental Controls */}
      <div className="glass-card p-6">
        <h3 className="text-md font-semibold text-white mb-4">
          Environmental Parameters
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Temperature Control
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="input input-bordered flex-1 bg-secondary text-white"
                placeholder="Target °C"
                value={conditions.targetTemp || ''}
                onChange={(e) =>
                  handleInputChange('targetTemp', e.target.value)
                }
              />
              <select
                className="select select-sm bg-secondary"
                value={conditions.tempControl || ''}
                onChange={(e) =>
                  handleInputChange('tempControl', e.target.value)
                }
              >
                <option value="none">No Control</option>
                <option value="maintain">Maintain</option>
                <option value="heat">Heat</option>
                <option value="cool">Cool</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Ambient Conditions
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="input input-bordered flex-1 bg-secondary text-white"
                placeholder="Room Temp °C"
                value={conditions.roomTemp || ''}
                onChange={(e) => handleInputChange('roomTemp', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Water Additions */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-md font-semibold text-white">Water Additions</h3>
            <p className="text-sm text-gray-400">Times are relative to flotation start</p>
          </div>
          <button className="btn btn-sm btn-ghost" onClick={addWaterAddition}>
            <Plus className="h-4 w-4 mr-1" />
            Add Water Point
          </button>
        </div>
        <div className="space-y-3">
          {!conditions.waterAdditions ||
          conditions.waterAdditions.length === 0 ? (
            <div className="text-center p-4 border-2 border-dashed border-gray-700 rounded-lg">
              <p className="text-gray-500">No water addition points defined</p>
            </div>
          ) : (
            conditions.waterAdditions.map((addition, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <input
                  type="number"
                  className="input input-bordered bg-secondary text-white"
                  placeholder="Time (min)"
                  value={addition.time}
                  onChange={(e) =>
                    updateWaterAddition(index, 'time', e.target.value)
                  }
                />
                <input
                  type="number"
                  className="input input-bordered bg-secondary text-white"
                  placeholder="Volume (mL)"
                  value={addition.volume}
                  onChange={(e) =>
                    updateWaterAddition(index, 'volume', e.target.value)
                  }
                />
                <select
                  className="select bg-secondary"
                  value={addition.type}
                  onChange={(e) =>
                    updateWaterAddition(index, 'type', e.target.value)
                  }
                >
                  <option value="wash">Wash Water</option>
                  <option value="level">Level Control</option>
                  <option value="dilution">Dilution</option>
                </select>
                <button
                  className="btn btn-ghost text-red-400"
                  onClick={() => removeWaterAddition(index)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Advanced Monitoring */}
      <div className="glass-card p-6">
        <h3 className="text-md font-semibold text-white mb-4">
          Advanced Monitoring
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BarChart2 className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-white">
                Power Draw Monitoring
              </span>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={conditions.powerMonitoring || false}
                onChange={(e) =>
                  handleInputChange('powerMonitoring', e.target.checked)
                }
              />
              <span className="ml-2 text-sm text-gray-400">
                Enable power tracking
              </span>
            </label>
          </div>
          <div className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <EyeOff className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-white">
                Surface Area Monitoring
              </span>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={conditions.bubbleTracking || false}
                onChange={(e) =>
                  handleInputChange('bubbleTracking', e.target.checked)
                }
              />
              <span className="ml-2 text-sm text-gray-400">
                Enable bubble size tracking
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Operating Guidelines */}
      <div className="glass-card p-4">
        <div className="flex items-center text-amber-400 mb-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span className="text-sm">Operating Guidelines</span>
        </div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Maintain consistent froth depth throughout test</li>
          <li>• Record power draw fluctuations if observed</li>
          <li>• Log any operational anomalies</li>
          <li>• Check temperature drift every 5 minutes</li>
        </ul>
      </div>

      {/* View Schedule Button */}
      <div className="flex justify-center">
        <button 
          className="btn btn-primary"
          onClick={() => setShowSchedule(true)}
        >
          View Test Schedule
        </button>
      </div>

      {/* Test Schedule Modal */}
      {showSchedule && (
        <TestScheduleSummary
          conditions={conditions}
          reagents={reagents}
          onClose={() => setShowSchedule(false)}
        />
      )}
    </div>
  );
};

export default ConditionsSetup;