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
let email = document.getElementById("email");


const message = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez renseigner une adresse mail valide.",
  city: "Vous devez choisir une option.",
  conditions: "Vous devez vérifier que vous acceptez les termes et conditions."
};

const checkName = (nameField, msg) => {
  const name = nameField.value.trim();
  if (name.length < 2) {
    setErrorMessage(nameField, msg);
    return false;
  }
  hideErrorMessage(nameField);
  return true; 
}


const setErrorMessage = (element, msg) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', msg);
};

const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};



// validate form elements
firstNameField.addEventListener('change', () => checkName(firstNameField, message.name));
lastNameField.addEventListener('change', () => checkName(lastNameField, message.name));





// check email simply using Constraint Validation API
// email.addEventListener("change", () => {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I am expecting an email address!");
//   } else {
//     email.setCustomValidity("");
//   }
// });
