import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  Thermometer,
  Scale,
  FlaskConical,
  Info,
  Download,
  Save,
  ArrowLeft
} from 'lucide-react';

const SlurryCalculator = ({ onBack }) => {
  const [waterTemp, setWaterTemp] = useState(25);
  const [waterDensity, setWaterDensity] = useState(0);
  const [inputMethod, setInputMethod] = useState('mass');
  const [inputs, setInputs] = useState({
    solidsSG: '',
    slurrySG: '',
    totalMass: '',
    totalVolume: ''
  });

  const [results, setResults] = useState({
    solidsWW: null,
    solidsVV: null,
    waterWeight: null,
    solidsWeight: null,
    solidsVolume: null,
    waterVolume: null,
    slurryDensity: null,
    pulpDensity: null
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

  const calculateResults = () => {
    const { solidsSG, slurrySG } = inputs;
    const totalAmount = inputMethod === 'mass' ? inputs.totalMass : inputs.totalVolume;

    if (!solidsSG || !slurrySG || !totalAmount) return;

    const Ss = parseFloat(solidsSG);
    const Sp = parseFloat(slurrySG);
    const Sw = waterDensity;

    // Calculate % solids by weight
    const solidsWW = ((Sp - Sw) * Ss * 100) / ((Ss - Sw) * Sp);

    // Calculate % solids by volume
    const solidsVV = (solidsWW * Sw) / (solidsWW * Sw + (100 - solidsWW) * Ss);

    let totalMass, totalVolume;
    if (inputMethod === 'mass') {
      totalMass = parseFloat(totalAmount);
      totalVolume = totalMass / Sp;
    } else {
      totalVolume = parseFloat(totalAmount);
      totalMass = totalVolume * Sp;
    }

    const solidsWeight = (totalMass * solidsWW) / 100;
    const waterWeight = totalMass - solidsWeight;
    const solidsVolume = solidsWeight / Ss;
    const waterVolume = waterWeight / Sw;

    setResults({
      solidsWW: solidsWW.toFixed(1),
      solidsVV: (solidsVV * 100).toFixed(1),
      waterWeight: waterWeight.toFixed(1),
      solidsWeight: solidsWeight.toFixed(1),
      solidsVolume: solidsVolume.toFixed(1),
      waterVolume: waterVolume.toFixed(1),
      slurryDensity: Sp.toFixed(2),
      pulpDensity: (Sp * 1000).toFixed(0)
    });
  };

  useEffect(() => {
    setWaterDensity(calculateWaterDensity(waterTemp));
  }, [waterTemp]);

  useEffect(() => {
    calculateResults();
  }, [inputs, waterDensity, inputMethod]);

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FlaskConical className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Slurry Properties Calculator</h1>
                <p className="text-gray-400">Calculate pulp density with temperature compensation</p>
              </div>
            </div>
            <button 
              onClick={onBack}
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
        </div>

        {/* Water Density Calculator */}
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
                max="150"
              />
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg flex items-center">
              <div>
                <label className="text-sm font-medium text-gray-400">Water Density</label>
                <div className="text-xl font-bold text-primary">{waterDensity.toFixed(3)} kg/L</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>Using Kell's equation (1975) for temperature-compensated water density</p>
          </div>
        </div>

        {/* Solids and Slurry Properties */}
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <Scale className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Slurry Properties</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Solids Specific Gravity
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-secondary text-white"
                value={inputs.solidsSG}
                onChange={(e) => setInputs({...inputs, solidsSG: e.target.value})}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-400">Input Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className={`p-4 rounded-lg transition-colors ${
                    inputMethod === 'mass' 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary text-gray-400 hover:bg-secondary/70'
                  }`}
                  onClick={() => setInputMethod('mass')}
                >
                  Mass Based
                </button>
                <button 
                  className={`p-4 rounded-lg transition-colors ${
                    inputMethod === 'volume' 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary text-gray-400 hover:bg-secondary/70'
                  }`}
                  onClick={() => setInputMethod('volume')}
                >
                  Volume Based
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Slurry SG (Marcy)
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-secondary text-white"
                  value={inputs.slurrySG}
                  onChange={(e) => setInputs({...inputs, slurrySG: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {inputMethod === 'mass' ? 'Total Mass (kg)' : 'Total Volume (L)'}
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-secondary text-white"
                  value={inputMethod === 'mass' ? inputs.totalMass : inputs.totalVolume}
                  onChange={(e) => {
                    if (inputMethod === 'mass') {
                      setInputs({...inputs, totalMass: e.target.value});
                    } else {
                      setInputs({...inputs, totalVolume: e.target.value});
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Results</h2>
            <button className="btn btn-ghost btn-sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">% Solids (w/w)</label>
              <div className="text-2xl font-bold text-primary">
                {results.solidsWW ? `${results.solidsWW}%` : '-'}
              </div>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">% Solids (v/v)</label>
              <div className="text-2xl font-bold text-primary">
                {results.solidsVV ? `${results.solidsVV}%` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Water Weight</label>
              <div className="text-2xl font-bold text-primary">
                {results.waterWeight ? `${results.waterWeight} kg` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Dry Solids Weight</label>
              <div className="text-2xl font-bold text-primary">
                {results.solidsWeight ? `${results.solidsWeight} kg` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Solids Volume</label>
              <div className="text-2xl font-bold text-primary">
                {results.solidsVolume ? `${results.solidsVolume} L` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Water Volume</label>
              <div className="text-2xl font-bold text-primary">
                {results.waterVolume ? `${results.waterVolume} L` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Slurry Density</label>
              <div className="text-2xl font-bold text-primary">
                {results.slurryDensity ? `${results.slurryDensity} kg/L` : '-'}
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <label className="text-sm font-medium text-gray-400">Pulp Density</label>
              <div className="text-2xl font-bold text-primary">
                {results.pulpDensity ? `${results.pulpDensity} g/L` : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlurryCalculator;