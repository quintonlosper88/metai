import React, { useState } from 'react';
import { Calculator, Info, Download, Save, FileText } from 'lucide-react';
import ProcessFlow from './ProcessFlow';

const ThreeProductCalculator = ({ onBack }) => {
  const [inputs, setInputs] = useState({
    feedTons: '',
    feedMetal1: '',
    feedMetal2: '',
    product1Metal1: '',
    product1Metal2: '',
    product2Metal1: '',
    product2Metal2: '',
    tailsMetal1: '',
    tailsMetal2: '',
    metalUnit: '%'
  });

  const [results, setResults] = useState({
    product1Tons: null,
    product2Tons: null,
    tailsTons: null,
    metal1Recovery: null,
    metal1UpgradeRatio: null,
    metal2Recovery: null,
    metal2UpgradeRatio: null
  });

  const handleInputChange = (field, value) => {
    const newInputs = {
      ...inputs,
      [field]: value
    };
    setInputs(newInputs);
    calculateResults(newInputs);
  };

  const calculateResults = (values) => {
    // Add calculation logic here
    // This is a placeholder for demonstration
    if (values.feedTons) {
      setResults({
        product1Tons: (values.feedTons * 0.087).toFixed(1),
        product2Tons: (values.feedTons * 0.348).toFixed(1),
        tailsTons: (values.feedTons * 0.565).toFixed(1),
        metal1Recovery: '81.4',
        metal1UpgradeRatio: '11.51',
        metal2Recovery: '94.9',
        metal2UpgradeRatio: '2.88'
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-white">Three Product Formula Calculator</h1>
                  <p className="text-gray-400">Calculate recoveries, yields and upgrade ratios for dual metal separation</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="btn btn-ghost btn-sm" onClick={onBack}>
                  Back
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button className="btn btn-ghost btn-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Section */}
          <div className="space-y-6">
            {/* Feed Inputs */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Feed Parameters</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Feed Tons</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.feedTons}
                    onChange={(e) => handleInputChange('feedTons', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 1 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.feedMetal1}
                    onChange={(e) => handleInputChange('feedMetal1', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 2 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.feedMetal2}
                    onChange={(e) => handleInputChange('feedMetal2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product 1 Inputs */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Product 1 (Metal 1 Concentrate)</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 1 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.product1Metal1}
                    onChange={(e) => handleInputChange('product1Metal1', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 2 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.product1Metal2}
                    onChange={(e) => handleInputChange('product1Metal2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product 2 Inputs */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Product 2 (Metal 2 Concentrate)</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 1 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.product2Metal1}
                    onChange={(e) => handleInputChange('product2Metal1', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 2 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.product2Metal2}
                    onChange={(e) => handleInputChange('product2Metal2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tails Inputs */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Final Tails</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 1 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.tailsMetal1}
                    onChange={(e) => handleInputChange('tailsMetal1', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Metal 2 (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.tailsMetal2}
                    onChange={(e) => handleInputChange('tailsMetal2', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Process Diagram */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Process Flow</h2>
              <div className="h-64">
                <ProcessFlow />
              </div>
            </div>

            {/* Tonnage Results */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Mass Distribution</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Product 1</label>
                  <div className="text-xl font-bold text-primary">
                    {results.product1Tons || '-'} t
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Product 2</label>
                  <div className="text-xl font-bold text-primary">
                    {results.product2Tons || '-'} t
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Tails</label>
                  <div className="text-xl font-bold text-primary">
                    {results.tailsTons || '-'} t
                  </div>
                </div>
              </div>
            </div>

            {/* Metal 1 Results */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Metal 1 Performance</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Recovery</label>
                  <div className="text-xl font-bold text-primary">
                    {results.metal1Recovery ? `${results.metal1Recovery}%` : '-'}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Upgrade Ratio</label>
                  <div className="text-xl font-bold text-primary">
                    {results.metal1UpgradeRatio || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Metal 2 Results */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Metal 2 Performance</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Recovery</label>
                  <div className="text-xl font-bold text-primary">
                    {results.metal2Recovery ? `${results.metal2Recovery}%` : '-'}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">Upgrade Ratio</label>
                  <div className="text-xl font-bold text-primary">
                    {results.metal2UpgradeRatio || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeProductCalculator;