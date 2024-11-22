import React, { useState ,useEffect} from "react";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
import { ResultComponent } from "../../General/ResultComponent";
import { InputWithLabel } from "../../General/InputWithLabel";
import { CalculatorHeader } from "../../General/CalculatorHeader";
import { HydroSpotCheck } from "../../../util/HydrocycloneSpotChecks";
const HydrocycloneSpotChecks = ({ onBack }) => {
	const [activeVolFlow, setActiveVolFlow] = useState("feed");
	const [inputs, setInputs] = useState({
		oreDensity: "2.65",
		feedVolRate: "150",
		underVolRate: "0",
		overVolRate: "0",
		feedDensity: "1.35",
		overflowDensity: "1.15",
		underflowDensity: "1.65",
	});

	const [results, setResults] = useState({
		split: null,
		FDMS: null,
		UFMS: null,
		OFMS: null,
		FPS: null,
		UFPS: null,
		OFPS: null,
		UFQP: null,
		OFQP: null,
		FQP: null,
	});

    useEffect(() => {
        const calculator = new HydroSpotCheck(
            2.65,
            parseFloat(inputs.feedVolRate),
            parseFloat(inputs.feedDensity),
            parseFloat(inputs.overflowDensity),
            parseFloat(inputs.underflowDensity),
            'feed'
        );
        setResults(calculator.Results());
    }, []);  // Empty dependency array means this runs once on mount

	const handleInputChange = (field, value, id) => {
        const newInputs = {
            ...inputs,
            [field]: value,
        };

        let volRateVariable = 'feed'; // default
        let volRate = parseFloat(newInputs.feedVolRate);

        if (id && id.includes('volflow')) {
            volRateVariable = id.split('-')[0];
            setActiveVolFlow(volRateVariable);

            // Set the correct volume rate based on which input changed
            switch(volRateVariable) {
                case 'feed':
                    volRate = parseFloat(newInputs.feedVolRate);
                    break;
                case 'underflow':
                    volRate = parseFloat(newInputs.underVolRate);
                    break;
                case 'overflow':
                    volRate = parseFloat(newInputs.overVolRate);
                    break;
            }
        }

        const calculator = new HydroSpotCheck(
            2.65,
            volRate,
            parseFloat(newInputs.feedDensity),
            parseFloat(newInputs.overflowDensity),
            parseFloat(newInputs.underflowDensity),
            volRateVariable
        );

        setResults(calculator.Results());
        setInputs(newInputs);
    };


	return (
		<div className='min-h-screen bg-secondary p-6'>
			<div className='max-w-4xl mx-auto'>
				{/* Calculator Header */}

				<CalculatorHeader
					icon={Calculator}
					title='Hydrocylone Spot Check'
					description='Perform mass balance around hydrocyclone doing dilution ratios'
					actions={[
						{
							label: "Back",
							onClick: onBack,
							className: "", // Add custom styles if needed
						},
						{
							label: "Save",
							icon: Save,
							onClick: onBack,
						},
						{
							label: "Guide",
							icon: FileText,
							onClick: onBack,
						},
					]}
				/>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-3'>
					{/* Input Section */}
					<div className='space-y-6'>
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Cyclone Feed
							</h2>
							<InputWithLabel
								label={
									<>
										Slurry SG (t/m<sup>3</sup>)
									</>
								}
								value={inputs.feedDensity}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='feedDensity'
								type='number'
								className='mb-3'
								step={0.1}
							/>
							<InputWithLabel
								label={
									<>
										Volumetric Rate (m<sup>3</sup>/hr)
									</>
								}
								value={
									activeVolFlow === "feed" ? inputs.feedVolRate : results.FQP
								}
								onChange={handleInputChange}
								placeholder='Enter Vol Rate...'
								name='feedVolRate'
								id='feed-volflow'
								type='number'
								className='mb-3'
							/>

							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.FDMS}
								className='mb-3'
							/>
							<ResultComponent
								labelText='Percent Solids (w/w)'
								value={results.FPS}
							/>
						</div>
					</div>
					{/* Results Section */}
					<div className='space-y-6'>
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Cyclone Underflow
							</h2>
							<InputWithLabel
								label={
									<>
										Slurry SG (t/m<sup>3</sup>)
									</>
								}
								value={inputs.underflowDensity}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='underflowDensity'
								type='number'
								className='mb-3'
								step={0.1}
							/>

							<InputWithLabel
								label={
									<>
										Volumetric Rate (m<sup>3</sup>/hr)
									</>
								}
								value={
									activeVolFlow === "underflow"
										? inputs.underVolRate
										: results.UFQP
								}
								onChange={handleInputChange}
								placeholder='Enter Vol Rate...'
								name='underVolRate'
								id='underflow-volflow'
								type='number'
								className='mb-3'
							/>
							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.UFMS}
								className='mb-3'
							/>
							<ResultComponent
								labelText='Percent Solids (w/w)'
								value={results.UFPS}
							/>
						</div>
					</div>
					<div className='space-y-6'>
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Cyclone Overflow
							</h2>
							<InputWithLabel
								label={
									<>
										Slurry SG (t/m<sup>3</sup>)
									</>
								}
								value={inputs.overflowDensity}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='overflowDensity'
								type='number'
								className='mb-3'
								step={0.1}
							/>
							<InputWithLabel
								label={
									<>
										Volumetric Rate (m<sup>3</sup>/hr)
									</>
								}
								value={
									activeVolFlow === "overflow"
										? inputs.overVolRate
										: results.OFQP
								}
								onChange={handleInputChange}
								placeholder='Enter Vol Rate...'
								name='overVolRate'
								id='overflow-volflow'
								type='number'
								className='mb-3'
							/>
							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.OFMS}
								className='mb-3'
							/>
							<ResultComponent
								labelText='Percent Solids (w/w)'
								value={results.OFPS}
							/>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='glass-card p-6'></div>
				</div>

				{/* Formula Explanation */}
				<div className='glass-card mt-6'>
					<div className='p-6'>
						<h2 className='text-lg font-semibold text-white mb-4'>
							About Two Product Formula
						</h2>
						<div className='text-gray-400 space-y-3'>
							<p>
								The two-product formula is used in mineral processing to
								calculate the performance of a separation process with one feed
								stream splitting into two product streams (concentrate and
								tailings). It's the foundation for understanding more complex
								separation calculations.
							</p>

							<p className='font-medium text-gray-300 mt-4'>When to Use:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Single mineral recovery processes (e.g., copper-only
									flotation)
								</li>
								<li>Basic gravity separation operations</li>
								<li>
									When calculating recoveries without direct weight measurements
								</li>
								<li>Preliminary plant performance evaluations</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Key Limitations:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Less sensitive to sampling errors than three-product formula
								</li>
								<li>Assumes perfect mixing and steady-state operation</li>
								<li>Does not account for internal recycling streams</li>
								<li>May not capture complex mineralogical interactions</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Best Practices:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>Ensure representative sampling of all streams</li>
								<li>Use proper sample preparation techniques</li>
								<li>Verify results against actual weights when possible</li>
								<li>
									Consider using online analyzers for real-time monitoring
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Variables:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>F = Feed Grade</li>
								<li>C = Concentrate Grade</li>
								<li>T = Tailings Grade</li>
							</ul>

							<p className='mt-4'>
								Remember: This formula is robust and reliable for basic
								separations. If results seem incorrect, first check sampling
								procedures and ensure steady-state operation before questioning
								the calculations.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HydrocycloneSpotChecks;
