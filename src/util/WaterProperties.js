export class WaterProperties {
    constructor(temp) {
        this.temp = temp;
    }

    calcDensity() {
        const temperatureInCelsius = this.temp;
        const density =
            0.99984 +
            (6.7556e-5 * temperatureInCelsius) -
            (8.9889e-6 * Math.pow(temperatureInCelsius, 2)) +
            (7.6438e-8 * Math.pow(temperatureInCelsius, 3)) -
            (7.0726e-10 * Math.pow(temperatureInCelsius, 4));
        return density;
    }

    calcViscosity() {
        const A = 2.414e-5;
        const B = 247.8;
        const C = 140;
        const T = this.temp + 273.15;
        return A * Math.pow(10, B / (T - C));
    }

    calcSpecificHeatCapacity() {
        const T = this.temp;
        return 4.214 - (2.286e-3 * T) + (4.991e-5 * Math.pow(T, 2))
            - (4.519e-7 * Math.pow(T, 3));
    }

    calcVaporPressure() {
        const A = 8.07131;
        const B = 1730.63;
        const C = 233.426;
        return Math.pow(10, A - (B / (this.temp + C)));
    }

    calcThermalConductivity() {
        const k25 = 0.606;
        const tempEffect = (this.temp - 25) * -0.0015;
        return k25 + tempEffect;
    }

    calcSpeedOfSound() {
        const bulkModulus = 2.2e9;
        const density = this.calcDensity() * 1000;
        return Math.sqrt(bulkModulus / density);
    }

    getAllProperties() {
        return {
            density: this.calcDensity(),
            viscosity: this.calcViscosity(),
            specificHeatCapacity: this.calcSpecificHeatCapacity(),
            vaporPressure: this.calcVaporPressure(),
            thermalConductivity: this.calcThermalConductivity(),
            speedOfSound: this.calcSpeedOfSound()
        };
    }
}