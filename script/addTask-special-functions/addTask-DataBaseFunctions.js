/**
 * Loads all contacts from the database, sorts them alphabetically,
 * optionally moves the logged-in user to the top, and renders the selection list.
 *
 * @returns {Promise<void>} A promise that resolves when the contact list has been rendered.
 */
async function loadContacts(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const sortedEntries = sortContactsAlphabetically(entries);
    const sortedAndSetUserOnTheTop = takeTheUserFromArrayAndPutInOnTheTop(sortedEntries);
    const contactSelectionContainerRef = document.getElementById("contactSelectionID");
    renderContactSelectionEntries(sortedAndSetUserOnTheTop, contactSelectionContainerRef);
    if(!globalUserMail){
        return;
    }
    setYOUnextToTheUserContact(globalUserMail);
}


/**
 * Renders all contact entries into the contact selection container.
 *
 * @param {Array<[string, object]>} sortedAndSetUserOnTheTop - The prepared list of contact entries.
 * @param {HTMLElement} contactSelectionContainerRef - The container that receives the rendered contacts.
 */
function renderContactSelectionEntries(sortedAndSetUserOnTheTop, contactSelectionContainerRef){
    for (let index = 0; index < sortedAndSetUserOnTheTop.length; index++) {
        const contactMail = sortedAndSetUserOnTheTop[index][1].email;
        const contactName = sortedAndSetUserOnTheTop[index][1].userName;
        const contactColor = sortedAndSetUserOnTheTop[index][1].color;
        const nameParts = sortedAndSetUserOnTheTop[index][1].userName.trim().split(/\s+/);
        const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        const contactKey = sortedAndSetUserOnTheTop[index][0];        
        contactSelectionContainerRef.innerHTML += contactSelectionTemplate(contactKey, initialsValue, contactColor, contactName, contactMail);
    }
}


/**
 * Moves the logged-in user to the top of the contact list if a user is stored locally.
 *
 * @param {Array<[string, object]>} sortedEntries - The alphabetically sorted contact entries.
 * @returns {Array<[string, object]>} The updated contact list.
 */
function takeTheUserFromArrayAndPutInOnTheTop(sortedEntries){
    if (!checkIfUserIsLogged()) {
        return sortedEntries;
    }
    const userDataString = localStorage.getItem("userData")
    const userData = JSON.parse(userDataString);
    const userMail = userData.email;
    sortedEntries = moveUserContactToTop(sortedEntries, userMail);
    return sortedEntries; 
}


/**
 * Searches the contact list for the logged-in user and moves that contact to the top.
 *
 * @param {Array<[string, object]>} sortedEntries - The alphabetically sorted contact entries.
 * @param {string} userMail - The email address of the logged-in user.
 * @returns {Array<[string, object]>} The updated contact list.
 */
function moveUserContactToTop(sortedEntries, userMail){
    for (let index = 0; index < sortedEntries.length; index++) {
        const currentMail = sortedEntries[index][1].email;
        const currentUser = sortedEntries[index];
        if(userMail === currentMail){
            const currentUserName = currentUser[1].userName;
            globalUserMail = currentMail;
            sortedEntries.splice(index, 1);
            sortedEntries.splice(0, 1, currentUser);
            return sortedEntries;
        }
    }
    return sortedEntries;
}


/**
 * Adds the label "(You)" next to the logged-in user's contact entry.
 *
 * @param {string} mail - The email address of the logged-in user.
 */
function setYOUnextToTheUserContact(mail){
    const contactNameRef = document.getElementById(mail + "ID");
    contactNameRef.innerHTML += " " + "(You)";
}


/**
 * Creates a new task in the database using the current form state.
 * After saving, the related global task values are reset.
 *
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} category - The selected task category.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function addNewTask(title, description, date, category) {
    const status = currentTaskStatus || "todo";
        const response = await postData("/tasks/",{
            title: title,
            description: description,
            date: date,
            priority: priority,
            category: category,
            contacts: choosedContacts,
            subtasks: subtasks,
            status: status
        });
    priority = "";
    choosedContacts = [];
    subtasks = [];
    currentTaskStatus = "";
    return response;
}


/**
 * Sends a POST request to create new data in the database.
 *
 * @param {string} [path=""] - The database path where the data should be created.
 * @param {object} [data={}] - The data object to save.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function postData(path = "", data = {}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


/**
 * Sorts contact entries alphabetically by username.
 *
 * @param {Array<[string, object]>} [entries=[]] - The contact entries to sort.
 * @returns {Array<[string, object]>} A sorted copy of the contact entries.
 */
function sortContactsAlphabetically(entries = []) {
    return [...entries].sort((firstEntry, secondEntry) => {
        const firstName = firstEntry?.[1]?.userName?.trim() ?? "";
        const secondName = secondEntry?.[1]?.userName?.trim() ?? "";

        return firstName.localeCompare(secondName, "de", {
            sensitivity: "base"
        });
    });
}