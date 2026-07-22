let users = [];
let globalUserObject;
let correctPassword;
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
                setDataToLocalStorage(globalUserObject);
                loginSuccesPopup();
            }
        }
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






