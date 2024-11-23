import React, { useState, useEffect } from "react";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
import { ResultComponent } from "../../General/ResultComponent";
import { InputWithLabel } from "../../General/InputWithLabel";
import { CalculatorHeader } from "../../General/CalculatorHeader";
import { HydroSpotCheck } from "../../../util/HydrocycloneSpotChecks";
import { PropertySelect } from "../../General/PropertySelect";
const HydrocycloneSpotChecks = ({ onBack }) => {
	const [activeVolFlow, setActiveVolFlow] = useState("feed");
	const [assayAvaialble, setAssayAvaialble] = useState(false);
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
		Split: null,
		FDMS: null,
		UFMS: null,
		OFMS: null,
		FPS: null,
		UFPS: null,
		OFPS: null,
		UFQP: null,
		OFQP: null,
		FQP: null,
		VSplit: null,
	});

	useEffect(() => {
		const calculator = new HydroSpotCheck(
			parseFloat(inputs.oreDensity),
			parseFloat(inputs.feedVolRate),
			parseFloat(inputs.feedDensity),
			parseFloat(inputs.overflowDensity),
			parseFloat(inputs.underflowDensity),
			"feed"
		);
		setResults(calculator.Results());
	}, []); // Empty dependency array means this runs once on mount

	const handleInputChange = (field, value, id) => {
		const newInputs = {
			...inputs,
			[field]: value,
		};
		let volRateVariable = "feed"; // default
		let volRate = parseFloat(newInputs.feedVolRate);

		if (id && id.includes("volflow")) {
			volRateVariable = id.split("-")[0];
			setActiveVolFlow(volRateVariable);

			// Set the correct volume rate based on which input changed
			switch (volRateVariable) {
				case "feed":
					volRate = parseFloat(newInputs.feedVolRate);
					break;
				case "underflow":
					volRate = parseFloat(newInputs.underVolRate);
					break;
				case "overflow":
					volRate = parseFloat(newInputs.overVolRate);
					break;
			}
		}

		const calculator = new HydroSpotCheck(
			parseFloat(inputs.oreDensity),
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

				<div className='space-y-6 mb-3'>
					<div className='glass-card p-6'>
						{" "}
						<h2 className='text-lg font-semibold text-white mb-4'>
							Feed Properties
						</h2>
						<div className='grid grid-cols-3 gap-4'>
							<InputWithLabel
								label={
									<>
										Ore Density (t/m<sup>3</sup>)
									</>
								}
								value={inputs.oreDensity}
								onChange={handleInputChange}
								placeholder='Enter Ore Density...'
								name='oreDensity'
								type='number'
								className='mb-3'
								step={0.1}
							/>
						</div>
					</div>
				</div>

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
								className='mb-3'
							/>

							<ResultComponent
								labelText='Dilution Ratio'
								value={results.FDDL}
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
								className='mb-3'
							/>
							<ResultComponent
								labelText='Dilution Ratio'
								value={results.UFDL}
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
								className='mb-3'
							/>

							<ResultComponent
								labelText='Dilution Ratio'
								value={results.OFDL}
							/>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='glass-card p-6'>
						<h2 className='text-lg font-semibold text-white mb-4'>
							Hydrocyclone KPIs
						</h2>
						<div className='grid grid-cols-2 gap-4'>
							<ResultComponent
								labelText='Mass Split To Underflow (%)'
								value={
									results.Split > 100
										? `⚠ ${results.Split} (Cannot exceed 100% split to underflow - check densities!)`
										: results.Split
								}
							/>
							<ResultComponent
								labelText='Volume Split To Underflow (%)'
								value={
									results.Split > 100
										? `⚠ ${results.VSplit} (Cannot exceed 100% split to underflow - check densities!)`
										: results.VSplit
								}
							/>
						</div>
					</div>
				</div>

				{/* Formula Explanation */}
				<div className='glass-card mt-6'>
					<div className='p-6'>
						<h2 className='text-lg font-semibold text-white mb-4'>
							Using Dilution Ratios for Hydrocyclone Mass Balances
						</h2>
						<div className='text-gray-400 space-y-3'>
							<p>
								Dilution ratios are a critical tool in mineral processing for
								understanding water and solids balances in slurry flows. In
								hydrocyclone applications, dilution ratios enable quick spot
								checks for material balance verification and process
								optimization.
							</p>

							<p className='font-medium text-gray-300 mt-4'>When to Use:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Hydrocyclone feed, overflow, and underflow mass balance
									calculations
								</li>
								<li>
									Spot checks for process performance and water balance
									consistency
								</li>
								<li>
									Estimating slurry compositions when flowrate or solids data is
									unavailable
								</li>
								<li>
									Optimizing cyclone performance to achieve desired cut sizes
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Key Limitations:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Assumes steady-state operation; transient conditions may lead
									to inaccuracies
								</li>
								<li>
									Requires accurate measurements of solids and water contents in
									feed and products
								</li>
								<li>
									Does not account for recirculating load in closed grinding
									circuits
								</li>
								<li>
									May not reflect actual results if sampling or measurement
									errors exist
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Best Practices:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Ensure accurate and representative sampling of feed, overflow,
									and underflow
								</li>
								<li>
									Use reliable measurement devices for solids concentration
									(e.g., densitometers)
								</li>
								<li>
									Cross-check dilution ratio calculations with actual flowrate
									and density data
								</li>
								<li>
									Incorporate water balance alongside solids balance for
									holistic process assessment
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Key Variables:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									<strong>w</strong> = Solids percentage in feed
								</li>
								<li>
									<strong>U</strong> = Solids percentage in underflow
								</li>
								<li>
									<strong>V</strong> = Solids percentage in overflow
								</li>
								<li>
									<strong>f</strong>, <strong>u</strong>, <strong>v</strong> =
									Dilution ratios for feed, underflow, and overflow respectively
								</li>
								<li>
									<strong>F</strong>, <strong>U</strong>, <strong>V</strong> =
									Volumetric flow rates of feed, underflow, and overflow
								</li>
							</ul>

							<p className='mt-4'>Example equations for dilution ratios:</p>
							<pre className='bg-gray-800 text-white p-4 rounded'>
								{`f = (100 - w) / w
        u = (100 - U) / U
        v = (100 - V) / V

        F * f = U * u + V * v`}
							</pre>

							<p className='mt-4'>
								Use these relationships to calculate missing variables or
								validate existing process data. Always double-check steady-state
								conditions and data reliability for accurate results.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HydrocycloneSpotChecks;
