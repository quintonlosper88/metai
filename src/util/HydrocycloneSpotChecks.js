

export class HydroSpotCheck {
	constructor(
		OreDensity,
		VolRate,
		feedDensity,
		overflowDensity,
		underflowDensity,
		volRateVariable = "feed"
	) {
		this.OreDensity = OreDensity;
		this.VolRate = VolRate;
		this.feedDensity = feedDensity;
		this.overflowDensity = overflowDensity;
		this.underflowDensity = underflowDensity;
		this.volRateVariable = volRateVariable; // 'feed', 'underflow', or 'overflow'
	}
	calcPercSolidsByWeight(slurrySG) {
		//Cw = (SG_slurry - 1)/(SG_solid - 1) × SG_solid/SG_slurry × 100%
		return (
			(100 * this.OreDensity * (slurrySG - 1)) /
			(slurrySG * (this.OreDensity - 1))
		);
	}

	calcSolidRate(slurrySG) {
		return (
			(this.VolRate * slurrySG * this.calcPercSolidsByWeight(slurrySG)) /
			100
		);
	}

	calcDilutionRatio(slurrysg) {
		return (
			(100 - this.calcPercSolidsByWeight(slurrysg)) /
			this.calcPercSolidsByWeight(slurrysg)
		).toFixed(2);
	}

	// Method to calculate volume yield to underflow
	calculateMassYieldToUnderflow() {
		return (
			(this.calcDilutionRatio(this.feedDensity) -
				this.calcDilutionRatio(this.overflowDensity)) /
			(this.calcDilutionRatio(this.underflowDensity) -
				this.calcDilutionRatio(this.overflowDensity))
		);
	}



	Results() {
		const results = {};

		// Calculate mass yield first
		results.Split = 100*this.calculateMassYieldToUnderflow().toFixed(2);
		results.FPS = this.calcPercSolidsByWeight(this.feedDensity).toFixed(2);
		results.UFPS = this.calcPercSolidsByWeight(this.underflowDensity).toFixed(2);
		results.OFPS = this.calcPercSolidsByWeight(this.overflowDensity).toFixed(2);
        results.FDDL = this.calcDilutionRatio(this.feedDensity);
        results.UFDL = this.calcDilutionRatio(this.underflowDensity);
        results.OFDL = this.calcDilutionRatio(this.overflowDensity);

		switch(this.volRateVariable) {
			case "feed":
				results.FDMS = this.calcSolidRate(this.feedDensity).toFixed(2);
				results.UFMS = (this.calculateMassYieldToUnderflow()*this.calcSolidRate(this.feedDensity)).toFixed(2);
				results.OFMS = (this.calcSolidRate(this.feedDensity) - results.UFMS).toFixed(2);
				results.FQP = this.VolRate.toFixed(2);
				results.UFQP = (results.UFMS/(results.UFPS/100)/this.underflowDensity).toFixed(2);
				results.OFQP = (results.OFMS/(results.OFPS/100)/this.overflowDensity).toFixed(2);
				results.VSplit = (results.UFQP/results.FQP*100).toFixed(2);
				break;

			case "underflow":
				results.FDMS = (this.calcSolidRate(this.underflowDensity)/this.calculateMassYieldToUnderflow()).toFixed(2);
				results.UFMS = this.calcSolidRate(this.underflowDensity).toFixed(2);
				results.OFMS = (results.FDMS - results.UFMS).toFixed(2);
				results.FQP = (results.FDMS/(results.FPS/100)/this.feedDensity).toFixed(2);
				results.UFQP = this.VolRate.toFixed(2);
				results.OFQP = (results.OFMS/(results.OFPS/100)/this.overflowDensity).toFixed(2);
				results.VSplit = (results.UFQP/results.FQP*100).toFixed(2);
				break;

			case "overflow":
				results.OFMS = this.calcSolidRate(this.overflowDensity).toFixed(2);
				results.UFMS = (results.OFMS*results.Split/(1-results.Split)).toFixed(2);
				results.FDMS = (parseFloat(results.OFMS) + parseFloat(results.UFMS)).toFixed(2);
				results.FQP = (results.FDMS/(results.FPS/100)/this.feedDensity).toFixed(2);
				results.OFQP = this.VolRate.toFixed(2);
				results.UFQP = (parseFloat(results.FQP) - parseFloat(results.OFQP)).toFixed(2);
				results.VSplit = (results.UFQP/results.FQP*100).toFixed(2);
				break;
		}

		return results;
	}
}
