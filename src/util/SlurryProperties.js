export class SlurryProperties {
    constructor(OreDensity = 2.80, measuredVariable = "PS", measuredValue = 62.20, extensiveVariable = "QP", extensiveValue = 1565.74) {
        this.OreDensity = OreDensity;
        this.measuredVariable = measuredVariable;
        this.measuredValue = measuredValue; // String value to show what property was supplied
        this.extensiveVariable = extensiveVariable; // String value to show if the stream is measured either by slurry volume (QP) or dry mass (MS)
        this.extensiveValue = extensiveValue;
    }

    calculateProperties() {
        // Return an object with RHOP, PSV, PS, and grlt instead of an array
        let result = {};

        if (this.measuredVariable === "RHOP") {
            result.PS = ((1 / this.measuredValue - 1) / (1 / this.OreDensity - 1) * 100).toFixed(2);
            result.PSV = ((result.PS / 100 / this.OreDensity) / (1 / this.measuredValue) * 100).toFixed(2);
            result.grlt = (1000 / (1 / this.OreDensity + (100 - result.PS) / result.PS)).toFixed(2);
            result.RHOP = this.measuredValue.toFixed(2);

        } else if (this.measuredVariable === "PSV") {
            result.PS = ((this.measuredValue / 100) / (1 / this.OreDensity + (this.measuredValue / 100) * (1 - 1 / this.OreDensity)) * 100).toFixed(2);
            result.RHOP = (1 / ((result.PS / 100) / this.OreDensity + (1 - result.PS / 100))).toFixed(2);
            result.grlt = (1000 / (1 / this.OreDensity + (100 - result.PS) / result.PS)).toFixed(2);
            result.PSV = this.measuredValue;

        } else if (this.measuredVariable === "PS") {
            result.PSV = ((this.measuredValue / 100 / this.OreDensity) / (this.measuredValue / 100 / this.OreDensity + (1 - this.measuredValue / 100)) * 100).toFixed(2);
            result.RHOP = (1 / ((this.measuredValue / 100) / this.OreDensity + (1 - this.measuredValue / 100))).toFixed(2);
            result.grlt = (1000 / (1 / this.OreDensity + (100 - this.measuredValue) / this.measuredValue)).toFixed(2);
            result.PS = this.measuredValue.toFixed(2);

        } else {
            result.PS = (100 * this.measuredValue / (1000 + this.measuredValue * (this.OreDensity - 1) / this.OreDensity)).toFixed(2);
            result.PSV = ((result.PS / 100 / this.OreDensity) / (result.PS / 100 / this.OreDensity + (1 - result.PS / 100)) * 100).toFixed(2);
            result.RHOP = (1 / ((result.PS / 100) / this.OreDensity + (1 - result.PS / 100))).toFixed(2);
            result.grlt = this.measuredValue.toFixed(2);
        }

        return result;
    }

    calculateExtensiveProperties() {
        let { RHOP, PS } = this.calculateProperties();
        let extensiveResult = {};

        if (this.extensiveVariable === "MS") {
            extensiveResult.MP = (this.extensiveValue / PS * 100).toFixed(2);
            extensiveResult.MW = (extensiveResult.MP - this.extensiveValue).toFixed(2);
            extensiveResult.QP = (this.extensiveValue / this.OreDensity + (extensiveResult.MP - this.extensiveValue)).toFixed(2);
            extensiveResult.MS = this.extensiveValue;

        } else if (this.extensiveVariable === "MP") {
            extensiveResult.QP = (this.extensiveValue/RHOP).toFixed(2);
            extensiveResult.MS = (PS * this.extensiveValue / 100).toFixed(2);
            extensiveResult.MP = this.extensiveValue;
            extensiveResult.MW = (this.extensiveValue - extensiveResult.MS).toFixed(2);

        }else if (this.extensiveVariable === "QP") {
            extensiveResult.MP = (this.extensiveValue*RHOP).toFixed(2);
            extensiveResult.MS = (PS * extensiveResult.MP / 100).toFixed(2);
            extensiveResult.MW = (extensiveResult.MP - extensiveResult.MS).toFixed(2);
            extensiveResult.QP = this.extensiveValue;
        }

        return extensiveResult;
    }
}

// Example usage
// const samplerRHOP = new SlurryProperties();
// console.log(samplerRHOP);
// console.log(samplerRHOP.calculateProperties());

// console.log(samplerRHOP.calculateExtensiveProperties());