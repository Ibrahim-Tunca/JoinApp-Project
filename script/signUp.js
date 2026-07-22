let users = [];

let globalCheckboxValue = false;

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


function onloadFunc(){
    showRegister();
}


/**
 * This is a simple random number generator 
 * 
 * @param {number} - the max value of the generated random number
 * @returns 
 */


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/**
 * This function shows a popupmessage if the registration was succesfull
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
 * This function is the main sign up function. If the other functions are all true, the user will be registratet with the given inputvalues.
 * 
 * @param {event} - This function works onsubmit when the user have clicked the sign up button.
 * @returns - true when the signup was succesfull and opens the Loginpage. When the sign up was failed, the functions returns false and came some errermessages in the App.
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
 * This function is used to check if every inputfield is filled.
 * 
 * @param {string} name - this is the name that the user want to take
 * @param {string} mail - this is the emailadress from the user
 * @param {string} password - this is the password that the user want to take 
 * @param {string} repeat - this is again the same password to help the user that he doenst make a mistake while he is writing
 * @returns - If one of these inputfields not filled, the form doesnt work and the user became a message why not
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
 * This function check a single inputfield if the field are filled. If the pickedfield is not fielled, a errormessage will be generated
 * 
 * @param {string} value - the value that the user write on name, email and password
 * @param {*} fieldRef 
 * @param {*} errorRef 
 * @param {string} errorMessage - the string is individuel and a message that the user can read and understand what is missing in the form
 * @returns - returns false when the user dont fill the input
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
 * a simple function to check if the user has checked the checkbox
 * 
 * @returns returns false when the user didnt agree with the privacy policy
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
 * a function to check if the emailadress is a valid emailadress with chars like "@" and the dots are in the right positions
 * 
 * @param {string} - the value that the users own emailadress 
 * @returns 
 */


function checkIfMailIsValid(mail){
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMessageMailID");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mail !== "" && !emailPattern.test(mail)) {
        mailFieldRef.classList.add("red-bottom-border");
        mailFieldErrorMessage.innerHTML = "Please enter a valid email address.";
        return false;
    }

    return true;
}


/**
 * This function is used to remove all errormessages and all redlines and redchackbox
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
    nameFieldErrorMessage.innerHTML = "";
    mailFieldErrorMessage.innerHTML = "";
    passwordFieldErrorMessage.innerHTML = "";
    repeatFieldErrorMessage.innerHTML = "";
    removeRedCheckbox()
}


/**
 * This function removes only the red checkbox and the errormessage at the checkbox
 */


function removeRedCheckbox(){
    const checkboxRef = document.getElementById("acceptPolicyID");
    const checkboxFieldErrorMessage = document.getElementById("errorMessageCheckboxID");
    checkboxFieldErrorMessage.innerHTML = "";
    if (!globalCheckboxValue) {
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_unchecked.svg)";
    } else {
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_checked.svg)";
    }
    checkboxRef.style.backgroundImage = "url(../../img/checkbox_checked.svg)";
}


/**
 * This function toggle the globalcheckboxvalue and add a checkmark when the globalvalue is true
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
 * This function checks if the both passwords which the user has write is same
 * 
 * @param {string} - the first input (password) which the user has write 
 * @param {string} - the second input (repeatpassword) which the user has write
 * @returns - returns true if the both passwords are same und false when the each input is different
 */


function checkIfPasswordsAreSame(password, repeat){
    const passwordRef = document.getElementById("passwordID");
    const repeatRef = document.getElementById("repeatID");
    const contentRef = document.getElementById("errorMessageRepeatID");

    if(password != repeat){
        removeTheRedUnderlineAndErrorMessage();
        passwordRef.classList.add("red-bottom-border");
        repeatRef.classList.add("red-bottom-border");
        contentRef.innerHTML = "Your passwords don't match. Please try again."
        return false; 
    }

    return true;
}


/**
 * This function is only to be used to switch the icon from uncovericon and covericon.
 */


function iconSwitch(){
    const iconRef = document.getElementById("lockIconID");
    const repeatIconRef = document.getElementById("repeatlockIconID");
    const passwordRef = document.getElementById("passwordID");
    const repeatRef = document.getElementById("repeatID");
    const containerRef = document.getElementById("inputfieldPasswordContainerID");
    const passwordValue = document.forms["signUpForm"]["password"].value;
    if(passwordValue != ""){
        iconRef.src = "./img/register/visibility_off.svg"
        iconRef.classList.add("clickable-icon");
        repeatIconRef.src = "./img/register/visibility_off.svg"
        repeatIconRef.classList.add("clickable-icon");
    }
    if(passwordValue === ""){
        iconRef.classList.remove("clickable-icon");
        iconRef.src = "./img/register/lock.svg"
        repeatIconRef.classList.remove("clickable-icon");
        repeatIconRef.src = "./img/register/lock.svg"
    }
}


/**
 * This function hide and show the password input. It switches from dots to text and text to dots. 
 * 
 * @returns returns nothing. Return stops the function
 */


function showAndHidePassword(){
    const passwordRef = document.getElementById("passwordID");
    const iconRef = document.getElementById("lockIconID");
    const repeatRef = document.getElementById("repeatID");
    const repeatIconRef = document.getElementById("repeatlockIconID");

    if (passwordRef.type === "password") {
        iconRef.src = "./img/register/visibility.svg"
        passwordRef.type = "text";
        repeatIconRef.src = "./img/register/visibility.svg"
        repeatRef.type = "text";
        return;
    }

    if(passwordRef.type === "text"){
        iconRef.src = "./img/register/visibility_off.svg"
        passwordRef.type = "password";
        repeatIconRef.src = "./img/register/visibility_off.svg"
        repeatRef.type = "password";
        return;
    }
}


function getContactColorType(){
    let randomNumber = getRandomInt(100);
    const colorCode = randomNumber % 15;  

    if(colorCode === 0){
        return "ocker";
    }
    if(colorCode === 1){
        return "yellow";
    }
    if(colorCode === 2){
        return "orange";
    }
    if(colorCode === 3){
        return "red";
    }
    if(colorCode === 4){
        return "salmon";
    }
    if(colorCode === 5){
        return "creme";
    }
    if(colorCode === 6){
        return "lila";
    }
    if(colorCode === 7){
        return "lavender";
    }
    if(colorCode === 8){
        return "violette";
    }
    if(colorCode === 9){
        return "pink";
    }
    if(colorCode === 10){
        return "magenta";
    }
    if(colorCode === 11){
        return "blue";
    }
    if(colorCode === 12){
        return "turquoise";
    }
    if(colorCode === 13){
        return "babyblue";
    }
    if(colorCode === 14){
        return "lime";
    }
}