let users = [];

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


function onloadFunc(){
    showRegister();
}


async function showRegister(){
    let response = await fetch(BASE_URL + ".json")
    let responseToJson = await response.json();

    users = Object.values(responseToJson || {});

    console.log(users);
}


async function updateUser(name, mail, password) {

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
        password: password
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
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}


async function validateForm(event){
    event.preventDefault();

    let inputName = document.forms["signUpForm"]["name"].value;
    let inputMail = document.forms["signUpForm"]["mail"].value;
    let inputPassword = document.forms["signUpForm"]["password"].value;
    let inputRepeat = document.forms["signUpForm"]["repeat"].value;
    let inputCheckbox = document.forms["signUpForm"]["checkbox"].checked;

    const everyThingisFilled = checkIfEverthingIsFilled(inputName, inputMail, inputPassword, inputRepeat, inputCheckbox);
    const passwordsAreSame = checkIfPasswordsAreSame(inputPassword, inputRepeat);

            if(everyThingisFilled == false || passwordsAreSame == false){
                console.error("irgendetwas stimmt hier nicht!");
                return false
            }


            await updateUser(inputName, inputMail, inputPassword);   
                
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





