import React from 'react';

const specializations = [
  'Mineral Processing',
  'Extractive Metallurgy',
  'Physical Metallurgy',
  'Process Engineering',
  'Quality Control',
  'Research & Development'
];

const ProfessionalInfo = ({ formData, updateFormData }) => {
  const toggleSpecialization = (spec) => {
    const current = formData.specializations || [];
    const updated = current.includes(spec)
      ? current.filter(s => s !== spec)
      : [...current, spec];
    updateFormData({ specializations: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Professional Details</h2>
        <p className="text-gray-400">Tell us about your professional background</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Job Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Senior Metallurgist"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateFormData({ company: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Company Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Years of Experience
          </label>
          <select
            value={formData.yearsOfExperience}
            onChange={(e) => updateFormData({ yearsOfExperience: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select experience</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Areas of Specialization
          </label>
          <div className="grid grid-cols-2 gap-2">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => toggleSpecialization(spec)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${formData.specializations?.includes(spec)
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-gray-400 hover:bg-secondary/70'}`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;