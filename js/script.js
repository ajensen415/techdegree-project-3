//variable declarations 
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

const design = document.getElementById("design");
const color = document.getElementById("color");
const colorOptions = color.children;

const registerActivties = document.getElementById("activities");
const totalElement = document.getElementById("activities-cost");
let totalPrice = 0;

let payWith = document.getElementById("payment");
let paymentMethods = document.getElementsByClassName("payment-methods")[0];
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
let form = document.querySelector("form");

const activitesCheckbox = document.getElementById("activities-box");

//Focus on name field 
nameInput.focus();

//hide other text field
otherJobRole.style.display = 'none';

//show other text field if other is selected 
jobRole.addEventListener("change", e => {
    if (e.target.value == "other") {
        otherJobRole.style.display = 'inherit';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//disable color dropdown until user selects shirt design
color.disabled = true;

//disblae color options not available for design selected
design.addEventListener("change", e => {
    color.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const currentOption = colorOptions[i];
        const dataTheme = currentOption.getAttribute("data-theme");
        console.log(e.target.value, dataTheme);
        if (e.target.value == dataTheme) {
            currentOption.disabled = false;
        } else {
            currentOption.disabled = true;
        }
    }
});

//register for activties & determine cost
registerActivties.addEventListener("change", e => {
    let dataCost = e.target.getAttribute("data-cost");
    if (e.target.checked) {
        totalPrice += parseInt(dataCost);
    } else {
        totalPrice -= parseInt(dataCost);
    }
    totalElement.innerHTML = "Total: $" + totalPrice;
});

//hide/display selected payment methods
paypal.style.display = 'none';
bitcoin.style.display = 'none';

payWith.children[1].setAttribute("selected", true);

payWith.addEventListener("change", e => {
    if (e.target.value == "credit-card") {
        creditCard.style.display = 'inherit';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == "paypal") {
        creditCard.style.display = 'none';
        paypal.style.display = 'inherit';
        bitcoin.style.display = 'none';
    } else if (e.target.value == "bitcoin") {
        creditCard.style.display = 'inone';
        paypal.style.display = 'none';
        bitcoin.style.display = 'inherit';
    }
});

//form validation section 
form.addEventListener("submit", e => {
    e.preventDefault();
    const nameField = nameInput.value;
    const isNameValid = /^[A-Za-z]+$/.test(nameField);
    if (isNameValid) {
        e.preventDefault();
        nameInput.className = "valid";
    } else {
        nameInput.className = "invalid";
    }
    isRegisterValid();
});

function isEmailValid(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isCardNumValid(cardnumber) {
    return /^\d{13,16}$/.test(cardnumber);
}

function isZipValid(zipcode) {
    return /^\d{5}$/.test(zipcode);
}

function isCvvValid(cvv) {
    return /^\d{3}$/.test(cvv);
}

function isRegisterValid() {
    for (i = 0; i < activitesCheckbox.children.length; i++) {
        console.log(activitesCheckbox.children[i]);
        if (activitesCheckbox.children[i].children[0].checked) {
            activitesCheckbox.children.className = "valid";
        } else {
            activitesCheckbox.children.className = "invalid";
        }
    }
}

