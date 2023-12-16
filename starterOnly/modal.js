function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); // hidden form
const modalBtn = document.querySelectorAll(".modal-btn"); // register btn
const formData = document.querySelectorAll(".formData"); // form fields
const form = document.querySelector('form'); // form container

// waiting for inscription to be clicked --> display
modalBtn.forEach((btn) => btn.addEventListener("click", () =>  modalbg.style.display = "block")); 

// ======================================= //

// select close button and hide form after click
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => modalbg.style.display = "none");


// form elements
const firstNameField = document.getElementById("first");
const lastNameField  = document.getElementById("last");
const emailField = document.getElementById("email");
const birthdateField = document.getElementById('birthdate');
const quantityField = document.getElementById('quantity');
const cityBtn = document.querySelectorAll("input[name='location']");
const conditionsBtn = document.getElementById('checkbox1');


// validate form elements
firstNameField.addEventListener('change', () => checkName(firstNameField, message.name));
lastNameField.addEventListener('change', () => checkName(lastNameField, message.name));
emailField.addEventListener('change', () => checkEmail(emailField, message.email));
birthdateField.addEventListener('change', () => checkBirthdate(birthdateField, message.birthdate));
quantityField.addEventListener('change', () => checkQuantity(quantityField, message.quantity));
cityBtn.forEach(btn => btn.addEventListener('change', () => checkCity(cityBtn, message.city)));
conditionsBtn.addEventListener('change', () => checkConditions(conditionsBtn, message.conditions));


const message = {
  name: "The name should at least have 2 characters.",
  email: "The email address is not valid.",
  birthdate : "Please enter a valid birthdate.",
  quantity: "It should be between 0 and 99.",
  city: "Please choose one city.",
  conditions: "Please accept the conditions."
};

// check name lenght (min=2)
const checkName = (element, msg) => {
  const name = element.value.trim();
  if (name.length < 2) {
    setErrorMessage(element, msg);
    return;
  }
  hideErrorMessage(element);
  return;
}

// check email simply using Constraint Validation API
// TODO to complete the check
const checkEmail = (element, msg) => {
  if (element.validity.typeMismatch) {
    setErrorMessage(element, msg);
    return;
  }
  hideErrorMessage(element);
  return;
}

// check if date is valid or no
// empty is also invalid (because of required?)
const checkBirthdate = (element, msg) => {
  const birthdate = new Date(element.value);
  if (isNaN(birthdate) || (element.value.toString().length !== 10)) {
      setErrorMessage(element, msg);
      return;
  } 
  hideErrorMessage(element);
  return;
};

// check quantity value (between 0 and 99)
// TODO need to add check for invalid inputs (string, empty)
const checkQuantity = (element, msg) => {
  const qty = element.value;
  if (qty>99 || qty<0) {
    setErrorMessage(element, msg);
    return;
  }
  hideErrorMessage(element);
  return;
}

// check if a city is chosen
const checkCity = (element, msg) => {
  // create array for all buttons and check if any is checked
  const isChecked = Array.from(element).some(btn => btn.checked);
  if (!isChecked) {
      setErrorMessage(element[0], msg);
      return;
  };
  hideErrorMessage(element[0]);
  return;
};

// check if conditions are accepted
function checkConditions(element, msg) {
  if(!element.checked) {
      setErrorMessage(element, msg);
      return;
  } 
  hideErrorMessage(element);
  return;  
};

const setErrorMessage = (element, msg) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', msg);
};

const hideErrorMessage = element => {
  // element.parentElement.setAttribute('data-error-visible', 'false');

  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};



