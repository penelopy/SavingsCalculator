$(document).ready(function () {


    $("#message-form").submit(handleFormSubmit);
    // getMessages();


    // $("#message-clear").click(function(e) {
    //     $.get("api/wall/clear", function (response) {
    //         formatMsg(response);
    //     });

    // });

});


/**
 * Handle submission of the form.
 */
function handleFormSubmit(evt) {
    // evt.preventDefault();

    var loanText = $("#loan_amount");
    var loan = loanText.val();

    var textArea = $("#old_monthly_payment");
    var msg = textArea.val();

    console.log("handleFormSubmit: ", loan);
    addMessage(loan);

    // Reset the message container to be empty
    textArea.val("");

    // // prevent re-submission
    // $("#message-send").prop("disabled", true);
    // setTimeout(function() {
    //     $("#message-send").prop("disabled", false);
    // }, 5000);


}

// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
if (this.length >= 4) {

  // var result = newDataRow.payment.insertComma( -3, 0, "," );
return (this.slice(0,-3) + "," + this.slice(-3 + Math.abs(0)));
}
};

var Calculator = function() {
  this.loanAmount = 0;
  this.newTerm = 0;
  this.monthlyPayment = 0;
  this.monthlyInterestRate = 0;
  this.totalPayments = 0;
  this.outputArray = [];
  this.outputLenda = [];
  this.outputQuicken = [];
  this.outputWellsFargo = [];

  this.lenda = new LendaLender();
  this.wellsfargo = new WellsLender();
  this.quicken = new QuickenLender();

  this.lenderObjects = [this.lenda, this.wellsfargo, this.quicken];
  for (var x=0; x < this.lenderObjects.length; x++) {
    currentLender = this.lenderObjects[x];
    currentLender.preProcess();
    this.processData(currentLender, 4000, 500000);
    this.displayRateGridinHTML(currentLender);
  };

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
  this.preProcessedData = this.lendaData;
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

Calculator.prototype.processData = function(lenderObject, oldMonthlyPayment, loanAmount) {
  for (var i=0; i < lenderObject.preProcessedData.length; i++) {

    newDataRow = new dataRow();
    newDataRow.term = lenderObject.preProcessedData[i].term;
    newDataRow.fee = lenderObject.preProcessedData[i].cost;
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
  newDataRow.payment = loanAmount * numOverDenom;
  newDataRow.payment =   newDataRow.payment.toFixed(0);

  newDataRow.payment = newDataRow.payment.toString().insertComma();

  newDataRow.savings = (oldMonthlyPayment * newDataRow.term) - (newDataRow.payment * newDataRow.term);
  newDataRow.savings =  newDataRow.savings.toFixed(0);
  lenderObject.arrayOfDataRows.push(newDataRow);

}
};

Calculator.prototype.processUserInput = function() {
  loan_balance = document.getElementById("loan_balance").value;
  console.log(loan_balance);
};  


Calculator.prototype.displayRateGridinHTML = function(lenderObject) {
  document.write("<table border=\"1\" cellpadding=\"5\">");
  document.write("<tr><th>Lender</th><th>New Monthly Payment ($)</th><th>Rate (%)</th><th>Term (yr)</th><th>Savings From Refinancing ($)</th><th>Refinance Fee ($)</th></tr>");

  for (var i = 0; i < lenderObject.arrayOfDataRows.length; i++)
  document.write( "<tr><td>" + lenderObject.lender_name+ "</td><td>" + lenderObject.arrayOfDataRows[i].payment + "</td><td>" + lenderObject.arrayOfDataRows[i].rate + "</td><td>" + lenderObject.arrayOfDataRows[i].term + "</td><td>" +lenderObject.arrayOfDataRows[i].savings + "</td><td>" + lenderObject.arrayOfDataRows[i].fee + "</td></tr>"); 

  document.write ("</table>");
};





 



