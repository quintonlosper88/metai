import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { WaterProperties } from "../../../../util/WaterProperties.js";
import { CalculatorHeader } from "../../../General/CalculatorHeader";
import { Calculator, Info, Download, Save, FileText } from "lucide-react";
const WaterPropertiesUtils = {
	generateDataPoints(startTemp = 0, endTemp = 100, step = 5) {
		const data = [];
		for (let temp = startTemp; temp <= endTemp; temp += step) {
			const water = new WaterProperties(temp);
			data.push({
				temperature: temp,
				...water.getAllProperties(),
			});
		}
		return data;
	},

	formatValue(value, property) {
		switch (property) {
			case "density":
				return value.toFixed(5);
			case "viscosity":
				return value.toExponential(5);
			case "specificHeatCapacity":
				return value.toFixed(3);
			case "vaporPressure":
				return value.toFixed(2);
			case "thermalConductivity":
				return value.toFixed(3);
			case "speedOfSound":
				return value.toFixed(2);
			default:
				return value.toString();
		}
	},

	getUnits(property) {
		const units = {
			density: "g/cm³",
			viscosity: "Pa·s",
			specificHeatCapacity: "kJ/kg·K",
			vaporPressure: "mmHg",
			thermalConductivity: "W/m·K",
			speedOfSound: "m/s",
		};
		return units[property] || "";
	},
};

const WaterPropertiesVisualization = ({ onBack }) => {
	const [temperature, setTemperature] = useState(25);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const data = WaterPropertiesUtils.generateDataPoints();
		setChartData(data);
	}, []);

	const water = new WaterProperties(temperature);
	const currentProperties = water.getAllProperties();

	const properties = Object.entries(currentProperties).map(([key, value]) => ({
		name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
		value: WaterPropertiesUtils.formatValue(value, key),
		units: WaterPropertiesUtils.getUnits(key),
	}));

	return (
		<div className='min-h-screen bg-secondary p-6'>
			<div className='max-w-4xl mx-auto'>
				<CalculatorHeader
					icon={Calculator}
					title='Water Properties Calculator'
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

				<div className='glass-card p-6 mb-3'>
					<div className='mb-8'>
						<h2 className='text-2xl font-bold mb-4'>
							Water Properties Calculator
						</h2>
						<div className='mb-4'>
							<label className='block mb-2'>
								Temperature (°C): {temperature}°C
							</label>
							<input
								type='range'
								min='0'
								max='100'
								value={temperature}
								onChange={(e) => setTemperature(Number(e.target.value))}
								className='w-full'
							/>
						</div>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{properties.map((prop) => (
								<div
									key={prop.name}
									className='p-4 border rounded'
								>
									<h3 className='font-semibold'>{prop.name}</h3>
									<p>
										{prop.value} {prop.units}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='glass-card p-6 mb-3'>
					<div className='space-y-8'>
						<div className='h-96'>
							<h3 className='text-xl font-semibold mb-2'>
								Density vs Temperature
							</h3>
							<ResponsiveContainer>
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis
										dataKey='temperature'
										label={{ value: "Temperature (°C)", position: "bottom" }}
									/>
									<YAxis
										label={{
											value: "Density (g/cm³)",
											angle: -90,
											position: "left",
										}}
									/>
									<Tooltip />
									<Line
										type='monotone'
										dataKey='density'
										stroke='#8884d8'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>

						<div className='h-96'>
							<h3 className='text-xl font-semibold mb-2'>
								Viscosity vs Temperature
							</h3>
							<ResponsiveContainer>
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis
										dataKey='temperature'
										label={{ value: "Temperature (°C)", position: "bottom" }}
									/>
									<YAxis
										label={{
											value: "Viscosity (Pa·s)",
											angle: -90,
											position: "left",
										}}
									/>
									<Tooltip />
									<Line
										type='monotone'
										dataKey='viscosity'
										stroke='#82ca9d'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>

						<div className='h-96'>
							<h3 className='text-xl font-semibold mb-2'>
								Vapor Pressure vs Temperature
							</h3>
							<ResponsiveContainer>
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis
										dataKey='temperature'
										label={{ value: "Temperature (°C)", position: "bottom" }}
									/>
									<YAxis
										label={{
											value: "Vapor Pressure (mmHg)",
											angle: -90,
											position: "left",
										}}
									/>
									<Tooltip />
									<Line
										type='monotone'
										dataKey='vaporPressure'
										stroke='#ffc658'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WaterPropertiesVisualization;
