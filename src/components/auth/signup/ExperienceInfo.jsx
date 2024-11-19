import React from 'react';

const processTypes = [
  'Crushing',
  'Grinding',
  'Flotation',
  'Leaching',
  'Gravity Separation',
  'Magnetic Separation',
  'Dewatering'
];

const equipmentTypes = [
  'Jaw Crushers',
  'Cone Crushers',
  'Ball Mills',
  'SAG Mills',
  'Flotation Cells',
  'Thickeners',
  'Filters'
];

const ExperienceInfo = ({ formData, updateFormData }) => {
  const toggleProcess = (process) => {
    const current = formData.processTypes || [];
    const updated = current.includes(process)
      ? current.filter(p => p !== process)
      : [...current, process];
    updateFormData({ processTypes: updated });
  };

  const toggleEquipment = (equipment) => {
    const current = formData.equipmentExperience || [];
    const updated = current.includes(equipment)
      ? current.filter(e => e !== equipment)
      : [...current, equipment];
    updateFormData({ equipmentExperience: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Experience Details</h2>
        <p className="text-gray-400">Select your areas of expertise</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Process Experience
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {processTypes.map((process) => (
              <button
                key={process}
                onClick={() => toggleProcess(process)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${formData.processTypes?.includes(process)
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-gray-400 hover:bg-secondary/70'}`}
              >
                {process}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Equipment Experience
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {equipmentTypes.map((equipment) => (
              <button
                key={equipment}
                onClick={() => toggleEquipment(equipment)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${formData.equipmentExperience?.includes(equipment)
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-gray-400 hover:bg-secondary/70'}`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Professional Certifications
          </label>
          <textarea
            value={formData.certifications}
            onChange={(e) => updateFormData({ certifications: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="List your relevant certifications..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceInfo;