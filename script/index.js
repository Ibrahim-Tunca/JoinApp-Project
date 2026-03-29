let users = [];

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"

async function loadData(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    
}

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

    const userFound = CheckIfUserIsRegisteredAndIfPasswordIsCorrect(inputMail, inputPassword, users);


    if(inputMail === ""){
        return true;
    }

        console.log("User: ", inputMail); 
        console.log("Input: ", inputPassword);
        console.log("user wurde gefunden: ", userFound);

        return false;
}





function CheckIfUserIsRegisteredAndIfPasswordIsCorrect(mail, password, users){

    for (let index = 0; index < users.length; index++) {
        const currentUser = users[index];
        let passwordCheck;
        if(currentUser.email === mail){
            passwordCheck = checkIfPasswordIsCorrect(password, currentUser.password);
            return passwordCheck;
        }   
    }
    return false;
}


function checkIfPasswordIsCorrect(password, currentUserpassword){
    if(password === currentUserpassword){
        console.log("Input: ", currentUserpassword);
        console.log("Password: ", currentUserpassword);
        return true;
    }
    return false;
}










