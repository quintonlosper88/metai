import React, { useState } from 'react';
import { Plus, X, Thermometer } from 'lucide-react';

const ElementsSetup = ({ elements, onElementsChange }) => {
  const availableElements = {
    metals: ['Cu', 'Au', 'Ag', 'Pb', 'Zn', 'Mo', 'Fe', 'Ni', 'Co'],
    minerals: ['Chalcopyrite', 'Pyrite', 'Galena', 'Sphalerite', 'Chalcocite'],
    penalty: ['As', 'Sb', 'Bi', 'Hg', 'F']
  };

  const unitOptions = [
    { value: 'percent', label: '%' },
    { value: 'gpt', label: 'g/t' },
    { value: 'ppm', label: 'ppm' },
    { value: 'ppb', label: 'ppb' }
  ];

  const addElement = (category) => {
    const newElement = {
      symbol: '',
      unit: unitOptions[0].value
    };
    
    onElementsChange({
      ...elements,
      [category]: [...elements[category], newElement]
    });
  };

  const removeElement = (category, index) => {
    const updatedElements = {
      ...elements,
      [category]: elements[category].filter((_, i) => i !== index)
    };
    onElementsChange(updatedElements);
  };

  const updateElement = (category, index, field, value) => {
    const updatedElements = {
      ...elements,
      [category]: elements[category].map((element, i) => 
        i === index ? { ...element, [field]: value } : element
      )
    };
    onElementsChange(updatedElements);
  };

  const isElementSelected = (symbol, category) => {
    return elements[category].some(el => el.symbol === symbol) ||
           Object.entries(elements)
             .filter(([key]) => key !== category)
             .some(([_, elems]) => elems.some(el => el.symbol === symbol));
  };

  const renderElementSection = (category, title, availableElementsList) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-gray-400">{title}</label>
        <button 
          className="btn btn-sm btn-ghost"
          onClick={() => addElement(category)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Element
        </button>
      </div>
      <div className="space-y-3">
        {elements[category].length === 0 ? (
          <div className="text-center p-4 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-500">No {category} elements added</p>
          </div>
        ) : (
          elements[category].map((element, index) => (
            <div key={index} className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
              <select 
                className="select select-sm bg-secondary flex-1"
                value={element.symbol}
                onChange={(e) => updateElement(category, index, 'symbol', e.target.value)}
              >
                <option value="">Select Element</option>
                {availableElementsList.map((el) => (
                  <option 
                    key={el} 
                    value={el}
                    disabled={element.symbol !== el && isElementSelected(el, category)}
                  >
                    {el}
                  </option>
                ))}
              </select>
              <select 
                className="select select-sm bg-secondary w-24"
                value={element.unit}
                onChange={(e) => updateElement(category, index, 'unit', e.target.value)}
              >
                {unitOptions.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <button 
                className="btn btn-sm btn-ghost text-red-400"
                onClick={() => removeElement(category, index)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const formatElementDisplay = (elements) => {
    return elements
      .filter(el => el.symbol)
      .map(el => `${el.symbol} (${unitOptions.find(u => u.value === el.unit)?.label})`)
      .join(', ') || 'None';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Thermometer className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-white">Elements for Analysis</h2>
        </div>
      </div>

      {renderElementSection('primary', 'Primary Elements', availableElements.metals)}
      {renderElementSection('secondary', 'Secondary Elements', [...availableElements.metals, ...availableElements.minerals])}
      {renderElementSection('penalty', 'Penalty Elements', availableElements.penalty)}

      {/* Summary Section */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Selected Elements Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Primary</p>
            <p className="text-white">{formatElementDisplay(elements.primary)}</p>
          </div>
          <div>
            <p className="text-gray-500">Secondary</p>
            <p className="text-white">{formatElementDisplay(elements.secondary)}</p>
          </div>
          <div>
            <p className="text-gray-500">Penalty</p>
            <p className="text-white">{formatElementDisplay(elements.penalty)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementsSetup;