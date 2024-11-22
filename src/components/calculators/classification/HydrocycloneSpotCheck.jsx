import React, { useState } from "react";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
import { ResultComponent } from "../../General/ResultComponent";
import { InputWithLabel } from "../../General/InputWithLabel";
import { CalculatorHeader } from "../../General/CalculatorHeader";

const HydrocycloneSpotChecks = ({ onBack }) => {
	const [inputs, setInputs] = useState({
		feedGrade: "",
		concentrateGrade: "",
		tailingsGrade: "",
		feedTons: "",
		metalUnit: "g/t",
	});

	const [results, setResults] = useState({
		recovery: null,
		upgradeRatio: null,
		massYield: null,
		massBalance: {
			conc: null,
			tails: null,
		},
	});

	const handleInputChange = (field, value) => {
		const newInputs = {
			...inputs,
			[field]: value,
		};

		// Convert input strings to numbers and validate
		const f = parseFloat(newInputs.feedGrade);
		const c = parseFloat(newInputs.concentrateGrade);
		const t = parseFloat(newInputs.tailingsGrade);
		const w = parseFloat(newInputs.feedTons);
		// Only calculate if we have valid numbers
		if (!isNaN(f) && !isNaN(c) && !isNaN(t)) {
			const calculator = new TwoProductFormula(f, c, t, w);
			console.log(calculator);
			setResults({
				recovery: calculator.calcRecovery(),
				upgradeRatio: calculator.calcUpgradeRatio(),
				massYield: calculator.calcMassYield(),
				massBalance: calculator.calcMassBalance(),
			});
		}

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

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
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
								value={inputs.product1Metal1}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='product1Metal1'
								type='number'
								className='mb-4'
							/>
							<InputWithLabel
								label={
									<>
										Volumetric Rate (m<sup>3</sup>/hr)
									</>
								}
								value={inputs.product1Metal1}
								onChange={handleInputChange}
								placeholder='Enter Vol Rate...'
								name='product1Metal1'
								type='number'
								className='mb-3'
							/>
							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.massBalance.conc}
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
								value={inputs.product1Metal1}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='product1Metal1'
								type='number'
								className='mb-3'
							/>

							<ResultComponent
								labelText={
									<>
										Vol Flow (m<sup>3</sup>/hr)
									</>
								}
								value={results.massBalance.conc}
								className='mb-3'
							/>
							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.massBalance.conc}
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
								value={inputs.product1Metal1}
								onChange={handleInputChange}
								placeholder='Enter Slurry SG...'
								name='product1Metal1'
								type='number'
								className='mb-3'
							/>
							<ResultComponent
								labelText={
									<>
										Vol Flow (m<sup>3</sup>/hr)
									</>
								}
								value={results.massBalance.conc}
								className='mb-3'
							/>
							<ResultComponent
								labelText='Solid Rate (t/hr)'
								value={results.massBalance.conc}
							/>
						</div>
					</div>
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
