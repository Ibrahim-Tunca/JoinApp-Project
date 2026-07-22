/**
 * Checks whether a user is currently logged in
 * by looking for stored user data in local storage.
 *
 * @returns {boolean} Returns true if user data exists, otherwise false.
 */
function checkIfUserIsLogged(){
    return localStorage.getItem("userData") !== null;
}


/**
 * Sets the initial letter of the logged-in user
 * into the profile button in the header.
 * If no user is logged in, the user is redirected to the login page.
 */
function setNameInitialButton(){
    const userIsLogged = checkIfUserIsLogged();
    if(!userIsLogged){
        window.location.href="https://join-3199.developerakademie.net/index.html";
        return;
    }
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    let userInitialRef = document.getElementById("userInitialButtonID");
    const userName = userData.userName;
    const userInitial = userName.charAt(0).toUpperCase();
    userInitialRef.innerHTML = userInitial; 
}

