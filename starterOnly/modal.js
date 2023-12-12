function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// waiting for inscription to be clicked --> display
modalBtn.forEach((btn) => btn.addEventListener("click", () =>  modalbg.style.display = "block")); 


// select close button and hide form after click
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => modalbg.style.display = "none");




// form elements
let firstNameField = document.getElementById("first");
let lastNameField  = document.getElementById("last");
let emailField = document.getElementById("email");
let birthdateField = document.getElementById('birthdate');

// validate form elements
firstNameField.addEventListener('change', () => checkName(firstNameField, message.name));
lastNameField.addEventListener('change', () => checkName(lastNameField, message.name));
emailField.addEventListener("change", () => checkEmail(emailField, message.email));
birthdateField.addEventListener("change", () => checkBirthdate(birthdateField, message.birthdate));



const message = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez renseigner une adresse mail valide.",
  birthdate : "Vous devez ...",
  city: "Vous devez choisir une option.",
  conditions: "Vous devez vérifier que vous acceptez les termes et conditions."
};

const checkName = (input, msg) => {
  const name = input.value.trim();
  if (name.length < 2) {
    setErrorMessage(input, msg);
    return;
  }
  hideErrorMessage(input);
  return;
}

// check email simply using Constraint Validation API
const checkEmail = (input, msg) => {
  if (input.validity.typeMismatch) {
    setErrorMessage(input, msg);
    return;
  }
  hideErrorMessage(input);
  return;
}


const checkBirthdate = (input, msg) => {
  const birthdate = new Date(input.value);
  const currDate =  Date.now();
  let difference = currDate - birthdate.getTime();
  diff = new Date(difference);
  const userAge = diff.getFullYear() - 1970;
  alert(userAge)
  const currentYear = new Date().getFullYear();
  const birthYear = birthdate.getFullYear();
  
  if (birthYear < currentYear - 100 || birthYear.toString().length !== 4 || userAge < 18) {
      setErrorMessage(input, msg);
      return;
  } 
  hideErrorMessage(input);
  return;
};

const setErrorMessage = (element, msg) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', msg);
};

const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};



