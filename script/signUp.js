let users = [];

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

    let popupWindow = document.getElementById("popupSignupID");
    let backgroundcloud = document.getElementById("blackgroundcloudID");

    backgroundcloud.classList.add("show-overlay");
    popupWindow.classList.add("top-50-percent");


    setTimeout(() => {
        window.location.href = "./summary.html";
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

    let inputName = document.forms["signUpForm"]["name"].value;
    let inputMail = document.forms["signUpForm"]["mail"].value;
    let inputPassword = document.forms["signUpForm"]["password"].value;
    let inputRepeat = document.forms["signUpForm"]["repeat"].value;
    let inputCheckbox = document.forms["signUpForm"]["checkbox"].checked;

    const emptyPhoneNumber = "";

    const everyThingisFilled = checkIfEverthingIsFilled(inputName, inputMail, inputPassword, inputRepeat, inputCheckbox);
    const passwordsAreSame = checkIfPasswordsAreSame(inputPassword, inputRepeat);

            if(everyThingisFilled == false || passwordsAreSame == false){
                console.error("irgendetwas stimmt hier nicht!");
                return false
            }


            await updateSignedUser(inputName, inputMail, inputPassword);  
            await addNewContact(inputName, inputMail, emptyPhoneNumber); 
                
            return true;
}


function checkIfEverthingIsFilled(name, mail, password, repeat, checkbox){

    let repeatRef = document.getElementById("repeatID");
    let contentRef = document.getElementById("errorID");

    if(name === "" || mail === "" || password === "" || repeat === "" || checkbox == false){

        repeatRef.classList.toggle("inputfield-repeat-signup");
        repeatRef.classList.toggle("inputfield-repeat-error-signup");
        contentRef.innerHTML = "Please fill everything out!"

        return false;
    }

    return true;
}


function checkIfPasswordsAreSame(password, repeat){

    let repeatRef = document.getElementById("repeatID");
    let contentRef = document.getElementById("errorID");

    if(password != repeat){

        repeatRef.classList.toggle("inputfield-repeat-signup");
        repeatRef.classList.toggle("inputfield-repeat-error-signup");

        contentRef.innerHTML = "Your passwords d'ont match. Please try again."

        return false; 
    }

    return true;
}

function getContactColorType(){
    let randomNumber = getRandomInt(100);
    const colorCode = randomNumber % 8;  

    if(colorCode === 0){
        return "orange";
    }
    if(colorCode === 1){
        return "lila";
    }
    if(colorCode === 2){
        return "lavander";
    }
    if(colorCode === 3){
        return "violette";
    }
    if(colorCode === 4){
        return "pink";
    }
    if(colorCode === 5){
        return "yellow";
    }
    if(colorCode === 6){
        return "turquoise";
    }
    if(colorCode === 7){
        return "red";
    }
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

