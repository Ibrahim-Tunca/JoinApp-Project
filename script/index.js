let users = [];
const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


/**
 * Fetches registered users from the database and logs one entry to the console.
 * This function is only used for debugging.
 */
async function showRegister(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});
    console.log(users[2]);
}


/**
 * Runs when the page loads and triggers the initial user fetch
 */
function onloadFunc(){
    showRegister();
}


/**
 * Handles the login form submission.
 * Prevents the default form behavior, loads user data, validates the inputs,
 * and starts the login flow if the credentials are correct
 * 
 * @param {SubmitEvent} - The submit event triggered by the login form.
 */
async function validateForm(event){
    event.preventDefault();
    const response = await fetch(BASE_URL + "user.json");
    const responseToJson = await response.json();
    const users = Object.values(responseToJson || {});
    const inputMail = document.forms["loginForm"]["mail"].value;
    const inputPassword = document.forms["loginForm"]["password"].value;
    checkIfEmailAndPasswordFieldIsFilled(inputMail, inputPassword);
        if(checkIfEmailAndPasswordFieldIsFilled){
            const userFound = CheckIfUserIsRegisteredAndIfPasswordIsCorrect(inputMail, inputPassword, users);
            if(userFound){
                loginSuccesPopup();
            }
        }
}


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


/**
 * Checks whether the user is registered and whether the entered password is correct.
 * 
 * @param {string} mail - The email entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {object} users - The list of registered users loaded from the database.
 * @returns {boolean} Returns true if the user exists and the password is correct, otherwise false.
 */
function CheckIfUserIsRegisteredAndIfPasswordIsCorrect(mail, password, users){
    let correctPassword;
    let userIsFound = searchRegisteredUserMail(users, mail);
    let passwordIsCorrect = checkIfPasswordIsCorrect(password) && userIsFound;
    if(passwordIsCorrect){
        return true;
    }else 
    return false;
}


/**
 * Searches the registered users for the entered email address.
 * If no matching user is found, an error message is displayed.
 * 
 * @param  {object} users - The list of registered users.
 * @param {string} inputMail - The email entered by the user. 
 * @returns {boolean} Returns true if the email address exists, otherwise false.
 */
function searchRegisteredUserMail(users, inputMail){
    const emailRef = document.getElementById("emailID");
    const emailErrorMessage = document.getElementById("mailErrorID");
    for (let index = 0; index < users.length; index++) {
            const currentMail = users[index].email;
            if(inputMail === currentMail){
                correctPassword = users[index].password;
                return true;
            }
    }
    emailErrorMessage.innerHTML = "User is not registered!";
    emailRef.classList.add("inputfield-error-login");
    return false;
}


/**
 * Checks whether the entered password matches the password of the registered user.
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
 * Stores the logged-in user's data in the browser's local storage.
 * 
 * @param {object} inputObject - The user data to store, for example email, username, and password.
 */
function setDataToLocalStorage(inputObject){
    const objectString = JSON.stringify(inputObject);
    localStorage.setItem("userData", objectString);
}


/**
 * Stores the guest account data in local storage to log the user in as a guest.
 */
function guestLogin(){
    const object = {email: "guestemail@hotmail.com", password: "guest1", userName: "guest"};
    const objectString = JSON.stringify(object);
    localStorage.setItem("userData", objectString);
}


/**
 * Updates the password field icon depending on whether the password input is empty or filled.
 */
function iconSwitch(){
    const iconRef = document.getElementById("lockIconID");
    const passwordRef = document.getElementById("passwordID");
    const containerRef = document.getElementById("inputfieldPasswordContainerID");
    const passwordValue = document.forms["loginForm"]["password"].value;
    if(passwordValue != ""){
        iconRef.src = "./img/register/visibility_off.svg"
        iconRef.classList.add("clickable-icon");
    }
    if(passwordValue === ""){
        iconRef.classList.remove("clickable-icon");
        iconRef.src = "./img/register/lock.svg"
    }
}


/**
 * Toggles the password field between hidden and visible text
 * and updates the icon accordingly. 
 */
function showAndHidePassword(){
    const passwordRef = document.getElementById("passwordID");
    const iconRef = document.getElementById("lockIconID");
    if (passwordRef.type === "password") {
        iconRef.src = "./img/register/visibility.svg"
        passwordRef.type = "text";
        return;
    }
    if(passwordRef.type === "text"){
        iconRef.src = "./img/register/visibility_off.svg"
        passwordRef.type = "password";
        return;
    }
}


/**
 * Displays the login success popup and redirects the user to the summary page.
 */
function loginSuccesPopup(){
    const popupWindow = document.getElementById("loginSuccesPopupID");
    const backgroundcloud = document.getElementById("blackgroundcloudID");

    backgroundcloud.classList.add("show-overlay");
    popupWindow.classList.add("top-50-percent");

    setTimeout(() => {
        window.location.href = "./summary.html";
    }, 2500);
}


/**
 * Starts the intro animation shown when the page is opened.
 */
function startingAnimation(){
    const blueCloudRef = document.getElementById("blueBackgroundCloudID");
    const joinLogoRef = document.getElementById("joinLogoID");

    setTimeout(() => {
        blueCloudRef.classList.add("hide-overlay");
        joinLogoRef.classList.remove("white-big-join-icon-login");
        joinLogoRef.classList.add("blue-join-icon-login");
        joinLogoRef.src="./img/Capa 2.svg";
    }, 1000);
}






