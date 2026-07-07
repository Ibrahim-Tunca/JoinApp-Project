let users = [];

let globalCheckboxValue = false;

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


function onloadFunc(){
    showRegister();
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


async function showRegister(){
    let response = await fetch(BASE_URL + ".json")
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});

    console.log(users);
}


async function updateSignedUser(name, mail, password) {
    let userExists = await checkIfUserExist(name);

    if(userExists){
        let contentRef = document.getElementById("errorID");
        contentRef.innerHTML = "This User already eexists!"

        return;
    }else {
        popUpSucces();
        return await putData("/user/" + name, {
        userName: name,
        email: mail,
        password: password,
        });
    }
}


function popUpSucces(){
    const popupWindow = document.getElementById("popupSignupID");
    const backgroundcloud = document.getElementById("blackgroundcloudID");

    backgroundcloud.classList.add("show-overlay");
    popupWindow.classList.add("top-50-percent");

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 2500);
}


async function checkIfUserExist(inputUsername){
    let response = await fetch(BASE_URL + "user.json")
    let responseToJson = await response.json();

    if(!responseToJson) return false;
    users = Object.values(responseToJson || {});

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        
        if(element.userName === inputUsername){
            return true;
        }
    }
    return false;
}


async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });  
}


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

    const checkboxRef = document.getElementById("acceptPolicyID");
    const checkboxFieldErrorMessage = document.getElementById("errorMessageCheckboxID");

    removeTheRedUnderlineAndMessage();

    if(name === ""){
        nameFieldRef.classList.add("red-bottom-border");
        nameFieldErrorMessage.innerHTML = "Please enter your name!"
        everythingIsFilled = false;
    }
    if(mail === ""){
        mailFieldRef.classList.add("red-bottom-border");
        mailFieldErrorMessage.innerHTML = "Please enter your mail!"
        everythingIsFilled = false;
    }
    if(password === ""){
        passwordFieldRef.classList.add("red-bottom-border");
        passwordFieldErrorMessage.innerHTML = "Please enter a password!"
        everythingIsFilled = false;
    }
    if(repeat === ""){
        repeatFieldRef.classList.add("red-bottom-border");
        repeatFieldErrorMessage.innerHTML = "Please repeat your password!"
        everythingIsFilled = false;
    }
    if(globalCheckboxValue == false){
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_unchecked_error.svg)";
        checkboxFieldErrorMessage.innerHTML = "Please accept the Privacy Policy!"
        everythingIsFilled = false;
    }

    return everythingIsFilled;
}


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


function removeTheRedUnderlineAndMessage(){
    const nameFieldRef = document.getElementById("nameID");
    const nameFieldErrorMessage = document.getElementById("errorMessageNameID");
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMessageMailID");
    const passwordFieldRef = document.getElementById("passwordID");
    const passwordFieldErrorMessage = document.getElementById("errorMessagePasswordID");
    const repeatFieldRef = document.getElementById("repeatID");
    const repeatFieldErrorMessage = document.getElementById("errorMessageRepeatID");

    const checkboxRef = document.getElementById("acceptPolicyID");
    const checkboxFieldErrorMessage = document.getElementById("errorMessageCheckboxID");

    nameFieldRef.classList.remove("red-bottom-border");
    mailFieldRef.classList.remove("red-bottom-border");
    passwordFieldRef.classList.remove("red-bottom-border");
    repeatFieldRef.classList.remove("red-bottom-border");
    
    nameFieldErrorMessage.innerHTML = "";
    mailFieldErrorMessage.innerHTML = "";
    passwordFieldErrorMessage.innerHTML = "";
    repeatFieldErrorMessage.innerHTML = "";
    checkboxFieldErrorMessage.innerHTML = "";

    if(!globalCheckboxValue){
        checkboxRef.style.backgroundImage = "url(../../img/checkbox_unchecked.svg)";
    }
    checkboxRef.style.backgroundImage = "url(../../img/checkbox_checked.svg)";
}


function toggleThePrivacyCheckbox(){
    const checkBoxRef = document.getElementById("acceptPolicyID");

    if(globalCheckboxValue === false){
        globalCheckboxValue = true;
        checkBoxRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
        return;
    }

    if(globalCheckboxValue === true){
        globalCheckboxValue = false;
        checkBoxRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
        return;
    }
    
}


function checkIfPasswordsAreSame(password, repeat){
    const passwordRef = document.getElementById("passwordID");
    const repeatRef = document.getElementById("repeatID");
    const contentRef = document.getElementById("errorMessageRepeatID");

    if(password != repeat){
        removeTheRedUnderlineAndMessage();
        passwordRef.classList.add("red-bottom-border");
        repeatRef.classList.add("red-bottom-border");
        contentRef.innerHTML = "Your passwords don't match. Please try again."
        return false; 
    }

    return true;
}


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