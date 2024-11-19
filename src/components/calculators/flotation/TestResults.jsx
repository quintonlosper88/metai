import React, { useState } from 'react';
import { 
  FileText, 
  Scale, 
  Flask, 
  Save,
  Download,
  AlertTriangle
} from 'lucide-react';
import InitialResults from './results/InitialResults';
import MassResults from './results/MassResults';
import AssayResults from './results/AssayResults';

const TestResults = ({ setupData, onClose }) => {
  const [activeTab, setActiveTab] = useState('initial');
  const [testData, setTestData] = useState({
    initial: {
      completionTime: new Date(),
      notes: '',
      status: 'pending'
    },
    masses: {
      concentrate: '',
      tailings: '',
      status: 'pending'
    },
    assays: {
      concentrate: {},
      tailings: {},
      status: 'pending'
    }
  });

  const updateTestData = (section, data) => {
    setTestData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const tabs = [
    { id: 'initial', label: 'Initial Results', icon: FileText },
    { id: 'masses', label: 'Mass Recording', icon: Scale },
    { id: 'assays', label: 'Assay Results', icon: Flask }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'initial':
        return (
          <InitialResults
            data={testData.initial}
            setupData={setupData}
            onUpdate={(data) => updateTestData('initial', data)}
          />
        );
      case 'masses':
        return (
          <MassResults
            data={testData.masses}
            setupData={setupData}
            onUpdate={(data) => updateTestData('masses', data)}
          />
        );
      case 'assays':
        return (
          <AssayResults
            data={testData.assays}
            setupData={setupData}
            elements={setupData.elements}
            onUpdate={(data) => updateTestData('assays', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Test Results</h3>
          <div className="flex space-x-2">
            <button className="btn btn-sm btn-ghost">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button className="btn btn-sm btn-ghost">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button 
              className="btn btn-sm btn-ghost"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(testData).map(([key, data]) => (
            <div key={key} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400 capitalize">
                  {key} Status
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  data.status === 'complete' ? 'bg-success/20 text-success' :
                  data.status === 'pending' ? 'bg-warning/20 text-warning' :
                  'bg-gray-500/20 text-gray-500'
                }`}>
                  {data.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
};

export default TestResults;