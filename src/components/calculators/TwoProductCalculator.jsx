import React, { useState } from "react";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
import { TwoProductFormula } from "../../util/TwoProductFormula";
import { ResultComponent } from "../General/ResultComponent";
import { InputWithLabel } from "../General/InputWithLabel";
import { CalculatorHeader } from "../General/CalculatorHeader";

const TwoProductCalculator = ({ onBack }) => {
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
				{/* <div className='glass-card mb-6'>
					<div className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<Calculator className='h-8 w-8 text-primary' />
								<div>
									<h1 className='text-xl font-bold text-white'>
										Two Product Formula Calculator
									</h1>
									<p className='text-gray-400'>
										Calculate recovery, upgrade ratio, and mass yield
									</p>
								</div>
							</div>
							<div className='flex space-x-2'>
								<button
									className='btn btn-ghost btn-sm'
									onClick={onBack}
								>
									Back
								</button>
								<button className='btn btn-ghost btn-sm'>
									<Save className='h-4 w-4 mr-2' />
									Save
								</button>
								<button className='btn btn-ghost btn-sm'>
									<FileText className='h-4 w-4 mr-2' />
									Guide
								</button>
							</div>
						</div>
					</div>
				</div> */}

				<CalculatorHeader
					icon={Calculator}
					title='Two Product Formula Calculator'
					description='Calculate recovery, upgrade ratio, and mass yield'
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

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Input Section */}
					<div className='glass-card'>
						<div className='p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Input Parameters
							</h2>

							{/* Unit Selection */}
							<div className='mb-6'>
								<label className='block text-sm font-medium text-gray-400 mb-2'>
									Metal Unit
								</label>
								<select
									className='select select-bordered w-full bg-secondary text-white'
									value={inputs.metalUnit}
									onChange={(e) =>
										handleInputChange("metalUnit", e.target.value)
									}
								>
									<option value='g/t'>g/t</option>
									<option value='%'>%</option>
									<option value='ppm'>ppm</option>
								</select>
							</div>

							{/* Grade Inputs */}
							<div className='space-y-4'>
								<InputWithLabel
									label='Feed Tons'
									value={inputs.feedTons}
									onChange={handleInputChange}
									placeholder='Enter feed tons (t)'
									name='feedTons'
									type='number'
								/>

								<InputWithLabel
									label='Feed Grade'
									value={inputs.feedGrade}
									onChange={handleInputChange}
									placeholder={`Enter feed grade (${inputs.metalUnit})`}
									name='feedGrade'
									type='number'
								/>

								<InputWithLabel
									label='Concentrate Grade'
									value={inputs.concentrateGrade}
									onChange={handleInputChange}
									placeholder={`Enter concentrate grade (${inputs.metalUnit})`}
									name='concentrateGrade'
									type='number'
								/>

								<InputWithLabel
									label='Tailings Grade'
									value={inputs.tailingsGrade}
									onChange={handleInputChange}
									placeholder={`Enter tailings grade (${inputs.metalUnit})`}
									name='tailingsGrade'
									type='number'
								/>
							</div>
						</div>
					</div>

					{/* Results Section */}
					<div className='glass-card'>
						<div className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<h2 className='text-lg font-semibold text-white'>Results</h2>
								<button className='btn btn-ghost btn-sm'>
									<Download className='h-4 w-4 mr-2' />
									Export
								</button>
							</div>

							<div className='space-y-6'>
								{/* Recovery */}
								<ResultComponent
									labelText='Metal Recovery'
									value={results.recovery}
								/>

								{/* Upgrade Ratio */}
								<ResultComponent
									labelText='Upgrade Ratio'
									value={results.upgradeRatio}
								/>

								{/* Mass Yield */}
								<ResultComponent
									labelText='Mass Yield'
									value={results.massYield}
								/>

								{/* Conc Tons and Tails Tons */}
								<div className='flex space-x-4'>
									<ResultComponent
										labelText='Conc Tons'
										value={results.massBalance.conc}
									/>
									<ResultComponent
										labelText='Tails Tons'
										value={results.massBalance.tails}
									/>
								</div>

								{/* Formulas Used */}
								<div className='mt-6 p-4 border border-gray-700 rounded-lg bg-secondary/50'>
									<h3 className='text-sm font-medium text-gray-400 mb-2'>
										Formulas Used:
									</h3>
									<ul className='text-sm text-gray-400 space-y-2'>
										<li>Recovery = ((C-T)/(F-T)) × (F/C) × 100%</li>
										<li>Upgrade Ratio = C/F</li>
										<li>Mass Yield = ((F-T)/(C-T)) × 100%</li>
									</ul>
								</div>
							</div>
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

export default TwoProductCalculator;
