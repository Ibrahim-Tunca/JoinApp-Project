function checkIfUserIsLogged(){
    return localStorage.getItem("userData") !== null;
}


function setNameInitialButton(){
    const userIsLogged = checkIfUserIsLogged();
    
    if(!userIsLogged){
        window.location.href="http://ibrahim-tunca.developerakademie.net/index.html";
        return;
    }
    
    const userDataString = localStorage.getItem("userData");
    console.log(userDataString);
    const userData = JSON.parse(userDataString);
    let userInitialRef = document.getElementById("userInitialButtonID");
    
    const userName = userData.userName;
    const userInitial = userName.charAt(0).toUpperCase();
    userInitialRef.innerHTML = userInitial; 
}

