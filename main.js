function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message"); //Select element inside a given form

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error"); //Remove intial messages
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");

    //Go to parent of input field, select error message element, then set its text content
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error"); 

    //To clear error message
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    // Hide Login form when Create Account button is clicked
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => { //When form is submitted, 
        e.preventDefault();
        
        //Perform AJAX/Fetch login (?)

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => { //Select all input elements and perform action on each
        inputElement.addEventListener("blur", e => { //When user takes focus off input element
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) { //Conditions for marking username as error
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
            //Add other if statements to validate other fields?
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement); //When user starts typing, clear error message
        });
    });
}); 