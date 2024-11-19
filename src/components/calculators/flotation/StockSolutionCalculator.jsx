import React, { useState } from 'react';
import { X } from 'lucide-react';
import { commonReagents } from './reagentData';

const StockSolutionCalculator = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    reagent: '',
    concentration: '',
    volume: '',
    activeContent: ''
  });

  const [result, setResult] = useState(null);

  const calculateStock = () => {
    const { concentration, volume, activeContent } = inputs;
    if (!concentration || !volume || !activeContent) return;

    const solidWeight = (parseFloat(concentration) * parseFloat(volume)) / 
                       (parseFloat(activeContent) / 100);
    
    setResult({
      solidWeight: solidWeight.toFixed(2),
      waterVolume: (parseFloat(volume) - solidWeight/2).toFixed(2)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Stock Solution Calculator</h3>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2">Reagent</label>
            <select 
              className="select select-sm bg-secondary w-full"
              value={inputs.reagent}
              onChange={(e) => setInputs({ ...inputs, reagent: e.target.value })}
            >
              <option value="">Select Reagent</option>
              {Object.values(commonReagents).flat().map(reagent => (
                <option key={reagent.name} value={reagent.name}>
                  {reagent.name} ({reagent.formula})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2">
              Target Concentration
            </label>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder="%w/v"
              value={inputs.concentration}
              onChange={(e) => setInputs({ ...inputs, concentration: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2">
              Solution Volume
            </label>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder="mL"
              value={inputs.volume}
              onChange={(e) => setInputs({ ...inputs, volume: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2">
              Active Content
            </label>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder="%"
              value={inputs.activeContent}
              onChange={(e) => setInputs({ ...inputs, activeContent: e.target.value })}
            />
          </div>
        </div>

        {result && (
          <div className="bg-secondary/50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-white mb-2">Results</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Solid Weight Required:</p>
                <p className="text-primary font-bold">{result.solidWeight} g</p>
              </div>
              <div>
                <p className="text-gray-400">Water Volume Required:</p>
                <p className="text-primary font-bold">{result.waterVolume} mL</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button 
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-sm btn-primary"
            onClick={calculateStock}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockSolutionCalculator;