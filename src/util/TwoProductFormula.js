export class TwoProductFormula {
	constructor(feed = 2.5, concentrate = 24.5, tails = 0.14, tons = 1000) {
		this.feed = feed;
		this.concentrate = concentrate;
		this.tails = tails;
		this.tons = tons;
	}

	calcRecovery() {
		return parseFloat(
			(
				((this.concentrate * (this.feed - this.tails)) /
					(this.feed * (this.concentrate - this.tails))) *
				100
			).toFixed(2),
		);
	}

	calcUpgradeRatio() {
		return parseFloat((this.concentrate / this.feed).toFixed(2));
	}

	calcMetalTons() {
		const metal = {};
		metal["feedtons"] = parseFloat(((this.feed * this.tons) / 100).toFixed(2));
		metal["concentratetons"] = parseFloat(
			((metal.feedtons * this.calcRecovery()) / 100).toFixed(2),
		);
		metal["tailtons"] = parseFloat(
			(metal.feedtons - metal.concentratetons).toFixed(2),
		);
		return metal;
	}

	calcMassYield() {
		return parseFloat(
			(
				((this.feed - this.tails) / (this.concentrate - this.tails)) *
				100
			).toFixed(2),
		);
	}

	calcGradeRecoveryCurve(min, max, step) {
		const gradrec = [];
		const originalConcentrate = this.concentrate; // Store the original concentrate value

		for (let i = min; i <= max; i += step) {
			this.concentrate = i; // Temporarily set concentrate to the current grade
			const recovery = this.calcRecovery(); // Calculate recovery for the current concentrate grade
			gradrec.push({
				feedGrade: this.feed,
				concGrade: parseFloat(i.toFixed(2)),
				tailsGrade: this.tails,
				recovery: recovery,
				UR: parseFloat((i / this.feed).toFixed(2)),
			});
		}

		this.concentrate = originalConcentrate; // Reset concentrate to its original value
		return gradrec;
	}

    calcMassBalance(){
        const mb = {}
        mb.feed = this.tons;
        mb.conc = (this.tons*this.calcMassYield()/100).toFixed(2); //
        mb.tails = (this.tons*(100-this.calcMassYield())/100).toFixed(2); //

        return mb;
    }

    Results(){
        const results = {}
        results.feedGrade = this.feed;
        results.concGrade = this.concentrate;
        results.tailsGrade = this.tails;
        results.recovery = this.calcRecovery();
        results.upgradeRatio = this.calcUpgradeRatio();
        results.massYield = this.calcMassYield();
        results.metalTons = this.calcMetalTons();
        results.massBalance = this.calcMassBalance();
        return results;
    }
}

// const slurry = new TwoProductFormula();
// console.log(slurry.calcGradeRecoveryCurve(0.5,5,0.5));
