import React from 'react';

const BasicInfo = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
        <p className="text-gray-400">Start by providing your basic information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="••••••••"
          />
          <p className="mt-1 text-sm text-gray-400">
            Must be at least 8 characters long
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;