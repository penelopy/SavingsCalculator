
var Calculator = function() {
  this.loanAmount = 0;
  this.newTerm = 0;
  this.monthlyPayment = 0;
  this.monthlyInterestRate = 0;
  this.totalPayments = 0;
  this.termArray = [10, 15, 20, 30];
  this.lender = "Lender";

  this.lenda = new LendaLender();
  this.lenda.preProcess();
  this.wellsfargo = new WellsLender();
  this.wellsfargo.preProcess();
  this.quicken = new QuickenLender();
  this.quicken.preProcess();

  this.lenderObjects = [this.lenda, this.wellsfargo, this.quicken];

  // var wellsDataRaw = this.getDataFromWellsFargo();
  // var lendaDataRaw = this.getDataFromLenda();
  // console.log(lendaDataRaw);
  // var quickenDataRaw = this.getDataFromQuicken();
  // this.getDataRowFromRawData(this.wellsfargo, wellsDataRaw, 30);
  // this.getDataRowFromRawData(this.lenda, wellsDataRaw, 30);


    // this.calculateSavings(500000, 30, 3000, 20);

};

var LendaLender = function() {
  this.term = 0;
  this.rate = 0;
  this.payment = 0;
  this.fee = 0;
  this.savings = 0;
  this.preProcessedData = [];

};

LendaLender.prototype.preProcess = function() {
  this.lendaRates = new LendaAPI();
  this.lendaData = this.lendaRates.rates;
  this.preProcessedData = this.lendaData;
};

var WellsLender = function() {
  this.term = 0;
  this.rate = 0;
  this.payment = 0;
  this.fee = 0;
  this.savings = 0;
  this.preProcessedData = [];

};

WellsLender.prototype.preProcess = function() {
  this.wellsFargoRates = new WellsFargoAPI();
  this.preProcessedData = this.wellsFargoRates.rates.rates;
};


var QuickenLender = function() {
  this.term = 0;
  this.rate = 0;
  this.payment = 0;
  this.fee = 0;
  this.savings = 0;
  this.preProcessedData = [];
};

QuickenLender.prototype.preProcess = function() {
  this.quickenData = getQuickenRates();
  this.preProcessedData = this.quickenData;
};
// Calculator.prototype.getDataFromLenda = function() {
//   this.lendaRates = new LendaAPI();
//   this.lendaData = this.lendaRates.rates;
//   return this.lendaData;
// };

// Calculator.prototype.getDataFromQuicken = function() {
//   this.quickenData = getQuickenRates();
//   return this.quickenData;
// };
// Calculator.prototype.getDataFromWellsFargo = function() {
//   this.wellsFargoRates = new WellsFargoAPI();
//   return this.wellsFargoRates.rates.rates;
// };
Calculator.prototype.processData = function() {


  for (var i=0; i < rawData.length; i++) {
    if (rawData[i].term === term) {
      var dataRow = rawData[i];


    }
    }
};



// Calculator.prototype.getDataRowFromRawData = function(rawData, term) {
//     for (var i=0; i < rawData.length; i++) {
//         if (rawData[i].term === term) {
//             var x = rawData[i];
//             return x;
//         }
//     }
// };
// Calculator.prototype.extractElementsFromDataRow = function(dataRow) {

//   var rate = dataRow.rate;
//   var term = dataRow.term;
//   var lender = "Wells Fargo";

//   var cost = dataRow.cost;
//   console.log(cost, rate, term, lender);
//   return cost, rate, term, lender;
// };

 


Calculator.prototype.calculateSavings = function(dataRow, loanAmount, oldMonthlyPayment) {
  this.rate = dataRow.rate;
  this.term = dataRow.term;
  this.lender = "Wells Fargo";
  // if (this.lender === "Lenda") {
  //     this.cost = 0.0};
  //   }
  // else {
  //   this.cost = dataRow.cost;
  // }

  // console.log(cost, rate, term, lender);


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



  // Calculator.prototype.processRate = function(term) {   //use something like this to get rate info for WF and Quicken
  //   response = this.rates.filter(function(rate) { return rate.term === term })[0];
  //   response['cost'] = this.cost;
  //   return response;
  // };




