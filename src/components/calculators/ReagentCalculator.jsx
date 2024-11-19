import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  Droplet, 
  Clock, 
  Scale,
  Info,
  ArrowLeft
} from 'lucide-react';

const ReagentCalculator = ({ onBack }) => {
  const [inputs, setInputs] = useState({
    reagentType: 'new',
    makeupStrength: '',
    existingStrength: '',
    needsDilution: false,
    dilutionRatio: '',
    dosageRate: '',
    processRate: '',
    batchSize: ''
  });

  const [results, setResults] = useState({
    makeupWater: null,
    dilutionWater: null,
    pumpRate: null,
    batchDuration: null
  });

  const calculateResults = () => {
    const {
      makeupStrength,
      existingStrength,
      needsDilution,
      dilutionRatio,
      dosageRate,
      processRate,
      batchSize
    } = inputs;

    if (!dosageRate || !processRate || !batchSize) return;

    // Example calculations (replace with actual formulas)
    const makeupWater = parseFloat(batchSize) * 0.25;
    const dilutionWater = needsDilution ? parseFloat(batchSize) * 0.8 : 0;
    const pumpRate = (parseFloat(dosageRate) * parseFloat(processRate)) / 
                    (parseFloat(needsDilution ? dilutionRatio.split(':')[1] : makeupStrength) * 10);
    const batchDuration = parseFloat(batchSize) / pumpRate;

    setResults({
      makeupWater: makeupWater.toFixed(1),
      dilutionWater: dilutionWater.toFixed(1),
      pumpRate: pumpRate.toFixed(1),
      batchDuration: batchDuration.toFixed(1)
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Beaker className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Reagent Preparation Calculator</h1>
                <p className="text-gray-400">Calculate makeup quantities and dosing rates</p>
              </div>
            </div>
            <button 
              onClick={onBack}
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
        </div>

        {/* Reagent Type Selection */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Reagent Preparation</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className={`p-4 rounded-lg transition-colors ${
                inputs.reagentType === 'new' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-gray-400 hover:bg-secondary/70'
              }`}
              onClick={() => setInputs({...inputs, reagentType: 'new'})}
            >
              New Makeup Solution
            </button>
            <button 
              className={`p-4 rounded-lg transition-colors ${
                inputs.reagentType === 'existing' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-gray-400 hover:bg-secondary/70'
              }`}
              onClick={() => setInputs({...inputs, reagentType: 'existing'})}
            >
              Existing Solution
            </button>
          </div>
        </div>

        {/* Solution Properties */}
        <div className="glass-card p-6">
          <div className="space-y-4">
            {inputs.reagentType === 'new' ? (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Required Makeup Strength (%)
                  <button className="ml-2 text-primary hover:text-primary/80">
                    <Info className="h-4 w-4" />
                  </button>
                </label>
                <input 
                  type="number"
                  className="input input-bordered w-full bg-secondary text-white"
                  value={inputs.makeupStrength}
                  onChange={(e) => setInputs({...inputs, makeupStrength: e.target.value})}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Existing Solution Strength (%)
                  <button className="ml-2 text-primary hover:text-primary/80">
                    <Info className="h-4 w-4" />
                  </button>
                </label>
                <input 
                  type="number"
                  className="input input-bordered w-full bg-secondary text-white"
                  value={inputs.existingStrength}
                  onChange={(e) => setInputs({...inputs, existingStrength: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2 text-gray-400 mb-4">
                <input 
                  type="checkbox"
                  checked={inputs.needsDilution}
                  onChange={(e) => setInputs({...inputs, needsDilution: e.target.checked})}
                  className="checkbox checkbox-primary"
                />
                <span>Requires Dilution</span>
              </label>
              
              {inputs.needsDilution && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Dilution Ratio
                    <button className="ml-2 text-primary hover:text-primary/80">
                      <Info className="h-4 w-4" />
                    </button>
                  </label>
                  <input 
                    type="text"
                    className="input input-bordered w-full bg-secondary text-white"
                    placeholder="e.g., 1:5"
                    value={inputs.dilutionRatio}
                    onChange={(e) => setInputs({...inputs, dilutionRatio: e.target.value})}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Process Parameters */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Process Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Dosage Rate (g/t)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input 
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={inputs.dosageRate}
                onChange={(e) => setInputs({...inputs, dosageRate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Process Rate (t/h)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input 
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={inputs.processRate}
                onChange={(e) => setInputs({...inputs, processRate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Batch Size (L)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input 
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={inputs.batchSize}
                onChange={(e) => setInputs({...inputs, batchSize: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Results</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplet className="h-5 w-5 text-primary" />
                <label className="text-sm font-medium text-gray-400">Makeup Water Required</label>
              </div>
              <div className="text-xl font-bold text-primary">
                {results.makeupWater ? `${results.makeupWater} L` : '-'}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplet className="h-5 w-5 text-primary" />
                <label className="text-sm font-medium text-gray-400">Dilution Water Required</label>
              </div>
              <div className="text-xl font-bold text-primary">
                {results.dilutionWater ? `${results.dilutionWater} L` : '-'}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Scale className="h-5 w-5 text-primary" />
                <label className="text-sm font-medium text-gray-400">Pump Rate Required</label>
              </div>
              <div className="text-xl font-bold text-primary">
                {results.pumpRate ? `${results.pumpRate} L/h` : '-'}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <label className="text-sm font-medium text-gray-400">Batch Duration</label>
              </div>
              <div className="text-xl font-bold text-primary">
                {results.batchDuration ? `${results.batchDuration} hours` : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReagentCalculator;