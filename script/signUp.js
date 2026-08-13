let users = [];
let globalCheckboxValue = false;
const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"

function onloadFunc(){
    showRegister();
}


/**
 * Shows the success popup after a user has signed up
 * and redirects to the login page.
 */
function popUpSucces(){
    const popupWindow = document.getElementById("popupSignupID");
    const backgroundcloud = document.getElementById("blackgroundcloudID");
    backgroundcloud.classList.add("show-overlay");
    popupWindow.classList.add("top-50-percent");
    setTimeout(() => {
        window.location.href = "./index.html";
    }, 2500);
}


/**
 * Handles the sign-up form submission.
 * Validates the input fields, creates the user account,
 * and adds the new user to the contact list.
 *
 * @param {SubmitEvent} event - The submit event triggered by the sign-up form.
 * @returns {Promise<boolean>} Returns true if the sign-up process succeeds, otherwise false.
 */
async function validateForm(event){
    event.preventDefault();
    const inputName = document.forms["signUpForm"]["name"].value;
    const inputMail = document.forms["signUpForm"]["mail"].value;
    const inputPassword = document.forms["signUpForm"]["password"].value;
    const inputRepeat = document.forms["signUpForm"]["repeat"].value;
    const emptyPhoneNumber = "";
    const everyThingisFilled = checkIfEverthingIsFilled(inputName, inputMail, inputPassword, inputRepeat);
    const emailIsValid = checkIfMailIsValid(inputMail);
    const passwordsAreSame = checkIfPasswordsAreSame(inputPassword, inputRepeat);
            if(everyThingisFilled == false || emailIsValid == false || passwordsAreSame == false){
                return false
            }
            await updateSignedUser(inputName, inputMail, inputPassword);  
            await addNewContact(inputName, inputMail, emptyPhoneNumber); 
            return true;
}


/**
 * Checks whether all required sign-up input fields are filled
 * and whether the privacy checkbox is accepted.
 *
 * @param {string} name - The username entered by the user.
 * @param {string} mail - The email address entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {string} repeat - The repeated password entered by the user.
 * @returns {boolean} Returns true if all required fields are filled, otherwise false.
 */
function checkIfEverthingIsFilled(name, mail, password, repeat){
    let everythingIsFilled = true;
    const nameFieldRef = document.getElementById("nameID");
    const nameFieldErrorMessage = document.getElementById("errorMessageNameID");
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMessageMailID");
    const passwordFieldRef = document.getElementById("passwordID");
    const passwordFieldErrorMessage = document.getElementById("errorMessagePasswordID");
    const repeatFieldRef = document.getElementById("repeatID");
    const repeatFieldErrorMessage = document.getElementById("errorMessageRepeatID");
    removeTheRedUnderlineAndErrorMessage();
    everythingIsFilled = checkInputValueAndGenerateErrorMessage(name, nameFieldRef, nameFieldErrorMessage, "Please enter a name") && everythingIsFilled;
    everythingIsFilled = checkInputValueAndGenerateErrorMessage(mail, mailFieldRef, mailFieldErrorMessage, "Please enter a mail") && everythingIsFilled;
    everythingIsFilled = checkInputValueAndGenerateErrorMessage(password, passwordFieldRef, passwordFieldErrorMessage, "Please enter a password!") && everythingIsFilled;
    everythingIsFilled = checkInputValueAndGenerateErrorMessage(repeat, repeatFieldRef, repeatFieldErrorMessage, "Please repeat your password!") && everythingIsFilled;
    everythingIsFilled = checkIfCheckboxIsChecked() && everythingIsFilled;
    return everythingIsFilled;
}


/**
 * Checks whether a single input field contains a value.
 * If the field is empty, an error style and message are shown.
 *
 * @param {string} value - The input value to validate.
 * @param {HTMLElement} fieldRef - The input element that should receive the error styling.
 * @param {HTMLElement} errorRef - The element that displays the error message.
 * @param {string} errorMessage - The error message shown when the field is empty.
 * @returns {boolean} Returns true if the field contains a value, otherwise false.
 */
function checkInputValueAndGenerateErrorMessage(value, fieldRef, errorRef, errorMessage){
    const cleanedValue = value.trim();
    if(cleanedValue === ""){
        fieldRef.classList.add("red-bottom-border");
        errorRef.innerHTML = errorMessage;
        return false;
    }
    return true;
}


/**
 * Checks whether the privacy policy checkbox has been accepted.
 *
 * @returns {boolean} Returns true if the checkbox is checked, otherwise false.
 */
function checkIfCheckboxIsChecked(){
    const checkboxRef = document.getElementById("acceptPolicyID");
    const checkboxFieldErrorMessage = document.getElementById("errorMessageCheckboxID");
    if(globalCheckboxValue == false){
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_unchecked_error.svg)";
        checkboxFieldErrorMessage.innerHTML = "Please accept the Privacy Policy!"
        return false;
    }
    return true;
}


/**
 * Checks whether the entered email address has a valid format.
 *
 * @param {string} mail - The email address entered by the user.
 * @returns {boolean} Returns true if the email address is valid, otherwise false.
 */
function checkIfMailIsValid(mail){
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMessageMailID");
    const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    if (mail !== "" && !emailPattern.test(mail)) {
        mailFieldRef.classList.add("red-bottom-border");
        mailFieldErrorMessage.innerHTML = "Please enter a valid email address.";
        return false;
    }
    return true;
}


/**
 * Removes all input error styles and error messages
 * and resets the checkbox error state.
 */
function removeTheRedUnderlineAndErrorMessage(){
    const nameFieldRef = document.getElementById("nameID");
    const nameFieldErrorMessage = document.getElementById("errorMessageNameID");
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMessageMailID");
    const passwordFieldRef = document.getElementById("passwordID");
    const passwordFieldErrorMessage = document.getElementById("errorMessagePasswordID");
    const repeatFieldRef = document.getElementById("repeatID");
    const repeatFieldErrorMessage = document.getElementById("errorMessageRepeatID");
    nameFieldRef.classList.remove("red-bottom-border");
    mailFieldRef.classList.remove("red-bottom-border");
    passwordFieldRef.classList.remove("red-bottom-border");
    repeatFieldRef.classList.remove("red-bottom-border");
    removeAllErrorMessages(nameFieldErrorMessage, mailFieldErrorMessage, passwordFieldErrorMessage, repeatFieldErrorMessage);
    removeRedCheckbox();
}


/**
 * Clears all error messages for the sign-up input fields.
 *
 * @param {HTMLElement} nameFieldErrorMessage - The error element for the name field.
 * @param {HTMLElement} mailFieldErrorMessage - The error element for the email field.
 * @param {HTMLElement} passwordFieldErrorMessage - The error element for the password field.
 * @param {HTMLElement} repeatFieldErrorMessage - The error element for the repeat-password field.
 */
function removeAllErrorMessages(nameFieldErrorMessage, mailFieldErrorMessage, passwordFieldErrorMessage, repeatFieldErrorMessage){
    nameFieldErrorMessage.innerHTML = "";
    mailFieldErrorMessage.innerHTML = "";
    passwordFieldErrorMessage.innerHTML = "";
    repeatFieldErrorMessage.innerHTML = "";
}


/**
 * Removes the checkbox error message
 * and resets the checkbox icon to its normal state.
 */
function removeRedCheckbox(){
    const checkboxRef = document.getElementById("acceptPolicyID");
    const checkboxFieldErrorMessage = document.getElementById("errorMessageCheckboxID");
    checkboxFieldErrorMessage.innerHTML = "";
    if (!globalCheckboxValue) {
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_unchecked.svg)";
        return;
    } else {
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_checked.svg)";
        return;
    }
    checkboxRef.style.backgroundImage = "url(../../img/checkbox_checked.svg)";
    return;
}


/**
 * Toggles the privacy policy checkbox state
 * and updates the checkbox icon.
 */
function toggleThePrivacyCheckbox(){
    const checkBoxRef = document.getElementById("acceptPolicyID");
    if(globalCheckboxValue === false){
        globalCheckboxValue = true;
        checkBoxRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
    } else{
        globalCheckboxValue = false;
        checkBoxRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
    }
}


/**
 * Checks whether the entered password and repeated password are identical.
 *
 * @param {string} password - The password entered by the user.
 * @param {string} repeat - The repeated password entered by the user.
 * @returns {boolean} Returns true if both passwords match, otherwise false.
 */
function checkIfPasswordsAreSame(password, repeat){
    const passwordRef = document.getElementById("passwordID");
    const repeatRef = document.getElementById("repeatID");
    const contentRef = document.getElementById("errorMessageRepeatID");
    if(password != repeat){
        passwordRef.classList.add("red-bottom-border");
        repeatRef.classList.add("red-bottom-border");
        contentRef.innerHTML = "Your passwords don't match. Please try again."
        return false; 
    }
    return true;
}


/**
 * Updates the password icons depending on whether the password field is empty or filled.
 */
function iconSwitch(){
    const iconRef = document.getElementById("lockIconID");
    const repeatIconRef = document.getElementById("repeatlockIconID");
    const passwordValue = document.forms["signUpForm"]["password"].value;
    if(passwordValue != ""){
        iconRef.classList.add("clickable-icon");
        repeatIconRef.classList.add("clickable-icon");
        changePasswordIcon(iconRef, repeatIconRef, "./img/register/visibility_off.svg");
    }
    if(passwordValue === ""){
        iconRef.classList.remove("clickable-icon");
        repeatIconRef.classList.remove("clickable-icon");
        changePasswordIcon(iconRef, repeatIconRef, "./img/register/lock.svg");
    }
}


/**
 * Updates both password icons with the same image source.
 *
 * @param {HTMLImageElement} iconRef - The icon element of the password field.
 * @param {HTMLImageElement} repeatIconRef - The icon element of the repeat-password field.
 * @param {string} imgSource - The image path that should be applied to both icons.
 */
function changePasswordIcon(iconRef, repeatIconRef, imgSource){
    iconRef.src = imgSource;
    repeatIconRef.src = imgSource;
}


/**
 * Toggles both password fields between hidden and visible text
 * and updates the related icons.
 */
function showAndHidePassword(){
    const passwordRef = document.getElementById("passwordID");
    const iconRef = document.getElementById("lockIconID");
    const repeatRef = document.getElementById("repeatID");
    const repeatIconRef = document.getElementById("repeatlockIconID");
    if (passwordRef.type === "password") {
        changeTextType(passwordRef, repeatRef, iconRef, repeatIconRef, "./img/register/visibility.svg", "text")
        return;
    }
    if(passwordRef.type === "text"){
        changeTextType(passwordRef, repeatRef, iconRef, repeatIconRef, "./img/register/visibility_off.svg", "password")
        return;
    }
}


/**
 * Changes the input type and icon of both password fields at the same time.
 *
 * @param {HTMLInputElement} passwordRef - The main password input field.
 * @param {HTMLInputElement} repeatRef - The repeat-password input field.
 * @param {HTMLImageElement} iconRef - The icon element of the password field.
 * @param {HTMLImageElement} repeatIconRef - The icon element of the repeat-password field.
 * @param {string} imgSource - The image path that should be applied to both icons.
 * @param {string} textType - The input type to apply, for example "text" or "password".
 */
function changeTextType(passwordRef, repeatRef, iconRef, repeatIconRef, imgSource, textType){
    iconRef.src = imgSource;
    passwordRef.type = textType;
    repeatIconRef.src = imgSource;
    repeatRef.type = textType;
}