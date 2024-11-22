

export class HydroSpotCheck{
    constructor(OreDensity,FeedVolRate,feedDensity, overflowDensity, underflowDensity) {
        this.OreDensity = OreDensity;
        this.FeedVolRate = FeedVolRate;
        this.feedDensity = feedDensity;      // ρf - feed density
        this.overflowDensity = overflowDensity; // ρo - overflow density
        this.underflowDensity = underflowDensity; // ρu - underflow density
    }



    calcPercSolidsByWeight(slurrySG){
        //Cw = (SG_slurry - 1)/(SG_solid - 1) × SG_solid/SG_slurry × 100%
        return (100*this.OreDensity*(slurrySG-1)/(slurrySG*(this.OreDensity-1)))
    }

    calcFeedSolidRate(){
        return this.FeedVolRate*this.feedDensity*this.calcPercSolidsByWeight(this.feedDensity)/100
    }

    calcDilutionRatio(slurrysg){
        return ((100-this.calcPercSolidsByWeight(slurrysg))/this.calcPercSolidsByWeight(slurrysg)).toFixed(2);
    }

    // Method to calculate volume yield to underflow
    calculateMassYieldToUnderflow(){
        return ((this.calcDilutionRatio(this.feedDensity)-this.calcDilutionRatio(this.overflowDensity))/(this.calcDilutionRatio(this.underflowDensity)-this.calcDilutionRatio(this.overflowDensity)))
    }


    Results(){
        const results = {}
        results.Split = this.calculateMassYieldToUnderflow().toFixed(2)
        results.FDMS = this.calcFeedSolidRate().toFixed(2)
        results.UFMS = (this.calculateMassYieldToUnderflow()*this.calcFeedSolidRate()).toFixed(2)
        results.OFMS = (this.calcFeedSolidRate() - results.UFMS).toFixed(2)
        results.FPS = this.calcPercSolidsByWeight(this.feedDensity).toFixed(2)
        results.UFPS = this.calcPercSolidsByWeight(this.underflowDensity).toFixed(2)
        results.OFPS = this.calcPercSolidsByWeight(this.overflowDensity).toFixed(2)

        return results
    }

    // You can add additional methods or override methods from SlurryProperties as needed
}

// Example usage
const hydroSpotCheck = new HydroSpotCheck(
    2.650,              // OreDensi            // extensiveVariable
    139,               // Vol Flow
    1.621,               // feedDensity (ρf)
    1.507,               // overflowDensity (ρo)
    1.992                // underflowDensity (ρu)
);


console.log( hydroSpotCheck.Results());
