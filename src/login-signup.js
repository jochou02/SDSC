setFormMessage= (formElement, type, message) => {
    const messageElement = formElement.querySelector(".form__message"); //Select element inside a given form

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error"); //Remove intial messages
    messageElement.classList.add(`form__message--${type}`);
}

setInputError = (inputElement, message) => {
    inputElement.classList.add("form__input--error");

    //Go to parent of input field, select error message element, then set its text content
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

clearInputError = inputElement => {
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
            //Marking name (first or last) as error
            if ((e.target.id === "first-name" 
                || e.target.id === "last-name") 
                && e.target.value.length > 0 
                && e.target.value.length == 1) {
                setInputError(inputElement, "Invalid name");
            } else {
                //Change back to light grey border after valid name is entered
                e.target.id.style.borderColor = "lightgrey";
            }

            //Marking email as error
            if (e.target.id === "email" 
                && e.target.value.length > 0
                && e.target.value.length < 10) {
                setInputError(inputElement, "Invalid email");
            } else {
                //Change back to light grey border after valid email is entered
                email.style.borderColor = "lightgrey";
            }
            
            //Marking Discord as error
            if (e.target.id === "discord" 
                && e.target.value.length > 0
                && e.target.value.length < 6) {
                setInputError(inputElement, "Invalid Discord");
            } else {
                discord.style.borderColor = "lightgrey";
            }

        });

        inputElement.addEventListener("input", e => {
            e.preventDefault();
            clearInputError(inputElement); //When user starts typing, clear error message
        });
    });
}); 

checkEmail = () => {
    const email = document.querySelector("#email");
    //Regular expression to check if email ends in ucsd.edu
    let regExp =  /^[a-z]+@+ucsd.edu$/;
    //If it matches, green border
    //Else, red border
    if(email.value.match(regExp)) {
        email.style.borderColor = "#27ae60";
    } else {
        email.style.borderColor = "#e74c3c";
    }
    //If field is empty, reset to default grey border
    if(email.value == "") {
        email.style.borderColor = "lightgrey";
    }
}

checkDiscord = () => {
    const discord = document.querySelector("#discord");
    //Regular expression to check Discord tag
    let regExp =  /^[a-z]+#+[0-9]{4}$/;
    //If it matches, green border
    //Else, red border
    if(discord.value.match(regExp)) {
        discord.style.borderColor = "#27ae60";
    } else {
        discord.style.borderColor = "#e74c3c";
    }
    //If field is empty, reset to default grey border
    if(discord.value == "") {
        discord.style.borderColor = "lightgrey";
    }
}