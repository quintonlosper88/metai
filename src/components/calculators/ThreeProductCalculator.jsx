import React, { useState } from "react";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
import ProcessFlow from "./ProcessFlow";
import { ThreeProductFormula } from "../../util/ThreeProductFormula";
import { CalculatorHeader } from "../General/CalculatorHeader";
import { ResultComponent } from "../General/ResultComponent";
import { InputWithLabel } from "../General/InputWithLabel";
const ThreeProductCalculator = ({ onBack }) => {
	const [inputs, setInputs] = useState({
		feedTons: 100,
		feedMetal1: 1.29,
		feedMetal2: 4.32,
		product1Metal1: 26.9,
		product1Metal2: 9.25,
		product2Metal1: 1.1,
		product2Metal2: 57.7,
		tailsMetal1: 0.072,
		tailsMetal2: 0.342,
		metal1Unit: "%",
		metal2Unit: "%",
		metalOneSelected: "Cu",
		metalTwoSelected: "Zn",
	});

	const [results, setResults] = useState({
		productOneTons: null,
		productTwoTons: null,
		tailsTons: null,
		productOneRecovery: {
			metal_one: null,
			metal_two: null,
		},
		productOneUR: {
			metalOne: null,
			metalTwo: null,
		},
		productOneMY: null,
		productTwoRecovery: {
			metal_one: null,
			metal_two: null,
		},
		productTwoUR: {
			metalOne: null,
			metalTwo: null,
		},
		productTwoMY: null,
		intermediateTails: null,
		ITMetalOneGrade: null,
		ITMetalTwoGrade: null,
	});

	const handleInputChange = (field, value) => {
		const newInputs = {
			...inputs,
			[field]: value,
		};
		// Convert input strings to numbers and validate
		const f = parseFloat(newInputs.feedTons);
		const f1 = parseFloat(newInputs.feedMetal1);
		const f2 = parseFloat(newInputs.feedMetal2);
		const p1m1 = parseFloat(newInputs.product1Metal1);
		const p1m2 = parseFloat(newInputs.product1Metal2);
		const p2m1 = parseFloat(newInputs.product2Metal1);
		const p2m2 = parseFloat(newInputs.product2Metal2);
		const t1m1 = parseFloat(newInputs.tailsMetal1);
		const t1m2 = parseFloat(newInputs.tailsMetal2);

		if (
			!isNaN(f1) &&
			!isNaN(f2) &&
			!isNaN(p1m1) &&
			!isNaN(p1m2) &&
			!isNaN(p2m1) &&
			!isNaN(p2m2) &&
			!isNaN(t1m1) &&
			!isNaN(t1m2)
		) {
			const calculator = new ThreeProductFormula(
				f,
				f1,
				f2,
				p1m1,
				p1m2,
				p2m1,
				p2m2,
				t1m1,
				t1m2
			);
			console.log(calculator.Results());
			setResults({
				productOneTons: calculator.Results().productOneTons,
				productTwoTons: calculator.Results().productTwoTons,
				tailsTons: calculator.Results().tailsTons,
				productOneRecovery: calculator.Results().productOneRecovery,
				productOneUR: calculator.Results().productOneUR,
				productOneMY: calculator.Results().productOneMY,
				productTwoRecovery: calculator.Results().productTwoRecovery,
				productTwoUR: calculator.Results().productTwoUR,
				productTwoMY: calculator.Results().productTwoMY,
				intermediateTails: calculator.Results().intermediateTails,
				ITMetalOneGrade: calculator.Results().ITMetalOneGrade,
				ITMetalTwoGrade: calculator.Results().ITMetalTwoGrade,
			});
		}

		setInputs(newInputs);
	};

	return (
		<div className='min-h-screen bg-secondary p-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<CalculatorHeader
					icon={Calculator}
					title='Three Product Formula Calculator'
					description='Calculate recoveries, yields and upgrade ratios for dual metal separation'
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
					{/* Inputs Section */}
					<div className='space-y-6'>
						{/* Feed Inputs */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Metal Specification
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								{/* Metal 1 Selection */}
								<div className='mb-1'>
									<label className='block text-sm font-medium text-gray-400 mb-2'>
										Metal 1 Element
									</label>
									<select
										className='select select-bordered w-full bg-secondary text-white'
										value={inputs.metalOneSelected}
										onChange={(e) =>
											handleInputChange("metalOneSelected", e.target.value)
										}
									>
										<option value='Cu'>Cu</option>
										<option value='Zn'>Zn</option>
										<option value='Au'>Au</option>
									</select>
								</div>
								<div className='mb-1'>
									<label className='block text-sm font-medium text-gray-400 mb-2'>
										Metal 2 Element
									</label>
									<select
										className='select select-bordered w-full bg-secondary text-white'
										value={inputs.metalTwoSelected}
										onChange={(e) =>
											handleInputChange("metalTwoSelected", e.target.value)
										}
									>
										<option value='Zn'>Zn</option>
										<option value='Cu'>Cu</option>
										<option value='Au'>Au</option>
									</select>
								</div>
								<div className='mb-3'>
									<label className='block text-sm font-medium text-gray-400 mb-2'>
										Metal 1 Unit
									</label>
									<select
										className='select select-bordered w-full bg-secondary text-white'
										value={inputs.metal1Unit}
										onChange={(e) =>
											handleInputChange("metal1Unit", e.target.value)
										}
									>
										<option value='g/t'>g/t</option>
										<option value='%'>%</option>
										<option value='ppm'>ppm</option>
									</select>
								</div>
								<div className='mb-3'>
									<label className='block text-sm font-medium text-gray-400 mb-2'>
										Metal 2 Unit
									</label>
									<select
										className='select select-bordered w-full bg-secondary text-white'
										value={inputs.metal2Unit}
										onChange={(e) =>
											handleInputChange("metal2Unit", e.target.value)
										}
									>
										<option value='g/t'>g/t</option>
										<option value='%'>%</option>
										<option value='ppm'>ppm</option>
									</select>
								</div>
							</div>
						</div>
						{/* Feed Inputs */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Feed Parameters
							</h2>
							<div className='grid grid-cols-3 gap-4'>
								<InputWithLabel
									label='Feed Tons'
									value={inputs.feedTons}
									onChange={handleInputChange}
									placeholder='Enter feed tons (t)'
									name='feedTons'
									type='number'
								/>
								<InputWithLabel
									label={`${inputs.metalOneSelected} (${inputs.metal1Unit})`}
									value={inputs.feedMetal1}
									onChange={handleInputChange}
									placeholder='Metal 1 Grade'
									name='feedMetal1'
									type='number'
								/>
								<InputWithLabel
									label={`${inputs.metalTwoSelected} (${inputs.metal2Unit})`}
									value={inputs.feedMetal2}
									onChange={handleInputChange}
									placeholder='Metal 2 Grade'
									name='feedMetal2'
									type='number'
								/>
							</div>
						</div>

						{/* Product 1 Inputs */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Product 1 ({inputs.metalOneSelected} Concentrate)
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								<InputWithLabel
									label={`${inputs.metalOneSelected} (${inputs.metal1Unit})`}
									value={inputs.product1Metal1}
									onChange={handleInputChange}
									placeholder='Product 1 Grade'
									name='product1Metal1'
									type='number'
								/>
								<InputWithLabel
									label={`${inputs.metalTwoSelected} (${inputs.metal2Unit})`}
									value={inputs.product1Metal2}
									onChange={handleInputChange}
									placeholder='Product 1 Grade'
									name='product1Metal2'
									type='number'
								/>
							</div>
						</div>

						{/* Circuit 2 Calculated Feed / Intermediate Tails */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Intermediate Tails - {inputs.metalTwoSelected} Circuit Feed
							</h2>
							<div className='grid grid-cols-3 gap-4'>
								<div className='p-4 bg-secondary/50 rounded-lg'>
									<label className='text-sm font-medium text-gray-400'>
										{inputs.metalTwoSelected} Feed Tons
									</label>
									<div className='text-xl font-bold text-primary'>
										{results.intermediateTails
											? results.intermediateTails
											: "-"}
									</div>
								</div>
								<div className='p-4 bg-secondary/50 rounded-lg'>
									<label className='text-sm font-medium text-gray-400'>
										{inputs.metalOneSelected} {inputs.metal1Unit} Grade
									</label>
									<div className='text-xl font-bold text-primary'>
										{results.ITMetalOneGrade ? results.ITMetalOneGrade : "-"}
									</div>
								</div>
								<div className='p-4 bg-secondary/50 rounded-lg'>
									<label className='text-sm font-medium text-gray-400'>
										{inputs.metalTwoSelected} {inputs.metal2Unit} Grade
									</label>
									<div className='text-xl font-bold text-primary'>
										{results.ITMetalTwoGrade ? results.ITMetalTwoGrade : "-"}
									</div>
								</div>
							</div>
						</div>

						{/* Product 2 Inputs */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Product 2 ({inputs.metalTwoSelected} Concentrate)
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								<InputWithLabel
									label={`${inputs.metalOneSelected} (${inputs.metal1Unit})`}
									value={inputs.product2Metal1}
									onChange={handleInputChange}
									placeholder='Product 1 Grade'
									name='product2Metal1'
									type='number'
								/>
								<InputWithLabel
									label={`${inputs.metalTwoSelected} (${inputs.metal2Unit})`}
									value={inputs.product2Metal2}
									onChange={handleInputChange}
									placeholder='Product 1 Grade'
									name='product2Metal2'
									type='number'
								/>
							</div>
						</div>

						{/* Tails Inputs */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Final Tails
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								<InputWithLabel
									label={`${inputs.metalOneSelected} (${inputs.metal1Unit})`}
									value={inputs.tailsMetal1}
									onChange={handleInputChange}
									placeholder='Tails 1 Grade'
									name='tailsMetal1'
									type='number'
								/>
								<InputWithLabel
									label={`${inputs.metalTwoSelected} (${inputs.metal2Unit})`}
									value={inputs.tailsMetal2}
									onChange={handleInputChange}
									placeholder='Product 1 Grade'
									name='tailsMetal2'
									type='number'
								/>
							</div>
						</div>

						{/* Formulas Used */}
						<div className='glass-card p-6'>
							<div className='mt-6 p-4 border border-gray-700 rounded-lg bg-secondary/50'>
								<h3 className='text-sm font-medium text-gray-400 mb-2'>
									Formulas Used:
								</h3>
								<ul className='text-sm text-gray-400 space-y-2'>
									<li>
										C = F × [(c₁ - c₄)(z₃ - z₄) - (z₁ - z₄)(c₃ - c₄)] / [(c₂ -
										c₄)(z₃ - z₄) - (z₂ - z₄)(c₃ - c₄)]
									</li>
									<li>
										Z = F × [(c₁ - c₄)(z₂ - z₄) - (z₁ - z₄)(c₂ - c₄)] / [(c₂ -
										c₄)(z₃ - z₄) - (z₂ - z₄)(c₃ - c₄)]
									</li>
									<li>Recovery Cu = (C × c₂)/(F × c₁) × 100%</li>
									<li>Recovery Zn = (Z × z₃)/(F × z₁) × 100%</li>
									<li>Concentration Ratio Cu = F/C</li>
									<li>Concentration Ratio Zn = F/Z</li>
									<li>Upgrade Ratio Cu = c₂/c₁</li>
									<li>Upgrade Ratio Zn = z₃/z₁</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Results Section */}
					<div className='space-y-6'>
						{/* Process Diagram */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Process Flow
							</h2>
							<div className='h-64'>
								<ProcessFlow />
							</div>
						</div>

						{/* Tonnage Results */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Mass Distribution
							</h2>
							<div className='grid grid-cols-3 gap-4'>
								<ResultComponent
									labelText='Product 1'
									value={results.productOneTons}
								/>
								<ResultComponent
									labelText='Product 2'
									value={results.productTwoTons}
								/>
								<ResultComponent
									labelText='Tails'
									value={results.tailsTons}
								/>
							</div>
						</div>

						{/* Metal 1 Results */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								{inputs.metalOneSelected} Circuit Performance
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								{/*Circuit 1 Metal 1 Performance */}
								<ResultComponent
									labelText={`${inputs.metalOneSelected} Recovery`}
									value={results.productOneRecovery.metal_one}
								/>
								<ResultComponent
									labelText={`${inputs.metalOneSelected} Upgrade Ratio`}
									value={results.productOneUR.metalOne}
								/>

								{/*Circuit 1 Metal 2 Performance */}
								<ResultComponent
									labelText={`${inputs.metalTwoSelected} Recovery`}
									value={results.productOneRecovery.metal_two}
								/>
								<ResultComponent
									labelText={`${inputs.metalTwoSelected} Upgrade Ratio`}
									value={results.productOneUR.metalTwo}
								/>
								<ResultComponent
									labelText={`${inputs.metalOneSelected} Concentrate Mass Yield %`}
									value={results.productOneMY}
								/>
							</div>
						</div>

						{/* Product 2  Results */}
						<div className='glass-card p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								{inputs.metalTwoSelected} Circuit Performance
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								{/*Circuit 1 Metal 1 Performance */}
								<ResultComponent
									labelText={`${inputs.metalOneSelected} Recovery`}
									value={results.productTwoRecovery.metal_one}
								/>
								<ResultComponent
									labelText={`${inputs.metalOneSelected} Upgrade Ratio`}
									value={results.productTwoUR.metalOne}
								/>

								{/*Circuit 1 Metal 2 Performance */}
								<ResultComponent
									labelText={`${inputs.metalTwoSelected} Recovery`}
									value={results.productTwoRecovery.metal_two}
								/>
								<ResultComponent
									labelText={`${inputs.metalTwoSelected} Upgrade Ratio`}
									value={results.productTwoUR.metalTwo}
								/>
								<ResultComponent
									labelText={`${inputs.metalTwoSelected} Concentrate Mass Yield %`}
									value={results.productTwoMY}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* About formula */}
				<div className='glass-card mt-6'>
					<div className='p-6'>
						<h2 className='text-lg font-semibold text-white mb-4'>
							About Three Product Formula
						</h2>
						<div className='text-gray-400 space-y-3'>
							<p>
								The three-product formula is used in complex mineral processing
								operations where one feed stream produces two separate
								concentrates (each enriched in different metals) plus a final
								tailing. Common applications include Cu-Zn, Pb-Zn, and Cu-Mo
								separations.
							</p>

							<p className='font-medium text-gray-300 mt-4'>When to Use:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>Processing complex ores requiring multiple concentrates</li>
								<li>
									Sequential flotation circuits (e.g., Cu followed by Zn
									flotation)
								</li>
								<li>
									When mass balance calculations are needed without direct
									weight measurements
								</li>
								<li>Evaluating plant performance using only assay data</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Key Limitations:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									More sensitive to sampling and assaying errors than
									two-product formula
								</li>
								<li>
									Less accurate for products with low weight and low assay
									values
								</li>
								<li>Requires accurate sampling of all streams</li>
								<li>Assumes steady-state operation</li>
								<li>
									Does not account for circulating loads or internal recycling
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Best Practices:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>
									Take intermediate samples between separation stages when
									possible
								</li>
								<li>Use automated sampling and analysis when available</li>
								<li>Cross-verify results with actual weights when possible</li>
								<li>
									Consider using flowmeters and density gauges for additional
									validation
								</li>
							</ul>

							<p className='font-medium text-gray-300 mt-4'>Variables:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>F = Feed Weight</li>
								<li>C = First Concentrate Weight (e.g., Cu)</li>
								<li>Z = Second Concentrate Weight (e.g., Zn)</li>
								<li>T = Final Tailings Weight</li>
								<li>
									c₁, c₂, c₃, c₄ = Primary metal grades in F, C, Z, T
									respectively
								</li>
								<li>
									z₁, z₂, z₃, z₄ = Secondary metal grades in F, C, Z, T
									respectively
								</li>
							</ul>

							<p className='mt-4'>
								Remember: The formula is based on fundamental mass balance
								principles. If results don't align with expectations, check for
								sampling errors, spillage, tank holdups, or non-steady state
								operation before questioning the formula itself.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThreeProductCalculator;
