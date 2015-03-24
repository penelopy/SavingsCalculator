//Create a JavaScript based Savings Calculator that can give users real time results on refinancing their current mortgage




//user input * loan_amount, current monthly payment 

var Calculator = function() {
    this.loanAmount = 0;
    this.newTerm = 0;
    this.monthlyPayment = 0;
    this.monthlyInterestRate = 0;
    this.totalPayments = 0;
    this.termArray = [10, 15, 20, 30];



    var rawData = this.getDataFromWellsFargo();
    var dataRow = this.getDataRowFromRawData(rawData, 20);
    var dataElements = this.extractElementsFromDataRow(dataRow);
    console.log(dataRow);

    var quickenData = this.getDataFromQuicken();
    // var quickenRow = this.getQuickenDataRow();
 
    // console.log(quickenRow);

    // DOESN'T WORK - intended to input each term and output rate
    // ALSO need to save to a hash or object

    // for (var term in this.termArray) {
    //     var lendaRates = new LendaAPI(this);
    //     var lendaResult = lendaRates.getRateAndCostForTerm(term);
    //     console.log("lenda", + lendaResult.rate);
    // this.calculateSavings(500000, 30, 3000, 20);
    // };

    // this.lendaRates = new LendaAPI();
    // this.lendaResult = this.lendaRates.getRateAndCostForTerm(30);
    // console.log("lenda", + this.lendaResult.rate);

    // this.calculateSavings(500000, 30, 3000, 20);



    // this.wellsFargoRates = new WellsFargoAPI(); 
    // console.log("current ", + this.wellsFargoRates.rates.rates.processRate(10));


    // var quickenResult = getQuickenRates(10);
    // console.log(quickenResult);

    // this.wFResult.processRate(10);  //rewrite - not working
    // console.log(wellsFargoRates);
};

Calculator.prototype.getDataFromQuicken = function() {
        this.quickenData = getQuickenRates();
        return this.quickenData;
};
Calculator.prototype.getQuickenDataRow = function(quickenData, term) {
    for (var i=0; i < quickenData.length; i++) {
        if (quickenData[i].term === term) {
            var x = quickenData[i];
            return x;
        }
    }
};


Calculator.prototype.getDataFromWellsFargo = function() {
    this.wellsFargoRates = new WellsFargoAPI();
    return this.wellsFargoRates.rates.rates;
};
Calculator.prototype.getDataRowFromRawData = function(rawData, term) {
    for (var i=0; i < rawData.length; i++) {
        if (rawData[i].term === term) {
            var x = rawData[i];
            return x;
        }
    }
};
Calculator.prototype.extractElementsFromDataRow = function(dataRow) {
    var cost = dataRow.cost;
    var rate = dataRow.rate;
    var term = dataRow.term;
    var lender = "Wells Fargo";
    console.log(cost, rate, term, lender);
    return cost, rate, term, lender;
};

// Calculator.prototype.compileWFDataintoGrid = function(cost, rate, term, lender) {

// };    


Calculator.prototype.calculateSavings = function(dataRow, loanAmount, rate, newTerm, oldMonthlyPayment) {
    // Takes APR as percentage and converts into monthly interest rate
    var monthlyInterestRate = this.rate/100/12;


    // This function calculates monthly payment
    // var monthly_payment = loan_amount *(monthly_interest_rate *(Math.pow(1.0 + monthly_interest_rate, 12.0 * new_term)))/(Math.pow( ( 1 + monthly_interest_rate ), ( 12.0 * new_term )) - 1.0);    
    
    // Breakout of monthly payment calculation
    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * newTerm));
    var denominator = Math.pow( ( 1 + monthlyInterestRate ), ( 12.0 * newTerm )) - 1.0;
    var numOverDenom = numerator/denominator;
    var monthlyPayment = loanAmount * numOverDenom;
    var totalSavings = (oldMonthlyPayment * newTerm) - (monthlyPayment * newTerm);

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



  Calculator.prototype.processRate = function(term) {   //use something like this to get rate info for WF and Quicken
    response = this.rates.filter(function(rate) { return rate.term === term })[0];
    response['cost'] = this.cost;
    return response;
  };




