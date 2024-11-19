import React, { useState, useEffect } from 'react';
import { 
  Scale,
  Thermometer,
  Beaker,
  ArrowRight,
  Info,
  ArrowLeft,
  Download,
  Save
} from 'lucide-react';

const SolidSGCalculator = ({ onBack }) => {
  const [waterTemp, setWaterTemp] = useState(25);
  const [waterDensity, setWaterDensity] = useState(0);
  const [measurements, setMeasurements] = useState({
    dryWeight: '',
    initialVolume: '',
    finalVolume: ''
  });

  // Kell's equation for water density
  const calculateWaterDensity = (tempC) => {
    const T = tempC + 273.15;
    const a1 = -3.983035;
    const a2 = 301.797;
    const a3 = 522528.9;
    const a4 = 69.34881;
    const a5 = 999.974950;
    
    const density = a5 * (1 - (T + a1) * (T - a2) * (T - a4) / (a3 * T));
    return density / 1000; // Convert to kg/L
  };

  useEffect(() => {
    setWaterDensity(calculateWaterDensity(waterTemp));
  }, [waterTemp]);

  const calculateResults = () => {
    if (!measurements.dryWeight || !measurements.initialVolume || !measurements.finalVolume) {
      return {
        sampleVolume: null,
        specificGravity: null,
        density: null
      };
    }

    const sampleVolume = Number(measurements.finalVolume) - Number(measurements.initialVolume);
    const specificGravity = Number(measurements.dryWeight) / sampleVolume;
    const density = specificGravity * waterDensity;

    return {
      sampleVolume,
      specificGravity,
      density
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Solid SG Calculator</h1>
                <p className="text-gray-400">Calculate specific gravity using displacement method</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={onBack}
                className="btn btn-ghost btn-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button className="btn btn-ghost btn-sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button className="btn btn-ghost btn-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Water Properties */}
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <Thermometer className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Water Properties</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Temperature (°C)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={waterTemp}
                onChange={(e) => setWaterTemp(Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg flex items-center">
              <div>
                <label className="text-sm font-medium text-gray-400">Water Density</label>
                <div className="text-xl font-bold text-primary">{waterDensity.toFixed(3)} kg/L</div>
              </div>
            </div>
          </div>
        </div>

        {/* Measurement Inputs */}
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <Beaker className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Displacement Measurements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Sample Weight (g)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={measurements.dryWeight}
                onChange={(e) => setMeasurements({...measurements, dryWeight: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Initial Volume (mL)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={measurements.initialVolume}
                onChange={(e) => setMeasurements({...measurements, initialVolume: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Final Volume (mL)
                <button className="ml-2 text-primary hover:text-primary/80">
                  <Info className="h-4 w-4" />
                </button>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={measurements.finalVolume}
                onChange={(e) => setMeasurements({...measurements, finalVolume: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Visual Guide */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Measurement Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center mb-2">
                <Scale className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium text-white">Step 1</h3>
              </div>
              <p className="text-sm text-gray-400">Weigh dry sample accurately</p>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center mb-2">
                <Beaker className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium text-white">Step 2</h3>
              </div>
              <p className="text-sm text-gray-400">Record initial water volume in graduated cylinder</p>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center mb-2">
                <ArrowRight className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium text-white">Step 3</h3>
              </div>
              <p className="text-sm text-gray-400">Add sample and record final volume</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Sample Volume</label>
              <div className="text-2xl font-bold text-primary">
                {results.sampleVolume ? `${results.sampleVolume.toFixed(1)} mL` : '-'}
              </div>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Specific Gravity</label>
              <div className="text-2xl font-bold text-primary">
                {results.specificGravity ? results.specificGravity.toFixed(2) : '-'}
              </div>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Density</label>
              <div className="text-2xl font-bold text-primary">
                {results.density ? `${results.density.toFixed(2)} g/cm³` : '-'}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-secondary/50">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Calculations:</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Sample Volume (VS) = Final Volume - Initial Volume</p>
              <p>Specific Gravity = Sample Mass / Sample Volume</p>
              <p>Density = Specific Gravity × Water Density</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolidSGCalculator;