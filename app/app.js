// arithmetic methods
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;

const OPERATORS = new Map([
  ["add", "+"],
  ["subtract", "-"],
  ["divide", "/"],
  ["multiply", "*"],
]);

let num1;
let num2;
let operator;

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
};

let displayValue = "";

const updateDisplay = function (val) {
  let display = document.querySelector(".display");
  display.textContent = val;
};

const setDisplayValue = function (val) {
  if (displayValue.length < 15) {
    displayValue += val;
  }
  updateDisplay(displayValue);
};

const updateOperatorDisplay = function (val) {
  let key = document.querySelector(`#${val}`);
  key.classList.remove("unselected");
  key.classList.add("selected");
};

const setOperatorValue = function (val) {
  operator = OPERATORS.get(val);
  //   updateOperatorDisplay(val);
};

const clearDisplayValue = function () {
  displayValue = "";
  updateDisplay("0");
};

// run();
