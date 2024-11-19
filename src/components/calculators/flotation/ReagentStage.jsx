import React from 'react';
import { Plus, X, Info } from 'lucide-react';
import { commonReagents } from './reagentData';

const ReagentStage = ({ stageNumber, reagents, onReagentsChange, sampleWeight = 1000 }) => {
  const calculateReagentVolume = (reagent, type) => {
    if (!reagent.dosage || !reagent.concentration) return null;

    // For pH modifiers, return null as volume depends on pH curve
    if (type === 'phModifier') return null;

    // Convert g/t to total grams needed based on sample weight
    const totalGramsNeeded = (parseFloat(reagent.dosage) * (sampleWeight / 1000000)); // Convert sample weight to tons

    // Calculate volume in mL
    // Formula: (grams needed * 100) / concentration(%w/v)
    const volumeRequired = (totalGramsNeeded * 100) / parseFloat(reagent.concentration);

    return volumeRequired.toFixed(2);
  };

  const addReagent = (type) => {
    const newReagent = {
      name: '',
      concentration: '',
      dosage: '',
      stage: '',
      time: ''
    };
    
    onReagentsChange({
      ...reagents,
      [type]: [...(reagents[type] || []), newReagent]
    });
  };

  const removeReagent = (type, index) => {
    onReagentsChange({
      ...reagents,
      [type]: reagents[type].filter((_, i) => i !== index)
    });
  };

  const updateReagent = (type, index, field, value) => {
    onReagentsChange({
      ...reagents,
      [type]: reagents[type].map((reagent, i) => 
        i === index ? { ...reagent, [field]: value } : reagent
      )
    });
  };

  const renderReagentSection = (type, title, options) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-400">{title}</label>
        <button 
          className="btn btn-sm btn-ghost"
          onClick={() => addReagent(type)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>
      {(reagents[type] || []).map((reagent, index) => (
        <div key={index} className="grid grid-cols-8 gap-3 items-center mb-2">
          <div className="col-span-2">
            <select 
              className="select select-sm bg-secondary w-full"
              value={reagent.name}
              onChange={(e) => updateReagent(type, index, 'name', e.target.value)}
            >
              <option value="">Select Reagent</option>
              {options.map(opt => (
                <option key={opt.name} value={opt.name}>
                  {opt.name} ({opt.formula})
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder="Conc %"
              value={reagent.concentration}
              onChange={(e) => updateReagent(type, index, 'concentration', e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder={type === 'phModifier' ? 'Target pH' : 'g/t'}
              value={reagent.dosage}
              onChange={(e) => updateReagent(type, index, 'dosage', e.target.value)}
            />
          </div>
          <div>
            <select 
              className="select select-sm bg-secondary w-full"
              value={reagent.stage}
              onChange={(e) => updateReagent(type, index, 'stage', e.target.value)}
            >
              <option value="">Stage</option>
              <option value="primary">Primary</option>
              <option value="rougher">Rougher</option>
              <option value="cleaner">Cleaner</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              className="input input-bordered input-sm w-full bg-secondary"
              placeholder="Time (min)"
              value={reagent.time}
              onChange={(e) => updateReagent(type, index, 'time', e.target.value)}
            />
          </div>
          <div className="relative group">
            <div className="flex items-center space-x-1 bg-secondary/50 rounded px-2 py-1">
              <span className="text-xs text-gray-400">
                {calculateReagentVolume(reagent, type) 
                  ? `${calculateReagentVolume(reagent, type)} mL` 
                  : '-'}
              </span>
              <Info className="h-3 w-3 text-gray-500" />
            </div>
            <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 rounded-lg text-xs text-gray-300">
              Calculated volume based on sample weight and dosage
            </div>
          </div>
          <div>
            <button 
              className="btn btn-sm btn-ghost text-red-400"
              onClick={() => removeReagent(type, index)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="glass-card p-6">
      <h3 className="text-md font-semibold text-white mb-4">
        Stage {stageNumber}: {stageNumber === 1 ? 'Conditioning' : `Addition ${stageNumber}`}
      </h3>
      
      {renderReagentSection('phModifier', 'pH Modifier', commonReagents.phModifier)}
      {renderReagentSection('dispersant', 'Dispersant', commonReagents.dispersant)}
      {renderReagentSection('depressant', 'Depressant', commonReagents.depressant)}
      {renderReagentSection('collector', 'Collector', commonReagents.collector)}
      {renderReagentSection('frother', 'Frother', commonReagents.frother)}

      {/* Total Volumes Summary */}
      <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Stage Volumes Summary</h4>
        <div className="grid grid-cols-5 gap-4 text-xs">
          {Object.keys(commonReagents).map(type => {
            const totalVolume = (reagents[type] || [])
              .reduce((sum, reagent) => {
                const vol = calculateReagentVolume(reagent, type);
                return sum + (vol ? parseFloat(vol) : 0);
              }, 0);

            return (
              <div key={type}>
                <p className="text-gray-500 capitalize">{type}</p>
                <p className="text-primary font-medium">
                  {totalVolume > 0 ? `${totalVolume.toFixed(2)} mL` : '-'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReagentStage;