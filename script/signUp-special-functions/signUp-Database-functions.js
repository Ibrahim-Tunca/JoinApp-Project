/**
 * Loads all registered users from the database and logs them to the console.
 * This function is mainly useful for debugging.
 *
 * @returns {Promise<void>} A promise that resolves when the user list has been loaded.
 */
async function showRegister(){
    let response = await fetch(BASE_URL + ".json")
    let responseToJson = await response.json();
    users = Object.values(responseToJson || {});
    console.log(users);
}


/**
 * Creates or updates a signed-up user in the database.
 * If the entered email address already exists, an error message is shown instead.
 *
 * @param {string} name - The username entered during sign-up.
 * @param {string} mail - The email address entered during sign-up.
 * @param {string} password - The password entered during sign-up.
 * @returns {Promise<object|void>} A promise that resolves to the server response if the user is saved.
 */
async function updateSignedUser(name, mail, password) {
    const userExists = await checkIfUserExist(mail);
    if(userExists){
        generateExistingUserErrorMessage();
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


/**
 * Shows an error message when the entered email address
 * is already registered and highlights the email field.
 */
function generateExistingUserErrorMessage(){
    const contentRef = document.getElementById("errorMessageMailID");
    const mailFieldErrorMessage = document.getElementById("mailID");
    contentRef.innerHTML = "This User already exists!"
    mailFieldErrorMessage.classList.add("red-bottom-border");
}


/**
 * Checks whether an email address already exists in the user database.
 *
 * @param {string} inputMail - The email address to search for.
 * @returns {Promise<boolean>} A promise that resolves to true if the email address already exists, otherwise false.
 */
async function checkIfUserExist(inputMail){
    let response = await fetch(BASE_URL + "user.json")
    let responseToJson = await response.json();
    if(!responseToJson) return false;
    users = Object.values(responseToJson || {});
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if(element.email === inputMail){
            return true;
        }
    }
    return false;
}


/**
 * Sends a PATCH request to update user data in the database.
 *
 * @param {string} [path=""] - The database path to update.
 * @param {object} [data={}] - The data object that should be saved.
 * @returns {Promise<void>} A promise that resolves when the request has finished.
 */
async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });  
}