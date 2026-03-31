let users = [];

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


async function showRegister(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});
    console.log(users);
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

    let emailRef = document.getElementById("emailID");
    let passwordRef = document.getElementById("passwordID");
    let errorRef = document.getElementById("errorID");

    const fieldsAreFilled = checkIfEmailAndPasswordFieldIsFilled(inputMail, inputPassword, errorRef, emailRef, passwordRef);

    if(!fieldsAreFilled){
        return false;
    }

    const userFound = CheckIfUserIsRegisteredAndIfPasswordIsCorrect(inputMail, inputPassword, users, errorRef, emailRef, passwordRef);

        return userFound;
}


function checkIfEmailAndPasswordFieldIsFilled(mail, password, errorRef, emailRef, passwordRef){

    emailRef.classList.remove("inputfield-error-login");
    passwordRef.classList.remove("inputfield-error-login");

    if(mail === ""){
        errorRef.innerHTML = "Please give your Email!";
        emailRef.classList.add("inputfield-error-login");
        return false;
    }

    if(password === ""){
        errorRef.innerHTML = "Please give your Password!";
        passwordRef.classList.add("inputfield-error-login");
        return false;
    }

    return true;
}

function CheckIfUserIsRegisteredAndIfPasswordIsCorrect(mail, password, users, errorRef, emailRef, passwordRef){

    emailRef.classList.remove("inputfield-error-login");
    passwordRef.classList.remove("inputfield-error-login");

    for (let index = 0; index < users.length; index++) {
        const currentUser = users[index];
        let passwordCheck;
        if(currentUser.email === mail){
            passwordCheck = checkIfPasswordIsCorrect(password, currentUser.password);
            if(!passwordCheck){
                errorRef.innerHTML = "Password is wrong!";
                passwordRef.classList.add("inputfield-error-login");
            }
            return passwordCheck;
        }   
    }
    errorRef.innerHTML = "User is not registered!";
    emailRef.classList.add("inputfield-error-login");
    return false;
}


function checkIfPasswordIsCorrect(password, currentUserpassword){
    if(password === currentUserpassword){
        return true;
    }
    return false;
}










