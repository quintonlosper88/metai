export class ThreeProductFormula {
	constructor(F=1000, f1=1.29, f2=4.32,c11=26.9,c12=9.25,c21=1.10,c22=57.7,t1=0.072,t2=0.342) {
        this.F = F;
        this.f1 = f1;
        this.f2 = f2;
        this.c11 = c11;
        this.c12 = c12;
        this.c21 = c21;
        this.c22 = c22;
        this.t1 = t1;
        this.t2 = t2;
    }

    calcOverallMYMetalOne(){
        return (((this.f1-this.t1)*(this.c22-this.t2)-(this.f2-this.t2)*(this.c21-this.t1))/((this.c11-this.t1)*(this.c22-this.t2)-(this.c12-this.t2)*(this.c21-this.t1))*100).toFixed(2);
    }

    calcOverallMYMetalTwo(){
        return (((this.f1-this.t1)*(this.c12-this.t2)-(this.f2-this.t2)*(this.c11-this.t1))/((this.c21-this.t1)*(this.c12-this.t2)-(this.c22-this.t2)*(this.c11-this.t1))*100).toFixed(2);
    }

    calcOverallProduceOneRec(){
        const recoveries = {
        }
        recoveries.metal_one=((this.calcOverallMYMetalOne()/100*this.F*this.c11/100)/(this.f1/100*this.F)*100).toFixed(2)
        recoveries.metal_two=((this.calcOverallMYMetalOne()/100*this.F*this.c12/100)/(this.f2/100*this.F)*100).toFixed(2)
        return recoveries
    }
    calcOverallProductTwoRec(){
        const recoveries = {
        }
        recoveries.metal_one=((this.calcOverallMYMetalTwo()/100*this.F*this.c21/100)/(this.f1/100*this.F)*100).toFixed(2)
        recoveries.metal_two=((this.calcOverallMYMetalTwo()/100*this.F*this.c22/100)/(this.f2/100*this.F)*100).toFixed(2)
        return recoveries
    }

    calcIntermediateTailingsGrades(){
        const intTailsGrade={}
        intTailsGrade.metalOne = ((this.F*this.f1/100 - this.calcOverallMYMetalOne()/100*this.F*this.c11/100)/((100- this.calcOverallMYMetalOne())*this.F/100)*100).toFixed(3)
        intTailsGrade.metalTwo = ((this.F*this.f2/100 - this.calcOverallMYMetalOne()/100*this.F*this.c12/100)/((100- this.calcOverallMYMetalOne())*this.F/100)*100).toFixed(3)
        return intTailsGrade;
    }

    calcOverallMassBalance(){
        const massBalance = {}
        massBalance.F = this.F;
        massBalance.C1 = this.F*this.calcOverallMYMetalOne()/100;
        massBalance.IT = this.F - massBalance.C1
        massBalance.C2 = this.F*this.calcOverallMYMetalTwo()/100;
        massBalance.FT = massBalance.F-massBalance.C1 - massBalance.C2;

        return massBalance;
    }



    calcProductOneUR(){
        const ur = {}
        ur.metalOne = (this.c11/this.f1).toFixed(2)
        ur.metalTwo = (this.c12/this.f2).toFixed(2)
        return ur
    }

    calcProductTwoUR(){
        const ur = {}
        ur.metalOne = (this.c21/this.f1).toFixed(2)
        ur.metalTwo = (this.c22/this.f2).toFixed(2)
        return ur
    }

    Results(){
        const results = {}
        results.productOneTons = (this.F*this.calcOverallMYMetalOne()/100).toFixed(2)
        results.productTwoTons = (this.F*this.calcOverallMYMetalTwo()/100).toFixed(2)
        results.tailsTons = (this.F - results.productOneTons - results.productTwoTons).toFixed(2)
        results.productOneRecovery = this.calcOverallProduceOneRec()
        results.productOneUR = this.calcProductOneUR()
        results.productTwoRecovery = this.calcOverallProductTwoRec()
        results.productTwoUR = this.calcProductTwoUR()
        results.productOneMY = this.calcOverallMYMetalOne()
        results.productTwoMY = this.calcOverallMYMetalTwo()
        results.intermediateTails = this.calcOverallMassBalance().IT
        results.ITMetalOneGrade = this.calcIntermediateTailingsGrades().metalOne
        results.ITMetalTwoGrade = this.calcIntermediateTailingsGrades().metalTwo
        return results;
    }
}

const sample = new ThreeProductFormula();


console.log(sample.Results())