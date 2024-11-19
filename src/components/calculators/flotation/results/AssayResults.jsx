import React, { useState, useEffect } from 'react';
import { Flask, Calculator, AlertTriangle } from 'lucide-react';

const AssayResults = ({ data, setupData, elements, onUpdate }) => {
  const [calculations, setCalculations] = useState(null);

  const calculateResults = () => {
    // Add calculations for recovery, upgrade ratio, etc.
    // This is a placeholder for demonstration
    return {
      recoveries: {},
      upgradeRatios: {},
      isValid: true
    };
  };

  useEffect(() => {
    setCalculations(calculateResults());
  }, [data]);

  const updateAssay = (product, element, value) => {
    onUpdate({
      [product]: {
        ...data[product],
        [element]: value
      }
    });
  };

  const renderElementInputs = (elementType) => (
    <div className="mb-6">
      <h4 className="text-md font-semibold text-white mb-4 capitalize">{elementType} Elements</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2">Element</th>
              <th className="text-right py-2">Feed</th>
              <th className="text-right py-2">Concentrate</th>
              <th className="text-right py-2">Tailings</th>
              <th className="text-right py-2">Recovery</th>
              <th className="text-right py-2">Upgrade Ratio</th>
            </tr>
          </thead>
          <tbody>
            {elements[elementType].map((element, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2">
                  {element.symbol} ({element.unit})
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-24 bg-secondary text-white text-right"
                    value={data.feed?.[element.symbol] || ''}
                    onChange={(e) => updateAssay('feed', element.symbol, e.target.value)}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-24 bg-secondary text-white text-right"
                    value={data.concentrate?.[element.symbol] || ''}
                    onChange={(e) => updateAssay('concentrate', element.symbol, e.target.value)}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-24 bg-secondary text-white text-right"
                    value={data.tailings?.[element.symbol] || ''}
                    onChange={(e) => updateAssay('tailings', element.symbol, e.target.value)}
                  />
                </td>
                <td className="py-2 text-right">
                  {calculations?.recoveries[element.symbol]?.toFixed(1)}%
                </td>
                <td className="py-2 text-right">
                  {calculations?.upgradeRatios[element.symbol]?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Assay Inputs */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Assay Results</h3>
        {renderElementInputs('primary')}
        {renderElementInputs('secondary')}
        {renderElementInputs('penalty')}
      </div>

      {/* Save Section */}
      <div className="glass-card p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Flask className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Save Assay Results</h4>
            <p className="text-gray-400 text-sm mb-4">
              Enter assay results for all products to calculate final recoveries and upgrade ratios.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onUpdate({ status: 'complete' })}
              disabled={!calculations?.isValid}
            >
              Complete Test Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssayResults;