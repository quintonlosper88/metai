import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import BasicInfo from './signup/BasicInfo';
import ProfessionalInfo from './signup/ProfessionalInfo';
import ExperienceInfo from './signup/ExperienceInfo';
import Success from './signup/Success';

const SignupFlow = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    name: '',
    // Professional Info
    title: '',
    company: '',
    yearsOfExperience: '',
    specializations: [],
    // Experience
    processTypes: [],
    equipmentExperience: [],
    certifications: []
  });

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Professional Details' },
    { number: 3, title: 'Experience' },
    { number: 4, title: 'Complete' }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ProfessionalInfo formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ExperienceInfo formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Success onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-neutral w-full max-w-2xl rounded-xl shadow-xl">
        {/* Progress Steps */}
        <div className="border-b border-gray-800">
          <div className="px-6 py-4">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div className={`flex items-center ${i !== 0 ? 'ml-6' : ''}`}>
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                        ${step > s.number ? 'border-primary bg-primary text-white' : 
                          step === s.number ? 'border-primary text-primary' : 
                          'border-gray-600 text-gray-600'}`}
                    >
                      {step > s.number ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        s.number
                      )}
                    </div>
                    <span 
                      className={`ml-2 text-sm hidden sm:block
                        ${step >= s.number ? 'text-white' : 'text-gray-600'}`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div 
                      className={`hidden sm:block h-0.5 w-8 ml-4
                        ${step > s.number ? 'bg-primary' : 'bg-gray-600'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        {step < 4 && (
          <div className="border-t border-gray-800 px-6 py-4 flex justify-between">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`btn btn-outline gap-2 ${step === 1 ? 'invisible' : ''}`}
            >
              <ArrowLeft size={20} /> Back
            </button>
            <button
              onClick={() => step < 4 && setStep(step + 1)}
              className="btn btn-primary gap-2"
            >
              {step === 3 ? 'Complete' : 'Next'} <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupFlow;