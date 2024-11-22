import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Plus,
  Trash2,
  Download,
  Table,
  Info,
  ArrowLeft
} from 'lucide-react';
import PSDChart from './PSDChart';

const PSDCalculator = ({ onBack }) => {
  const [fractions, setFractions] = useState([
    { id: 1, upperSize: '25400', lowerSize: '19050', mass: '0.00' },
    { id: 2, upperSize: '19050', lowerSize: '12700', mass: '0.00' },
    { id: 3, upperSize: '12700', lowerSize: '9500', mass: '18.17' },
    { id: 4, upperSize: '9500', lowerSize: '6700', mass: '41.49' },
    { id: 5, upperSize: '6700', lowerSize: '4750', mass: '40.76' },
    { id: 6, upperSize: '4750', lowerSize: '3350', mass: '37.01' },
    { id: 7, upperSize: '3350', lowerSize: '2360', mass: '38.53' },
    { id: 8, upperSize: '2360', lowerSize: '1700', mass: '44.14' },
    { id: 9, upperSize: '1700', lowerSize: '1180', mass: '51.21' },
    { id: 10, upperSize: '1180', lowerSize: '850', mass: '66.98' },
    { id: 11, upperSize: '850', lowerSize: '600', mass: '78.83' },
    { id: 12, upperSize: '600', lowerSize: '425', mass: '100.61' },
    { id: 13, upperSize: '425', lowerSize: '300', mass: '122.86' },
    { id: 14, upperSize: '300', lowerSize: '212', mass: '142.11' },
    { id: 15, upperSize: '212', lowerSize: '150', mass: '143.62' },
    { id: 16, upperSize: '150', lowerSize: '106', mass: '125.60' },
    { id: 17, upperSize: '106', lowerSize: '75', mass: '98.97' },
    { id: 18, upperSize: '75', lowerSize: '53', mass: '73.25' },
    { id: 19, upperSize: '53', lowerSize: '38', mass: '53.99' },
    { id: 20, upperSize: '38', lowerSize: '0', mass: '38.98' }
  ]);

  const [results, setResults] = useState({
    d25: null,
    d50: null,
    d80: null,
    imperfection: null,
    geometricMean: null,
    detailedResults: []
  });

  const addFraction = () => {
    const newId = fractions.length + 1;
    setFractions([...fractions, { id: newId, upperSize: '', lowerSize: '', mass: '' }]);
  };

  const removeFraction = (id) => {
    if (fractions.length > 1) {
      setFractions(fractions.filter(f => f.id !== id));
    }
  };

  const updateFraction = (index, field, value) => {
    const newFractions = [...fractions];
    newFractions[index][field] = value;
    setFractions(newFractions);
  };

  const calculateResults = () => {
    // Skip calculation if any required fields are empty
    if (fractions.some(f => !f.upperSize || !f.lowerSize || !f.mass)) return;

    // Sort fractions by upper size
    const sortedFractions = [...fractions].sort((a, b) =>
      parseFloat(b.upperSize) - parseFloat(a.upperSize)
    );

    // Calculate total mass
    const totalMass = sortedFractions.reduce((sum, f) =>
      sum + parseFloat(f.mass), 0
    );

    // Calculate cumulative passing
    let cumulativePercent = 100;
    const detailedResults = sortedFractions.map(fraction => {
      const percentRetained = (parseFloat(fraction.mass) / totalMass) * 100;
      const result = {
        sizeRange: `${fraction.upperSize}-${fraction.lowerSize}`,
        percentRetained: percentRetained.toFixed(1),
        cumulativePassing: cumulativePercent.toFixed(1)
      };
      cumulativePercent -= percentRetained;
      return result;
    });

    // Calculate key sizes (simplified example)
    const d80 = parseFloat(sortedFractions[0].upperSize);
    const d50 = parseFloat(sortedFractions[Math.floor(sortedFractions.length / 2)].upperSize);
    const d25 = parseFloat(sortedFractions[sortedFractions.length - 1].lowerSize);

    // Calculate geometric mean (simplified)
    const geometricMean = Math.sqrt(d80 * d25);

    // Calculate imperfection
    const imperfection = (d80 - d25) / (2 * d50);

    setResults({
      d25: d25.toFixed(0),
      d50: d50.toFixed(0),
      d80: d80.toFixed(0),
      imperfection: imperfection.toFixed(2),
      geometricMean: geometricMean.toFixed(0),
      detailedResults
    });
  };

  useEffect(() => {
    calculateResults();
  }, [fractions]);

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart2 className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Particle Size Distribution Analysis</h1>
                <p className="text-gray-400">Calculate size distribution parameters and statistics</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onBack}
                className="btn btn-ghost btn-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button className="btn btn-ghost btn-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="btn btn-ghost btn-sm">
                <Table className="h-4 w-4 mr-2" />
                Import Data
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Size Fraction Inputs */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Size Fractions</h2>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={addFraction}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size Fraction
                </button>
              </div>

              <div className="space-y-4">
                {fractions.map((fraction, index) => (
                  <div key={fraction.id} className="grid grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Upper Size (μm)
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full bg-secondary text-white"
                        value={fraction.upperSize}
                        onChange={(e) => updateFraction(index, 'upperSize', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Lower Size (μm)
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full bg-secondary text-white"
                        value={fraction.lowerSize}
                        onChange={(e) => updateFraction(index, 'lowerSize', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Mass (g)
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full bg-secondary text-white"
                        value={fraction.mass}
                        onChange={(e) => updateFraction(index, 'mass', e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      onClick={() => removeFraction(fraction.id)}
                      disabled={fractions.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* PSD Curve */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Size Distribution Curve</h2>
              <div className="aspect-w-16 aspect-h-9 bg-secondary/50 rounded-lg">
                <PSDChart data={results.detailedResults} />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Key Size Parameters</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">D25</label>
                  <div className="text-xl font-bold text-primary">
                    {results.d25 ? `${results.d25} μm` : '-'}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">D50</label>
                  <div className="text-xl font-bold text-primary">
                    {results.d50 ? `${results.d50} μm` : '-'}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-400">D80</label>
                  <div className="text-xl font-bold text-primary">
                    {results.d80 ? `${results.d80} μm` : '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Size Statistics */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Distribution Statistics</h2>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-400">Imperfection</label>
                    <div className="text-lg font-bold text-primary">
                      {results.imperfection || '-'}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-400">Geometric Mean</label>
                    <div className="text-lg font-bold text-primary">
                      {results.geometricMean ? `${results.geometricMean} μm` : '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Detailed Results</h2>
                <button className="btn btn-ghost btn-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-2">Size Range (μm)</th>
                      <th className="text-right py-2">% Retained</th>
                      <th className="text-right py-2">Cum. % Passing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.detailedResults.map((row, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2">{row.sizeRange}</td>
                        <td className="text-right">{row.percentRetained}%</td>
                        <td className="text-right">{row.cumulativePassing}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSDCalculator;