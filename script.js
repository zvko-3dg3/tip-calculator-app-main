const billInput = document.getElementById("bill");
const tipRadios = document.querySelectorAll('input[name="tip"]');
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const tipAmountOutput = document.getElementById("tip-amount");
const totalOutput = document.getElementById("total");
const resetButton = document.querySelector(".results-section button");
let valid = false;

billInput.addEventListener("input", () => {
  billInput.value = billInput.value
    .replace(/[^0-9.]/g, "")
    .replace(/^\./, "")
    .replace(/(\..*?)\..*/g, "$1");
  calculateTip();
  errorMessages();
});

peopleInput.addEventListener("input", () => {
  peopleInput.value = peopleInput.value
  .replace(/[^0-9]/g, "")
  .replace(/^0+/, "");
  calculateTip();
  errorMessages();
});

tipRadios.forEach((radio) => radio.addEventListener("change", calculateTip));

customTipInput.addEventListener("input", () => {
  tipRadios.forEach((radio) => (radio.checked = false));
  customTipInput.value = customTipInput.value
    .replace(/[^0-9]/g, "")
    .replace(/^0+/, "");
  calculateTip();
});

function calculateTip() {
  const billValue = parseFloat(billInput.value);
  const peopleValue = parseInt(peopleInput.value);
  const selectedTipRadio = document.querySelector('input[name="tip"]:checked');
  const customTipValue = parseFloat(customTipInput.value);
  let tipPercentage = 0;

  if (selectedTipRadio) {
    tipPercentage = parseFloat(selectedTipRadio.value);
    customTipInput.value = "";
  } else if (!isNaN(customTipValue)) {
    tipPercentage = customTipValue;
  }

  const tipAmount = billValue * (tipPercentage / 100);
  const tipPerPerson = tipAmount / peopleValue;
  const total = billValue + tipAmount;
  const totalPerPerson = total / peopleValue;

  tipAmountOutput.textContent = tipPerPerson.toFixed(2);
  totalOutput.textContent = totalPerPerson.toFixed(2);

  if (
    tipAmountOutput.textContent === "NaN" ||
    tipPerPerson.textContent === "Infinity" ||
    totalOutput.textContent === "NaN" ||
    totalOutput.textContent === "Infinity"
  ) {
    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  }

  if (billInput.value && peopleInput.value) {
    valid = true;
  } else {
    valid = false;
  }
  resetButton.disabled = !valid;
}

function resetCalculator() {
  billInput.value = "";
  tipRadios.forEach((radio) => (radio.checked = false));
  customTipInput.value = "";
  peopleInput.value = "";
  tipAmountOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";
  resetButton.disabled = true;
}

function errorMessages() {
  const billError = document.getElementById("bill-error");
  const billValue = billInput.value.trim();
  const peopleError = document.getElementById("people-error");
  const peopleValue = peopleInput.value.trim();

  if (billInput.validity.badInput) {
    billError.textContent = "Invalid input";
    billInput.classList.add("input-error");
  } else if (billValue === "") {
    billError.textContent = "Can't be empty";
    billInput.classList.add("input-error");
  } else if (Number(billValue) === 0) {
    billError.textContent = "Can't be zero";
    billInput.classList.add("input-error");
  } else if (Number(billValue) < 0) {
    billError.textContent = "Invalid input";
    billInput.classList.add("input-error");
  } else {
    billError.textContent = "";
    billInput.classList.remove("input-error");
  }

  if (
    peopleInput.validity.badInput ||
    Number(peopleValue) < 0 ||
    !Number.isInteger(Number(peopleValue))
  ) {
    peopleError.textContent = "Invalid input";
    peopleInput.classList.add("input-error");
  } else if (peopleValue === "") {
    peopleError.textContent = "Can't be empty";
    peopleInput.classList.add("input-error");
  } else if (Number(peopleValue) === 0) {
    peopleError.textContent = "Can't be zero";
    peopleInput.classList.add("input-error");
  } else if (Number(peopleValue) < 0) {
    peopleError.textContent = "Invalid input";
    peopleInput.classList.add("input-error");
  } else {
    peopleError.textContent = "";
    peopleInput.classList.remove("input-error");
  }
}
