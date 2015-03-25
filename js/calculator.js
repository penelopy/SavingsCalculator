
// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
if (this.length >= 4) {
  return (this.slice(0,-3) + "," + this.slice(-3 + Math.abs(0)));
}
};

var Calculator = function() {
  this.loanAmount = 3;
  this.oldMonthlyPayment = 3;
  this.newTerm = 0;
  this.monthlyPayment = 0;
  this.monthlyInterestRate = 0;
  this.totalPayments = 0;
  this.outputArray = [];
  this.calculator = this;

  document.getElementById("clickMe").onclick = function () { window.calculator.processForm(); };
  this.lenda = new LendaLender();
  this.wellsfargo = new WellsLender();
  this.quicken = new QuickenLender();
  this.lenderObjects = [this.lenda, this.wellsfargo, this.quicken];

  // Place initial values on GUI
  this.preProcessData();
  this.processAndDisplayData();
};

Calculator.prototype.preProcessData = function() {
  // Preprocess data from remote sources
  for (var x=0; x < this.lenderObjects.length; x++) {
    currentLender = this.lenderObjects[x];
    currentLender.preProcess();
  };
};

Calculator.prototype.processAndDisplayData = function() {
  // Process data
  for (var x=0; x < this.lenderObjects.length; x++) {
    currentLender = this.lenderObjects[x];
    this.processData(currentLender);
  };
  // Display data
  for (var x=0; x < this.lenderObjects.length; x++) {
    currentLender = this.lenderObjects[x];
    this.displayRateGridInHTML(currentLender);
  };
};

Calculator.prototype.processForm = function() {
  this.loanAmount = document.getElementById("loan_amount").value;
  this.oldMonthlyPayment = document.getElementById("mo_payment").value;
  console.log(this.loanAmount);
  console.log(this.oldMonthlyPayment);
  console.log("processForm");
  this.processAndDisplayData();

};

var dataRow = function(){
  this.savings = 0;
  this.term = 0;
  this.rate = 0;
  this.payment = 0;
  this.fee = 0;
  this.savings = 0;
};

var LendaLender = function() {
  this.lender_name = "Lenda";
  this.arrayOfDataRows = [];
  this.preProcessedData = [];
};

LendaLender.prototype.preProcess = function() {
  this.lendaRates = new LendaAPI();
  this.lendaData = this.lendaRates.rates;
  var modifiedData = [];
  for (var i=0; i < this.lendaData.length; i++) {
    response = this.lendaData[i];
    response['cost'] = 0;
    modifiedData.push(response);
  }
  this.preProcessedData = modifiedData;
};

var WellsLender = function() {
  this.lender_name = "Wells Fargo";
  this.arrayOfDataRows = [];
  this.preProcessedData = [];
};

WellsLender.prototype.preProcess = function() {
  this.wellsFargoRates = new WellsFargoAPI();
  this.preProcessedData = this.wellsFargoRates.rates.rates;
};

var QuickenLender = function() {
  this.lender_name = "Quicken";
  this.arrayOfDataRows = [];
  this.preProcessedData = [];
};

QuickenLender.prototype.preProcess = function() {
  this.quickenData = getQuickenRates();
  this.preProcessedData = this.quickenData;
};

Calculator.prototype.processData = function(lenderObject) {
  console.log(this.loanAmount);
  console.log(this.oldMonthlyPayment);
  // debugger
  for (var i=0; i < lenderObject.preProcessedData.length; i++) {

    newDataRow = new dataRow();
    newDataRow.term = lenderObject.preProcessedData[i].term;
    newDataRow.fee = lenderObject.preProcessedData[i].cost;

    if (newDataRow.fee >= 1000) {
      newDataRow.fee = newDataRow.fee.toString().insertComma();
    }
    newDataRow.rate = lenderObject.preProcessedData[i].rate;
    newDataRow.rate = newDataRow.rate.toFixed(1);

  // Takes APR as percentage and converts into monthly interest rate

  var monthlyInterestRate = newDataRow.rate/100/12;

  // Master function to calculate monthly payment. 
  // var monthly_payment = loan_amount *(monthly_interest_rate *(Math.pow(1.0 + monthly_interest_rate, 12.0 * new_term)))/(Math.pow( ( 1 + monthly_interest_rate ), ( 12.0 * new_term )) - 1.0);    

  // Breakout of monthly payment calculation
  var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * newDataRow.term));
  var denominator = Math.pow( ( 1 + monthlyInterestRate ), ( 12.0 * newDataRow.term )) - 1.0;
  var numOverDenom = numerator/denominator;
  newDataRow.payment = this.loanAmount * numOverDenom;
  newDataRow.payment =   newDataRow.payment.toFixed(0);

  newDataRow.savings = (this.oldMonthlyPayment * newDataRow.term) - (newDataRow.payment * newDataRow.term);
  newDataRow.savings =  newDataRow.savings.toFixed(0);
  newDataRow.savings =   newDataRow.savings.toString().insertComma();
  newDataRow.payment = newDataRow.payment.toString().insertComma();
  lenderObject.arrayOfDataRows.push(newDataRow);

}
};
 
Calculator.prototype.displayRateGridInHTML = function(lenderObject) {
  document.write("<table border=\"1\" cellpadding=\"5\">");
  document.write("<tr><th>Lender</th><th>New Monthly Payment ($)</th><th>Rate (%)</th><th>Term (yr)</th><th>Total Savings ($)</th><th>Refinance Fee ($)</th></tr>");

  for (var i = 0; i < lenderObject.arrayOfDataRows.length; i++)
  document.write( "<tr><td>" + lenderObject.lender_name+ "</td><td>" + lenderObject.arrayOfDataRows[i].payment + "</td><td>" + lenderObject.arrayOfDataRows[i].rate + "</td><td>" + lenderObject.arrayOfDataRows[i].term + "</td><td>" +lenderObject.arrayOfDataRows[i].savings + "</td><td>" + lenderObject.arrayOfDataRows[i].fee + "</td></tr>"); 

  document.write ("</table>");
};





 



