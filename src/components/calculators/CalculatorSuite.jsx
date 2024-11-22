import React, { useState, useRef } from "react";
import {
	Calculator,
	ChevronRight,
	Search,
	History,
	Save,
	Settings,
	ArrowRight,
	ChevronLeft,
	Plus,
	Beaker,
	Filter,
	Droplet,
	Gauge,
	Scale,
	Magnet,
	Waves,
} from "lucide-react";
import TwoProductCalculator from "./TwoProductCalculator";
import ThreeProductCalculator from "./ThreeProductCalculator";
import ReagentCalculator from "./ReagentCalculator";
import PSDCalculator from "./PSDCalculator";
import SlurryCalculator from "./SlurryCalculator";
import SolidSGCalculator from "./SolidSGCalculator";
import BatchFlotationTest from "./BatchFlotationTest";
import HydrocycloneSpotChecks from "../calculators/classification/HydrocycloneSpotCheck"
const CalculatorSuite = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedCalculator, setSelectedCalculator] = useState(null);
	const scrollContainerRef = useRef(null);

	const categories = [
		// {
		//   id: 'crushing',
		//   name: 'Crushing & Grinding',
		//   description: 'Crusher and mill performance calculations',
		//   icon: Calculator,
		//   color: 'from-orange-500 to-red-500',
		//   calculators: [
		//     {
		//       id: 'crusher-capacity',
		//       name: 'Crusher Capacity',
		//       description: 'Calculate theoretical capacity of crushers',
		//     },
		//     {
		//       id: 'power-calc',
		//       name: 'Power Calculations',
		//       description: 'Bond crushing work index and power draw',
		//     },
		//     {
		//       id: 'reduction-ratio',
		//       name: 'Reduction Ratio',
		//       description: 'Calculate size reduction ratios',
		//     },
		//     {
		//       id: 'mill-capacity',
		//       name: 'Mill Capacity',
		//       description: 'Calculate mill throughput and efficiency',
		//     },
		//   ],
		// },
		{
			id: "flotation",
			name: "Flotation",
			description: "Flotation circuit optimization tools",
			icon: Beaker,
			color: "from-blue-500 to-cyan-500",
			calculators: [
				{
					id: "flotation-batch-test",
					name: "Flotation Batch Test",
					description: "Perform batch flotation (Single Stage) test.",
					component: BatchFlotationTest,
				},
				{
					id: "flotation-kinetic-test",
					name: "Flotation Kinetic Test",
					description:
						"Perform kinetic (timed) flotation test and fit kinetic parameters.",
				},
				{
					id: "hot-flotation-test",
					name: "Hot Flotation Kinetic Test",
					description:
						"Perform hot flotation test on tails to evaluate losses.",
				},
				{
					id: "reagent-dosage",
					name: "Reagent Dosage",
					description: "Optimize reagent addition rates",
				},
				{
					id: "cell-design",
					name: "Cell Design",
					description: "Flotation cell design parameters",
				},
			],
		},
		// {
		//   id: 'filtering',
		//   name: 'Filtering & Dewatering',
		//   description: 'Dewatering and filtration calculations',
		//   icon: Filter,
		//   color: 'from-green-500 to-emerald-500',
		//   calculators: [
		//     {
		//       id: 'filter-capacity',
		//       name: 'Filter Capacity',
		//       description: 'Calculate filter throughput',
		//     },
		//     {
		//       id: 'moisture-content',
		//       name: 'Moisture Content',
		//       description: 'Determine final moisture content',
		//     },
		//     {
		//       id: 'thickener-design',
		//       name: 'Thickener Design',
		//       description: 'Size thickeners and clarifiers',
		//     },
		//   ],
		// },
		// {
		//   id: 'leaching',
		//   name: 'Leaching',
		//   description: 'Hydrometallurgical process calculations',
		//   icon: Droplet,
		//   color: 'from-purple-500 to-pink-500',
		//   calculators: [
		//     {
		//       id: 'leach-kinetics',
		//       name: 'Leach Kinetics',
		//       description: 'Calculate leaching rate and recovery',
		//     },
		//     {
		//       id: 'reagent-consumption',
		//       name: 'Reagent Consumption',
		//       description: 'Optimize reagent usage',
		//     },
		//     {
		//       id: 'residence-time',
		//       name: 'Residence Time',
		//       description: 'Calculate optimal leach time',
		//     },
		//   ],
		// },
		// {
		//   id: 'gravity',
		//   name: 'Gravity Separation',
		//   description: 'Gravity concentration calculations',
		//   icon: Scale,
		//   color: 'from-yellow-500 to-amber-500',
		//   calculators: [
		//     {
		//       id: 'concentration-criteria',
		//       name: 'Concentration Criteria',
		//       description: 'Calculate separation efficiency',
		//     },
		//     {
		//       id: 'spiral-design',
		//       name: 'Spiral Design',
		//       description: 'Spiral concentrator parameters',
		//     },
		//     {
		//       id: 'jig-calculations',
		//       name: 'Jig Calculations',
		//       description: 'Jigging separation calculations',
		//     },
		//   ],
		// },
		{
			id: "Classification",
			name: "Size Classification",
			description: "Size classification calculations",
			icon: Scale,
			color: "from-yellow-500 to-amber-500",
			calculators: [
				{
					id: "hydrocyclone-spot-checks",
					name: "Hydrocyclone Spot Check",
					description: "Perform mass balance around hydrocyclone using dilution ratios.",
          component: HydrocycloneSpotChecks,
				},

			],
		},
		{
			id: "general",
			name: "General Calcs",
			description: "Generic Metallurgical Calculators",
			icon: Scale,
			color: "from-yellow-500 to-amber-500",
			calculators: [
				{
					id: "two-product-formula",
					name: "Two Product Formula",
					description: "Calculate recovery KPIs using single metal assays",
					component: TwoProductCalculator,
				},
				{
					id: "three-product-formula",
					name: "Three Product Formula",
					description: "Calculate recovery KPIs using multiple metal assays",
					component: ThreeProductCalculator,
				},
				{
					id: "reagent-calculator",
					name: "Reagent Calculator",
					description: "Calculations related to reagent strengths and dosages",
					component: ReagentCalculator,
				},
				{
					id: "particle-size-distribution",
					name: "Particle Size Distribution",
					description:
						"Calculate particle size distribution properties from sample data",
					component: PSDCalculator,
				},
				{
					id: "slurry-properties",
					name: "Slurry Property Calculator",
					description: "Calculate sample slurry properties.",
					component: SlurryCalculator,
				},
				{
					id: "solid-sg-calculator",
					name: "Solid SG Calculator",
					description: "Calculate sample solid SG using displacement method.",
					component: SolidSGCalculator,
				},
			],
		},
	];

	const scroll = (direction) => {
		if (scrollContainerRef.current) {
			const scrollAmount = 400;
			scrollContainerRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	const handleCalculatorSelect = (calculator) => {
		setSelectedCalculator(calculator);
	};

	if (selectedCalculator?.component) {
		const CalculatorComponent = selectedCalculator.component;
		return <CalculatorComponent onBack={() => setSelectedCalculator(null)} />;
	}

	return (
		<div className='min-h-screen bg-secondary'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Horizontal Scrollable Category Cards */}
				<div className='relative'>
					<button
						onClick={() => scroll("left")}
						className='absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 btn btn-circle btn-ghost bg-neutral/50 backdrop-blur-sm'
					>
						<ChevronLeft className='h-6 w-6' />
					</button>

					<div
						ref={scrollContainerRef}
						className='flex overflow-x-auto gap-6 pb-4 px-2 -mx-2 scroll-smooth hide-scrollbar'
					>
						{categories.map((category) => (
							<div
								key={category.id}
								className='flex-none w-80'
							>
								<button
									onClick={() => setSelectedCategory(category)}
									className='w-full relative group glass-card overflow-hidden hover:border-primary/50 transition-all duration-300'
								>
									<div className='p-6'>
										<category.icon className='h-12 w-12 text-primary mb-4' />
										<h3 className='text-lg font-bold text-white mb-2'>
											{category.name}
										</h3>
										<p className='text-gray-400 mb-4'>{category.description}</p>
										<div className='flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity'>
											<span className='text-sm'>View Calculators</span>
											<ArrowRight className='ml-2 h-4 w-4' />
										</div>
									</div>
								</button>
							</div>
						))}
					</div>

					<button
						onClick={() => scroll("right")}
						className='absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 btn btn-circle btn-ghost bg-neutral/50 backdrop-blur-sm'
					>
						<ChevronRight className='h-6 w-6' />
					</button>
				</div>

				{/* Selected Category Content */}
				{selectedCategory && (
					<div className='mt-8 glass-card'>
						<div className='px-6 py-4 border-b border-gray-800'>
							<h2 className='text-xl font-semibold text-white'>
								{selectedCategory.name} Calculators
							</h2>
							<p className='mt-1 text-sm text-gray-400'>
								{selectedCategory.description}
							</p>
						</div>
						<div className='p-6'>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
								{selectedCategory.calculators.map((calculator) => (
									<div
										key={calculator.id}
										onClick={() => handleCalculatorSelect(calculator)}
										className='glass-card hover:border-primary/50 cursor-pointer transition-colors duration-200'
									>
										<div className='p-4'>
											<div className='flex items-center space-x-3'>
												<div className='flex-shrink-0'>
													<Calculator className='h-6 w-6 text-primary' />
												</div>
												<div className='flex-1 min-w-0'>
													<h3 className='text-sm font-medium text-white'>
														{calculator.name}
													</h3>
													<p className='text-sm text-gray-400'>
														{calculator.description}
													</p>
												</div>
												<ChevronRight className='h-5 w-5 text-gray-500' />
											</div>
										</div>
									</div>
								))}
								<div className='glass-card border-dashed hover:border-primary/50 cursor-pointer transition-colors duration-200'>
									<div className='p-4'>
										<div className='flex items-center justify-center space-x-2 text-gray-400'>
											<Plus className='h-5 w-5' />
											<span>Request New Calculator</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Recent Calculations */}
				<div className='mt-8 glass-card'>
					<div className='px-6 py-4 border-b border-gray-800'>
						<h3 className='text-lg font-medium text-white'>
							Recent Calculations
						</h3>
					</div>
					<div className='divide-y divide-gray-800'>
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className='flex items-center justify-between p-4'
							>
								<div>
									<h4 className='text-sm font-medium text-white'>
										Crusher Capacity Calculation
									</h4>
									<p className='text-sm text-gray-400'>2 hours ago</p>
								</div>
								<button className='btn btn-outline btn-sm border-gray-700 hover:bg-primary hover:border-primary'>
									View Results
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalculatorSuite;
