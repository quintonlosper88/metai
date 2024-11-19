import React, { useState, useEffect } from 'react';
import { Scale, AlertTriangle, Check } from 'lucide-react';

const MassResults = ({ data, setupData, onUpdate }) => {
  const [massBalance, setMassBalance] = useState(null);

  const calculateMassBalance = () => {
    if (!data.concentrate || !data.tailings) return null;

    const totalMass = parseFloat(data.concentrate) + parseFloat(data.tailings);
    const feedMass = setupData.sampleState === 'dry' 
      ? parseFloat(setupData.dryWeight)
      : 0; // Calculate from slurry properties if needed

    if (!feedMass) return null;

    const recovery = (parseFloat(data.concentrate) / feedMass) * 100;
    const balance = (totalMass / feedMass) * 100;

    return {
      recovery,
      balance,
      difference: Math.abs(100 - balance)
    };
  };

  useEffect(() => {
    setMassBalance(calculateMassBalance());
  }, [data.concentrate, data.tailings]);

  return (
    <div className="space-y-6">
      {/* Mass Inputs */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Product Masses</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Concentrate Mass (g)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              value={data.concentrate}
              onChange={(e) => onUpdate({ concentrate: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Tailings Mass (g)
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-secondary text-white"
              value={data.tailings}
              onChange={(e) => onUpdate({ tailings: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Mass Balance Results */}
      {massBalance && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Mass Balance</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Mass Recovery</label>
              <div className="text-2xl font-bold text-primary">
                {massBalance.recovery.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Mass Balance</label>
              <div className="text-2xl font-bold text-primary">
                {massBalance.balance.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Difference</label>
              <div className={`text-2xl font-bold ${
                massBalance.difference <= 2 ? 'text-success' : 'text-error'
              }`}>
                {massBalance.difference.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Balance Warning */}
          {massBalance.difference > 2 && (
            <div className="mt-4 p-4 border border-error/50 rounded-lg bg-error/10">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-error font-medium">Mass Balance Warning</h4>
                  <p className="text-sm text-gray-400">
                    The mass balance difference exceeds 2%. Please check your measurements.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Save Section */}
      <div className="glass-card p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {massBalance && massBalance.difference <= 2 ? (
              <Check className="h-6 w-6 text-success" />
            ) : (
              <Scale className="h-6 w-6 text-primary" />
            )}
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Save Mass Results</h4>
            <p className="text-gray-400 text-sm mb-4">
              {massBalance && massBalance.difference <= 2
                ? 'Mass balance is within acceptable range. You can proceed to assay results.'
                : 'Enter product masses to calculate mass balance.'}
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onUpdate({ status: 'complete' })}
              disabled={!massBalance || massBalance.difference > 2}
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassResults;