import React, { useState } from 'react';
import { 
  Beaker, 
  ChevronRight,
  ArrowLeft 
} from 'lucide-react';
import ElementsSetup from './flotation/ElementsSetup';
import ReagentsSetup from './flotation/ReagentsSetup';
import ConditionsSetup from './flotation/ConditionsSetup';
import TestExecution from './flotation/TestExecution';

const BatchFlotationTest = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [showTestExecution, setShowTestExecution] = useState(false);
  const [setupData, setSetupData] = useState({
    cellSize: '',
    sampleState: 'dry',
    solidsSG: '',
    waterTemp: '',
    targetPulpDensity: '',
    dryWeight: '',
    slurrySG: '',
    slurryVolume: '',
    elements: {
      primary: [],
      secondary: [],
      penalty: []
    },
    reagents: {
      phModifier: [],
      dispersant: [],
      depressant: [],
      collector: [],
      frother: []
    },
    conditions: {
      impellerSpeed: '',
      airFlow: '',
      temperature: '',
      frothHeight: '',
      frothPullRate: '',
      frothTravelDistance: '',
      targetTemp: '',
      tempControl: 'none',
      roomTemp: '',
      humidity: '',
      waterAdditions: [],
      powerMonitoring: false,
      bubbleTracking: false,
      totalFlotationTime: ''
    }
  });

  const handleInputChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Cell Setup</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Cell Size/Volume (L)
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-secondary text-white"
                  value={setupData.cellSize}
                  onChange={(e) => handleInputChange('cellSize', e.target.value)}
                  placeholder="Enter cell volume in liters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Sample State
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      setupData.sampleState === 'dry'
                        ? 'border-primary text-primary'
                        : 'border-gray-700 text-gray-400'
                    }`}
                    onClick={() => handleInputChange('sampleState', 'dry')}
                  >
                    <Beaker className="h-5 w-5 mb-2 mx-auto" />
                    Dry Sample
                  </button>
                  <button
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      setupData.sampleState === 'slurry'
                        ? 'border-primary text-primary'
                        : 'border-gray-700 text-gray-400'
                    }`}
                    onClick={() => handleInputChange('sampleState', 'slurry')}
                  >
                    <Beaker className="h-5 w-5 mb-2 mx-auto" />
                    Slurry Sample
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {setupData.sampleState === 'dry' ? (
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Dry Sample Properties</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Solids SG
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.solidsSG}
                      onChange={(e) => handleInputChange('solidsSG', e.target.value)}
                      placeholder="Enter solids SG"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Water Temperature (°C)
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.waterTemp}
                      onChange={(e) => handleInputChange('waterTemp', e.target.value)}
                      placeholder="Enter temperature"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Target Pulp Density (%)
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.targetPulpDensity}
                      onChange={(e) => handleInputChange('targetPulpDensity', e.target.value)}
                      placeholder="Enter target % solids"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Sample Weight (g)
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.dryWeight}
                      onChange={(e) => handleInputChange('dryWeight', e.target.value)}
                      placeholder="Enter sample weight"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Slurry Properties</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Slurry SG
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.slurrySG}
                      onChange={(e) => handleInputChange('slurrySG', e.target.value)}
                      placeholder="Enter slurry SG"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Slurry Volume (L)
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-secondary text-white"
                      value={setupData.slurryVolume}
                      onChange={(e) => handleInputChange('slurryVolume', e.target.value)}
                      placeholder="Enter slurry volume"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <ElementsSetup 
            elements={setupData.elements}
            onElementsChange={(elements) => handleInputChange('elements', elements)}
          />
        );

      case 4:
        return (
          <ReagentsSetup 
            reagents={setupData.reagents}
            onReagentsChange={(reagents) => handleInputChange('reagents', reagents)}
            setupData={setupData}
          />
        );

      case 5:
        return (
          <ConditionsSetup 
            conditions={setupData.conditions}
            onConditionsChange={(conditions) => handleInputChange('conditions', conditions)}
            reagents={setupData.reagents}
          />
        );

      case 6:
        return (
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Start Test</h2>
            <p className="text-gray-400 mb-4">All parameters have been set. Click Start Test to begin the flotation test.</p>
            <div className="flex justify-center">
              <button 
                className="btn btn-primary"
                onClick={() => setShowTestExecution(true)}
              >
                Start Test
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Beaker className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-white">Batch Flotation Test Setup</h1>
                  <p className="text-gray-400">Configure and execute batch flotation test</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                <div className="text-gray-400">Step {activeStep} of 6</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Steps Navigation */}
          <div className="col-span-3">
            <div className="glass-card p-4">
              <nav className="space-y-1">
                {[
                  { num: 1, title: 'Cell Setup', icon: Beaker },
                  { num: 2, title: 'Sample Properties', icon: Beaker },
                  { num: 3, title: 'Elements', icon: Beaker },
                  { num: 4, title: 'Reagents', icon: Beaker },
                  { num: 5, title: 'Conditions', icon: Beaker },
                  { num: 6, title: 'Start Test', icon: Beaker }
                ].map((step) => (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeStep === step.num 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-400 hover:bg-primary/5'
                    }`}
                  >
                    <step.icon className="h-5 w-5 mr-3" />
                    <span>{step.title}</span>
                    {activeStep === step.num && (
                      <ChevronRight className="ml-auto h-5 w-5" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button 
                className="btn btn-outline"
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
              >
                Previous
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveStep(Math.min(6, activeStep + 1))}
              >
                {activeStep === 6 ? 'Start Test' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Execution Modal */}
      {showTestExecution && (
        <TestExecution
          conditions={setupData.conditions}
          reagents={setupData.reagents}
          onClose={() => setShowTestExecution(false)}
        />
      )}
    </div>
  );
};

export default BatchFlotationTest;