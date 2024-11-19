import React, { useState } from 'react';
import { Calculator, Info, Download, Save, FileText } from 'lucide-react';

const TwoProductCalculator = () => {
  const [inputs, setInputs] = useState({
    feedGrade: '',
    concentrateGrade: '',
    tailingsGrade: '',
    metalUnit: 'g/t',
  });

  const [results, setResults] = useState({
    recovery: null,
    upgradeRatio: null,
    massYield: null
  });

  const calculateResults = (values) => {
    const { feedGrade: f, concentrateGrade: c, tailingsGrade: t } = values;
    
    if (f && c && t) {
      const recovery = ((c - t) / (f - t)) * (f / c) * 100;
      const upgradeRatio = c / f;
      const massYield = ((f - t) / (c - t)) * 100;

      setResults({
        recovery: isNaN(recovery) ? null : recovery.toFixed(1),
        upgradeRatio: isNaN(upgradeRatio) ? null : upgradeRatio.toFixed(1),
        massYield: isNaN(massYield) ? null : massYield.toFixed(1)
      });
    }
  };

  const handleInputChange = (field, value) => {
    const newInputs = {
      ...inputs,
      [field]: value
    };
    setInputs(newInputs);
    calculateResults(newInputs);
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Calculator Header */}
        <div className="glass-card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-white">Two Product Formula Calculator</h1>
                  <p className="text-gray-400">Calculate recovery, upgrade ratio, and mass yield</p>
                </div>
              </div>
              <div className="flex space-x-2">
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
          {/* Input Section */}
          <div className="glass-card">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Input Parameters</h2>
              
              {/* Unit Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Metal Unit</label>
                <select 
                  className="select select-bordered w-full bg-secondary text-white"
                  value={inputs.metalUnit}
                  onChange={(e) => handleInputChange('metalUnit', e.target.value)}
                >
                  <option value="g/t">g/t</option>
                  <option value="%">%</option>
                  <option value="ppm">ppm</option>
                </select>
              </div>

              {/* Grade Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Feed Grade
                    <button className="ml-2 text-primary hover:text-primary/80">
                      <Info className="h-4 w-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.feedGrade}
                    onChange={(e) => handleInputChange('feedGrade', e.target.value)}
                    placeholder={`Enter feed grade (${inputs.metalUnit})`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Concentrate Grade
                    <button className="ml-2 text-primary hover:text-primary/80">
                      <Info className="h-4 w-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.concentrateGrade}
                    onChange={(e) => handleInputChange('concentrateGrade', e.target.value)}
                    placeholder={`Enter concentrate grade (${inputs.metalUnit})`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tailings Grade
                    <button className="ml-2 text-primary hover:text-primary/80">
                      <Info className="h-4 w-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-secondary text-white"
                    value={inputs.tailingsGrade}
                    onChange={(e) => handleInputChange('tailingsGrade', e.target.value)}
                    placeholder={`Enter tailings grade (${inputs.metalUnit})`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="glass-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Results</h2>
                <button className="btn btn-ghost btn-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>

              <div className="space-y-6">
                {/* Recovery */}
                <div className="glass-card p-4">
                  <label className="text-sm font-medium text-gray-400">Metal Recovery</label>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-primary">
                      {results.recovery ? `${results.recovery}%` : '-'}
                    </span>
                  </div>
                </div>

                {/* Upgrade Ratio */}
                <div className="glass-card p-4">
                  <label className="text-sm font-medium text-gray-400">Upgrade Ratio</label>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-primary">
                      {results.upgradeRatio || '-'}
                    </span>
                  </div>
                </div>

                {/* Mass Yield */}
                <div className="glass-card p-4">
                  <label className="text-sm font-medium text-gray-400">Mass Yield</label>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-primary">
                      {results.massYield ? `${results.massYield}%` : '-'}
                    </span>
                  </div>
                </div>

                {/* Formulas Used */}
                <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-secondary/50">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Formulas Used:</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>Recovery = ((C-T)/(F-T)) × (F/C) × 100%</li>
                    <li>Upgrade Ratio = C/F</li>
                    <li>Mass Yield = ((F-T)/(C-T)) × 100%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="glass-card mt-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">About Two Product Formula</h2>
            <div className="text-gray-400 space-y-3">
              <p>The two-product formula is used in mineral processing to calculate the performance of a separation process with one feed stream splitting into two product streams (concentrate and tailings).</p>
              <p>Where:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>F = Feed Grade</li>
                <li>C = Concentrate Grade</li>
                <li>T = Tailings Grade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoProductCalculator;