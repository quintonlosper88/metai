import React from 'react';
import { Clock, FileText, AlertTriangle } from 'lucide-react';

const InitialResults = ({ data, setupData, onUpdate }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Test Information */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Test Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Completion Time
            </label>
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-5 w-5 text-primary" />
              <span>{formatDate(data.completionTime)}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Test Duration
            </label>
            <div className="text-white">
              {setupData.conditions.totalFlotationTime} minutes
            </div>
          </div>
        </div>
      </div>

      {/* Test Conditions Summary */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Test Conditions</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400">Cell Size</label>
            <p className="text-white">{setupData.cellSize} L</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400">Impeller Speed</label>
            <p className="text-white">{setupData.conditions.impellerSpeed} rpm</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400">Air Flow</label>
            <p className="text-white">{setupData.conditions.airFlow} L/min</p>
          </div>
        </div>
      </div>

      {/* Notes and Observations */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notes and Observations</h3>
        <textarea
          className="w-full h-32 bg-secondary border border-gray-700 rounded-lg p-3 text-white resize-none"
          placeholder="Enter any observations, issues, or notes about the test..."
          value={data.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
        />
      </div>

      {/* Save Section */}
      <div className="glass-card p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Save Initial Results</h4>
            <p className="text-gray-400 text-sm mb-4">
              You can save these initial results now and add mass and assay data later when available.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onUpdate({ status: 'complete' })}
            >
              Save and Continue Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialResults;