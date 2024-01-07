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
const modalSubmitted = document.querySelector(".confirm_modal");  
const modalBtn = document.querySelectorAll(".modal-btn"); // register btn
const formData = document.querySelectorAll(".formData"); // form fields
const form = document.querySelector('form'); // form container

// waiting for inscription to be clicked --> display
modalBtn.forEach((btn) => btn.addEventListener("click", () =>  modalbg.style.display = "block")); 

// ======================================= //

// select close button and hide the form after click
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => modalbg.style.display = "none");

// closeBtn.addEventListener("click", exitBtn) 
// function exitBtn() {
//   modalbg.style.display = "none";
// }

// form elements
//collected item from the form
const firstNameField = document.getElementById("first");
const lastNameField  = document.getElementById("last");
const emailField = document.getElementById("email");
const birthdateField = document.getElementById('birthdate');
const quantityField = document.getElementById('quantity');
const cityBtn = document.querySelectorAll("input[name='location']");
const conditionsBtn = document.getElementById('checkbox1');

const message = {
  name: "Votre nom doit comporter au moins 2 caractères.",
  email: "Veuillez saisir une adresse email valide.",
  birthdate : "Veuillez saisir une date de naissance valide et elle doit être âgée d'au moins 18 ans.",
  quantity: "La quantité doit être uniquement un chiffre entre 0 et 99.",
  city: "Veuillez choisir une choix de ville.",
  conditions: "Veuillez accepter les conditions."
};


// validate form elements
//two type of event: 1)input (show error all the time) and 2)change (only show the error when user leave the input)
firstNameField.addEventListener('change', () => checkName(firstNameField, message.name));
lastNameField.addEventListener('change', () => checkName(lastNameField, message.name));
emailField.addEventListener('change', () => checkEmail(emailField, message.email));
birthdateField.addEventListener('input', () => checkBirthdate(birthdateField, message.birthdate));
quantityField.addEventListener('input', () => checkQuantity(quantityField, message.quantity));
cityBtn.forEach(btn => btn.addEventListener('change', () => checkCity(cityBtn, message.city)));
conditionsBtn.addEventListener('change', () => checkConditions(conditionsBtn, message.conditions));


// check name length (min=2) (no number or special characters)
// trim to not count the space
const checkName = (element, msg) => {
  const name = element.value.trim();
  const nameRegExp = new RegExp("[a-zA-ZÀ-ÿ-]{2,20}")
  if (!nameRegExp.test(name)) {
    setErrorMessage(element, msg);
    return false;
  }
  hideErrorMessage(element);
  return true;
}

//avoid number in first name and last name
firstNameField.addEventListener("keypress", (event) => {
  const nameRegExp = new RegExp("[a-zA-ZÀ-ÿ-]");
  if(!nameRegExp.test(event.key)){
    event.preventDefault()
  }    
});

lastNameField.addEventListener("keypress", (event) => {
  const nameRegExp = new RegExp("[a-zA-ZÀ-ÿ-]");
  if(!nameRegExp.test(event.key)){
    event.preventDefault()
  }    
});

// check email simply using regular expression (RegExp)
const checkEmail = (element, msg) => {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  if (!emailRegExp.test(element.value)) {
    setErrorMessage(element, msg);
    return false;
  }
  hideErrorMessage(element);
  return true;
}


// check if date is valid or no, and if it is older than 18
// empty is also invalid (because of required?)
const checkBirthdate = (element, msg) => {
  const birthdate = new Date(element.value);

  const today = new Date(); // today
  today.setFullYear(today.getFullYear() - 18); // today but -18 years

  if (birthdate > today || isNaN(birthdate) || (element.value.toString().length !== 10)) {
      setErrorMessage(element, msg);
      return false;
  } 
  hideErrorMessage(element);
  return true;
};

// check quantity value (between 0 and 99)
// TODO need to add check for invalid inputs (string, empty)
const checkQuantity = (element, msg) => {
  // const qtyRegExp = new RegExp("?:99|\d{1,2}");
  const qtyRegExp = /^(?:99|\d{1,2})$/;
  if(!qtyRegExp.test(element.value)){
    setErrorMessage(element, msg);
    return false;
  }
  hideErrorMessage(element);
  return true;
}

// to avoid user from entering anything but number in firefox

// prevent default = the method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
 
quantityField.addEventListener("keypress", (event) => {
  const numberRegExp = new RegExp("[0-9]");
  if(!numberRegExp.test(event.key)){
    event.preventDefault()
  }    
});
// check if a city is chosen
const checkCity = (element, msg) => {
  // create array for all buttons and check if any is checked
  const isChecked = Array.from(element).some(btn => btn.checked);
  if (!isChecked) {
      setErrorMessage(element[0], msg);
      return false;
  };
  hideErrorMessage(element[0]);
  return true;
};

// check if conditions are accepted
const checkConditions = (element, msg) => {
  if(!element.checked) {
      setErrorMessage(element, msg);
      return false;
  } 
  hideErrorMessage(element);
  return true;  
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


// submitting form
form.addEventListener("submit", (event) =>  {
    // On empêche le comportement par défaut
    event.preventDefault();
    const firstnameValid  = checkName(firstNameField, message.name);
    const lastnameValid   = checkName(lastNameField, message.name);
    const emailValid      = checkEmail(emailField, message.email);
    const birthdateValid  = checkBirthdate(birthdateField, message.birthdate); 
    const quantityValid   = checkQuantity(quantityField, message.quantity);
    const cityValid       = checkCity(cityBtn, message.city);
    const conditionsValid = checkConditions(conditionsBtn, message.conditions);
    const formIsValid = firstnameValid && lastnameValid && emailValid 
     && birthdateValid && quantityValid && cityValid && conditionsValid;
     
    if (formIsValid) {
      // reset form, inform user, close form
      modalbg.style.display = "none";
      modalSubmitted.style.display = 'flex';
      // form.reset();
    }
  }
);

// close success message
document.querySelector('.confirm-modal-btn').addEventListener('click', () => modalSubmitted.style.display = "none");
document.querySelector('.confirm-close').addEventListener('click', () => modalSubmitted.style.display = "none");



