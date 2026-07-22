/**
 * Checks whether both login input fields are filled.
 * If one or both fields are empty, error messages are shown and the login process is stopped.
 * 
 * @param {string} - The email entered by the user.
 * @param {string} - The password entered by the user.
 * @returns {boolean} Returns true if both fields contain values, otherwise false.
 */
function checkIfEmailAndPasswordFieldIsFilled(mail, password){
    let everyThingisFilled = true;
    const emailRef = document.getElementById("emailID");
    const passwordRef = document.getElementById("passwordID");
    const emailErrorMessage = document.getElementById("mailErrorID");
    const passwordErrorMessage = document.getElementById("passwordErrorID");
    clearErrormessagesAndRedlines();
    everyThingisFilled = checkIfSomethingInTheInput(emailRef, emailErrorMessage, mail, "Please give your Email!");
    everyThingisFilled = checkIfSomethingInTheInput(passwordRef, passwordErrorMessage, password, "Please give your Password!") && everyThingisFilled;
    return everyThingisFilled;
}


/**
 * Checks whether a single input field contains a value.
 * If the field is empty, an error message is displayed and the input is highlighted.
 * 
 * @param {HTMLElement} contentRef - The input element to validate.
 * @param {HTMLElement} errorRef - The element used to display the error message.
 * @param {string} inputValue - The current value of the input field.
 * @param {string} errorMessage - The error message shown when the field is empty.
 * @returns {boolean} Returns true if the field is filled, otherwise false.
 */
function checkIfSomethingInTheInput(contentRef, errorRef, inputValue, errorMessage){
    const cleanedinputValue = inputValue.trim();
    if(cleanedinputValue === ""){
        errorRef.innerHTML = errorMessage;
        contentRef.classList.add("inputfield-error-login");
        return false;
    }else 
        return true;
}


/**
 * Checks whether the user is registered and whether the entered password is correct.
 * 
 * @param {string} mail - The email entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {object} users - The list of registered users loaded from the database.
 * @returns {boolean} Returns true if the user exists and the password is correct, otherwise false.
 */
function CheckIfUserIsRegisteredAndIfPasswordIsCorrect(mail, password, users){
    const userIsFound = searchRegisteredUserMail(users, mail);
    const passwordIsCorrect = checkIfPasswordIsCorrect(password) && userIsFound;
    if(passwordIsCorrect){
        return true;
    }else 
    return false;
}


/**
 * Searches the registered users for the entered email address.
 * If a matching user is found, the user's password and user object are stored for the login flow.
 * If no matching user is found, an error message is displayed.
 *
 * @param {object[]} users - The list of registered users.
 * @param {string} mail - The email entered by the user.
 * @returns {boolean} Returns true if the email address exists, otherwise false.
 */
function searchRegisteredUserMail(users, mail){
    const emailRef = document.getElementById("emailID");
    const emailErrorMessage = document.getElementById("mailErrorID");
    for (let index = 0; index < users.length; index++) {
            const currentMail = users[index].email;
            if(mail === currentMail){
                correctPassword = users[index].password;
                globalUserObject = users[index];
                return true;
            }
    }
    emailErrorMessage.innerHTML = "User is not registered!";
    emailRef.classList.add("inputfield-error-login");
    return false;
}


/**
 * Checks whether the entered password matches the password
 * of the previously identified registered user.
 *
 * @param {string} inputPassword - The password entered by the user.
 * @returns {boolean} Returns true if the password is correct, otherwise false.
 */
function checkIfPasswordIsCorrect(inputPassword){
    const passwordRef = document.getElementById("passwordID");
    const passwordErrorMessage = document.getElementById("passwordErrorID");
    if(inputPassword === correctPassword){
        return true;
    }
    passwordErrorMessage.innerHTML = "Password is wrong!";
    passwordRef.classList.add("inputfield-error-login");
    return false;
}


/**
 * Clears all login error messages and removes the error styling from the input fields.
 */
function clearErrormessagesAndRedlines(){
    const emailRef = document.getElementById("emailID");
    const passwordRef = document.getElementById("passwordID");
    const emailErrorMessage = document.getElementById("mailErrorID");
    const passwordErrorMessage = document.getElementById("passwordErrorID");
    emailRef.classList.remove("inputfield-error-login");
    passwordRef.classList.remove("inputfield-error-login");
    emailErrorMessage.innerHTML = "";
    passwordErrorMessage.innerHTML = "";
}