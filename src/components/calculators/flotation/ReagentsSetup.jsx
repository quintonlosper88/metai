import React, { useState } from 'react';
import { 
  Beaker, 
  Plus, 
  X, 
  Clock, 
  AlertTriangle,
  Droplet,
  ArrowDown
} from 'lucide-react';
import StockSolutionCalculator from './StockSolutionCalculator';
import ReagentTimeline from './ReagentTimeline';
import ReagentStage from './ReagentStage';

const ReagentsSetup = ({ reagents, onReagentsChange, setupData }) => {
  const [showStockPrep, setShowStockPrep] = useState(false);
  const [stages, setStages] = useState([1]);

  const addStage = () => {
    setStages([...stages, stages.length + 1]);
  };

  // Get sample weight from setupData
  const sampleWeight = setupData?.sampleState === 'dry' 
    ? parseFloat(setupData.dryWeight)
    : 0; // For slurry samples, we'll need to calculate this based on slurry properties

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Beaker className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Reagent Scheme</h2>
          </div>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={() => setShowStockPrep(true)}
          >
            Stock Solution Calculator
          </button>
        </div>
      </div>

      {/* Sample Information Summary */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-400">Sample Weight:</span>
            <span className="ml-2 text-white">{sampleWeight ? `${sampleWeight} g` : 'Not set'}</span>
          </div>
          <div>
            <span className="text-gray-400">Sample State:</span>
            <span className="ml-2 text-white capitalize">{setupData?.sampleState || 'Not set'}</span>
          </div>
          <div>
            <span className="text-gray-400">Pulp Density:</span>
            <span className="ml-2 text-white">
              {setupData?.targetPulpDensity ? `${setupData.targetPulpDensity}%` : 'Not set'}
            </span>
          </div>
        </div>
      </div>

      {/* Reagent Addition Stages */}
      {stages.map((stage) => (
        <ReagentStage 
          key={stage}
          stageNumber={stage}
          reagents={reagents}
          onReagentsChange={onReagentsChange}
          sampleWeight={sampleWeight}
        />
      ))}

      {/* Add Stage Button */}
      <button 
        className="btn btn-outline btn-sm w-full"
        onClick={addStage}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Another Stage
      </button>

      {/* Stock Solution Calculator Modal */}
      {showStockPrep && (
        <StockSolutionCalculator 
          onClose={() => setShowStockPrep(false)}
        />
      )}

      {/* Reagent Timeline */}
      <ReagentTimeline reagents={reagents} />

      {/* Warnings/Notes */}
      <div className="glass-card p-4">
        <div className="flex items-center text-amber-400 mb-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span className="text-sm">Reagent Compatibility Notes</span>
        </div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Ensure pH adjustment before collector addition</li>
          <li>• Maintain minimum 2-minute spacing between additions</li>
          <li>• Check collector-depressant compatibility</li>
        </ul>
      </div>
    </div>
  );
};

export default ReagentsSetup;