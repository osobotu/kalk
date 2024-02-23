// arithmetic methods
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const divide = (num1, num2) => (num1 / num2).toFixed(5);
const multiply = (num1, num2) => (num1 * num2).toFixed(5);

const OPERATORS = new Map([
  ["add", "+"],
  ["subtract", "-"],
  ["divide", "/"],
  ["multiply", "*"],
]);

const operate = function (operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
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

let num1 = "";
let num2 = "";
let operator = "";
let currentState = "num1";

const hasDecimal = function (number) {
  let n = number.length;
  for (let i = 0; i < n; i++) {
    if (number[i] === ".") {
      return true;
    }
  }
  return false;
};

const handleNumberInput = function (number) {
  if (currentState === "num1") {
    if (num1.length < 15) {
      num1 += number;
      updateDisplay(num1);
    }
  } else {
    if (num2.length < 15) {
      num2 += number;
      updateDisplay(num2);
    }
  }
};

const handleDecimalPointInput = function () {
  if (currentState === "num1") {
    if (!hasDecimal(num1)) {
      num1 = num1 + ".";
      updateDisplay(num1);
    }
  } else {
    if (!hasDecimal(num2)) {
      num2 += ".";
      updateDisplay(num2);
    }
  }
};

const handleOperatorInput = function (op) {
  if (currentState === "num1" && num1 != "") {
    updateOperatorDisplay();
    operator = OPERATORS.get(op);
    currentState = "num2";
  } else {
  }
};

const handleEquals = function () {
  if (currentState === "num2" && num2 !== "") {
    // Perform calculation
    const result = operate(operator, num1, num2);
    updateDisplay(result);
    // Reset calculator state
    num1 = result.toString();
    operator = "";
    num2 = "";
    currentState = "num1";
  }
};

const handlePercentage = function () {
  if (currentState === "num1") {
    const result = operate(OPERATORS.get("divide"), num1, 100);
    updateDisplay(result);
    num1 = result.toString();
  } else {
    const result = operate(OPERATORS.get("divide"), num2, 100);
    updateDisplay(result);
    num2 = result.toString();
  }
};

const handlePositiveOrNegative = function () {
  if (currentState === "num1") {
    const result = operate(OPERATORS.get("multiply"), num1, -1);
    updateDisplay(result);
    num1 = result.toString();
  } else {
    const result = operate(OPERATORS.get("multiply"), num2, -1);
    updateDisplay(result);
    num2 = result.toString();
  }
};

const updateDisplay = function (val) {
  let display = document.querySelector(".display");
  display.textContent = val;
};

const updateOperatorDisplay = function () {
  const operations = document.querySelectorAll(".operation");
  operations.forEach(function (operation) {
    if (operation.id !== "equal") {
      operation.addEventListener("click", function () {
        operations.forEach(function (op) {
          op.classList.remove("selected");
        });
        operation.classList.add("selected");
      });
    }
  });
};

const setOperatorValue = function (val) {
  // set operator
  operator = OPERATORS.get(val);
  updateOperatorDisplay();
};

const clearDisplayValue = function () {
  num1 = "";
  num2 = "";
  operator = "";
  updateDisplay("0");
};
