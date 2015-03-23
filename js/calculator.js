//Create a JavaScript based Savings Calculator that can give users real time results on refinancing their current mortgage

// monthly_payment = loan_amount * ( ( monthly_interest_rate * ( 1 + monthly_interest_rate ) ^ ( 12 * new_term ) ) ) / ( ( 1 + monthly_interest_rate ) ^ ( 12 * new_term ) - 1 )


// savings = old monthly payment * total payments` - `new monthly payment * total payments 


//user input * loan_amount, current monthly payment 

var Calculator = function() {
    this.loanAmount = 0;
    this.newTerm = 0;
    this.monthlyPayment = 0;
    this.monthlyInterestRate = 0;
    this.totalPayments = 0;



    this.lendaRates = new LendaAPI();

    this.lendaResult = this.lendaRates.getRateAndCostForTerm(30);
    console.log("lenda", + this.lendaResult.rate);

    this.calculateSavings(500000, 30);

    var wellsFargoRates = new WellsFargoAPI();

    var wfResult = wellsFargoRates.getRatesAndCost(10);
    console.log(wfResult);

    // var quickenResult = getQuickenRates(10);
    // console.log(quickenResult);

    // this.wFResult.processRate(10);  //rewrite - not working
    // console.log(wellsFargoRates);
};

Calculator.prototype.calculateSavings = function(loanAmount, newTerm) {
    // annualInterestRate = this.lendaResult.rate;
    var monthlyInterestRate = this.lendaResult.rate/100/12;

    // console.log("rate", + monthlyInterestRate);
    // console.log("term", + newTerm);

    // This function calculates monthly payment
    // var monthly_payment = loan_amount *(monthly_interest_rate *(Math.pow(1.0 + monthly_interest_rate, 12.0 * new_term)))/(Math.pow( ( 1 + monthly_interest_rate ), ( 12.0 * new_term )) - 1.0);    
    // Breakout of monthly payment calculation
    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * newTerm));
    var denominator = Math.pow( ( 1 + monthlyInterestRate ), ( 12.0 * newTerm )) - 1.0;
    var numOverDenom = numerator/denominator;
    var monthlyPayment = loanAmount * numOverDenom;

    // console.log("num ", + numerator);
    // console.log("denom ", + denominator);
    // console.log("num over denom ", + numOverDenom);
    console.log("payment ", + monthlyPayment);


};

// Lenda.getLendaRate(term) //return response hash


//write event listener that watches for .click on submit button *look at JS3 program* 

//STEPS
// draft UI and input fields **should include loan balance and current monthly payment) 
// write event listeners
// write function that gets loan rates from APIs
// calcuate savings from each lender and return savings grid for user to view 
// write jasmine tests
// make an awesome UI



  // Calculator.prototype.processRate = function(term) {   //use something like this to get rate info for WF and Quicken
  //   response = this.rates.filter(function(rate) { return rate.term === term })[0];
  //   response['cost'] = this.cost;
  //   return response;
  // };




