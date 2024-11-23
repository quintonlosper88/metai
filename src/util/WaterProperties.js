export class WaterProperties {
    constructor(temp) {
        this.temp = temp; // Temperature in Celsius
    }

    // Density calculation (in g/cm³)
    calcDensity() {
        const c0 = 999.83952;
        const c1 = 16.945176;
        const c2 = -7.9870401e-3;
        const c3 = -46.170461e-6;
        const c4 = 105.56302e-9;
        const c5 = -280.54253e-12;

        const density = c0
            + c1 * this.temp
            + c2 * Math.pow(this.temp, 2)
            + c3 * Math.pow(this.temp, 3)
            + c4 * Math.pow(this.temp, 4)
            + c5 * Math.pow(this.temp, 5);

        return density / 1000; // Convert kg/m³ to g/cm³
    }

    // Viscosity calculation (in Pa·s)
    calcViscosity() {
        const A = 2.414e-5; // Coefficients for empirical formula
        const B = 247.8;
        const C = 140;
        const T = this.temp + 273.15; // Convert Celsius to Kelvin

        const viscosity = A * Math.pow(10, B / (T - C));
        return viscosity; // Return viscosity in Pa·s
    }

    // Specific heat capacity (in kJ/kg·K)
    calcSpecificHeatCapacity() {
        return 4.18; // Approximate specific heat capacity of water at 25°C
    }

    // Vapor pressure calculation (in mmHg)
    calcVaporPressure() {
        const A = 8.07131; // Antoine equation coefficients
        const B = 1730.63;
        const C = 233.426;

        const vaporPressure = Math.pow(10, A - (B / (this.temp + C)));
        return vaporPressure; // Return vapor pressure in mmHg
    }

    // Thermal conductivity calculation (in W/m·K)
    calcThermalConductivity() {
        const k25 = 0.606; // Thermal conductivity at 25°C
        const tempEffect = (this.temp - 25) * -0.0015; // Approximation for change with temperature
        return k25 + tempEffect; // Adjusted thermal conductivity
    }

    // Speed of sound calculation (in m/s)
    calcSpeedOfSound() {
        const bulkModulus = 2.2e9; // Bulk modulus of water in Pa
        const density = this.calcDensity() * 1000; // Convert g/cm³ to kg/m³
        const speedOfSound = Math.sqrt(bulkModulus / density);
        return speedOfSound; // Return speed of sound in m/s
    }
}

// Example usage
const water = new WaterProperties(25);
console.log(`Density at 25°C: ${water.calcDensity().toFixed(5)} g/cm³`);
console.log(`Viscosity at 25°C: ${water.calcViscosity().toExponential(5)} Pa·s`);
console.log(`Specific Heat Capacity: ${water.calcSpecificHeatCapacity()} kJ/kg·K`);
console.log(`Vapor Pressure at 25°C: ${water.calcVaporPressure().toFixed(2)} mmHg`);
console.log(`Thermal Conductivity at 25°C: ${water.calcThermalConductivity().toFixed(3)} W/m·K`);
console.log(`Speed of Sound at 25°C: ${water.calcSpeedOfSound().toFixed(2)} m/s`);
