let users = [];


const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


async function showRegister(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});
    console.log(users[2]);
}


function onloadFunc(){
    showRegister();
}


async function validateForm(event){
    event.preventDefault();

    let response = await fetch(BASE_URL + "user.json");
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});

    let inputMail = document.forms["loginForm"]["mail"].value;
    let inputPassword = document.forms["loginForm"]["password"].value;

    checkIfEmailAndPasswordFieldIsFilled(inputMail, inputPassword);
    
        if(checkIfEmailAndPasswordFieldIsFilled){
            const userFound = CheckIfUserIsRegisteredAndIfPasswordIsCorrect(inputMail, inputPassword, users);
            if(userFound){
                loginSuccesPopup();
            }
        }
      
}


function checkIfEmailAndPasswordFieldIsFilled(mail, password){
    let everyThingisFilled = true;

    const emailRef = document.getElementById("emailID");
    const passwordRef = document.getElementById("passwordID");

    const emailErrorMessage = document.getElementById("mailErrorID");
    const passwordErrorMessage = document.getElementById("passwordErrorID");
    clearErrormessagesAndRedlines();

    if(mail === ""){
        emailErrorMessage.innerHTML = "Please give your Email!";
        emailRef.classList.add("inputfield-error-login");
        everyThingisFilled = false;
    }
    if(password === ""){
        passwordErrorMessage.innerHTML = "Please give your Password!";
        passwordRef.classList.add("inputfield-error-login");
        everyThingisFilled = false;
    }
    return everyThingisFilled;
}

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


function CheckIfUserIsRegisteredAndIfPasswordIsCorrect(mail, password, users){
    const emailRef = document.getElementById("emailID");
    const passwordRef = document.getElementById("passwordID");
    
    const emailErrorMessage = document.getElementById("mailErrorID");
    const passwordErrorMessage = document.getElementById("passwordErrorID");

    for (let index = 0; index < users.length; index++) {
        const currentUser = users[index];
        let passwordCheck;
        if(currentUser.email === mail){
            passwordCheck = checkIfPasswordIsCorrect(password, currentUser.password);
            if(!passwordCheck){
                passwordErrorMessage.innerHTML = "Password is wrong!";
                passwordRef.classList.add("inputfield-error-login");
            }
            setDataToLocalStorage(currentUser);
            return passwordCheck;
        }   
    }
    emailErrorMessage.innerHTML = "User is not registered!";
    emailRef.classList.add("inputfield-error-login");
    return false;
}


function setDataToLocalStorage(inputObject){
    const objectString = JSON.stringify(inputObject);
    localStorage.setItem("userData", objectString);
}


function guestLogin(){
    const object = {email: "guestemail@hotmail.com", password: "guest1", userName: "guest"};
    const objectString = JSON.stringify(object);
    localStorage.setItem("userData", objectString);
}


function checkIfPasswordIsCorrect(password, currentUserpassword){
    if(password === currentUserpassword){
        return true;
    }
    return false;
}


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


function loginSuccesPopup(){
    const popupWindow = document.getElementById("loginSuccesPopupID");
    const backgroundcloud = document.getElementById("blackgroundcloudID");

    backgroundcloud.classList.add("show-overlay");
    popupWindow.classList.add("top-50-percent");

    setTimeout(() => {
        window.location.href = "./summary.html";
    }, 2500);
}

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






