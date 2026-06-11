function checkIfUserIsLogged(){
    return localStorage.getItem("userData") !== null;
}


function setNameInitialButton(){
    const userIsLogged = checkIfUserIsLogged();
    
    if(!userIsLogged){
        return;
    }
    
    const userDataString = localStorage.getItem("userData")
    const userData = JSON.parse(userDataString);
    let userInitialRef = document.getElementById("userInitialButtonID");
    
    const userName = userData.userName;
    const userInitial = userName.charAt(0).toUpperCase();
    userInitialRef.innerHTML = userInitial; 
}

