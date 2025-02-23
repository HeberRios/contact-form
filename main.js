"use strict";

// SELECTING ELEMENTS
const contactForm = document.querySelector("#contact-form");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const generalEnquiryInput = document.querySelector("#general-enquiry");
const supportRequestInput = document.querySelector("#support-request");
const queryTypeRadioBtns = [generalEnquiryInput, supportRequestInput];
const messageInput = document.querySelector("#message");
const contactInput = document.querySelector("#consent-contact");
const submitBtn = document.querySelector("#submit-btn");
const successWindow = document.querySelector(".success-window");

// REGULAR EXPRESSIONS FOR INPUT VALIDATIONS
const nameRegex = /^[A-Za-z\s]{2,30}$/;

const emailRegEx =
    /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)+|\[[\t -Z^-~]*])$/;

// FUNCTIONS

function firstNameValidation() {
    if (firstNameInput.value === "") {
        firstNameInput.classList.add("error-active");
        firstNameInput.nextElementSibling.classList.add("error-active");
        firstNameInput.nextElementSibling.textContent =
            "This field is required";
        return false;
    } else if (nameRegex.test(firstNameInput.value)) {
        firstNameInput.classList.remove("error-active");
        firstNameInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        firstNameInput.classList.add("error-active");
        firstNameInput.nextElementSibling.classList.add("error-active");
        firstNameInput.nextElementSibling.textContent = "Invalid value";
        return false;
    }
}

function lastNameValidation() {
    if (lastNameInput.value === "") {
        lastNameInput.classList.add("error-active");
        lastNameInput.nextElementSibling.classList.add("error-active");
        lastNameInput.nextElementSibling.textContent = "This field is required";
        return false;
    } else if (nameRegex.test(lastNameInput.value)) {
        lastNameInput.classList.remove("error-active");
        lastNameInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        lastNameInput.classList.add("error-active");
        lastNameInput.nextElementSibling.classList.add("error-active");
        lastNameInput.nextElementSibling.textContent = "Invalid value";
        return false;
    }
}

function emailValidation() {
    if (emailInput.value === "") {
        emailInput.classList.add("error-active");
        emailInput.nextElementSibling.classList.add("error-active");
        emailInput.nextElementSibling.textContent = "This field is required";
        return false;
    } else if (emailRegEx.test(emailInput.value)) {
        emailInput.classList.remove("error-active");
        emailInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        emailInput.classList.add("error-active");
        emailInput.nextElementSibling.classList.add("error-active");
        emailInput.nextElementSibling.textContent = "Invalid value";
        return false;
    }
}

function resetRadioBtns() {
    queryTypeRadioBtns.forEach(function (input) {
        input.checked = false;
    });
}

function checkForNoEmptyQueryType() {
    let noEmptyInput = false;

    queryTypeRadioBtns.forEach(function (input) {
        if (input.checked) {
            noEmptyInput = true;
        } else {
            return;
        }
    });

    return noEmptyInput;
}

function queryTypeValidation() {
    if (checkForNoEmptyQueryType()) {
        supportRequestInput.parentElement.nextElementSibling.classList.remove(
            "error-active"
        );
        return true;
    } else {
        supportRequestInput.parentElement.nextElementSibling.classList.add(
            "error-active"
        );
        return false;
    }
}

function messageValidation() {
    if (messageInput.value.trim() === "") {
        messageInput.classList.add("error-active");
        messageInput.nextElementSibling.classList.add("error-active");
        return false;
    } else {
        messageInput.classList.remove("error-active");
        messageInput.nextElementSibling.classList.remove("error-active");
        return true;
    }
}

function checkForConsentCheckbox() {
    return contactInput.checked;
}

function contactConsentValidation() {
    if (checkForConsentCheckbox()) {
        contactInput.parentElement.nextElementSibling.classList.remove(
            "error-active"
        );
        return true;
    } else {
        contactInput.parentElement.nextElementSibling.classList.add(
            "error-active"
        );
        return false;
    }
}

function validateForm() {
    const validationArray = [
        firstNameValidation(),
        lastNameValidation(),
        emailValidation(),
        queryTypeValidation(),
        messageValidation(),
        contactConsentValidation(),
    ];

    const allInputsAreValid = validationArray.every((item) => {
        return item;
    });

    return allInputsAreValid;
}

function resetAllInputValues() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    resetRadioBtns();
    messageInput.value = "";
    contactInput.checked = false;
}

function toggleSuccessWindow() {
    successWindow.classList.toggle("active");
}

function moveToTopOfThePage() {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

firstNameInput.addEventListener("input", firstNameValidation);

lastNameInput.addEventListener("input", lastNameValidation);

emailInput.addEventListener("input", emailValidation);

queryTypeRadioBtns.forEach((input) => {
    input.addEventListener("input", queryTypeValidation);
});

messageInput.addEventListener("input", messageValidation);

contactInput.addEventListener("input", contactConsentValidation);

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        toggleSuccessWindow();
        resetAllInputValues();
        moveToTopOfThePage();
        setTimeout(toggleSuccessWindow, 3500);
    }
});

resetAllInputValues();
