/**
 * Searches the contact database for a contact that matches
 * the given name, email address, and phone number.
 *
 * @param {string} name - The contact name to search for.
 * @param {string} mail - The contact email address to search for.
 * @param {string} phone - The contact phone number to search for.
 * @returns {Promise<string|null>} A promise that resolves to the contact id or null if no match was found.
 */
async function findContactIdByData(name, mail, phone) {
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    for (let index = 0; index < entries.length; index++) {
        const [id, contact] = entries[index];
        if(contact.userName === name && contact.email === mail && contact.phone === phone){
            return id;
        }
    }
    return null; 
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
 * Creates a new contact in the database and assigns a random contact color.
 *
 * @param {string} name - The name of the new contact.
 * @param {string} mail - The email address of the new contact.
 * @param {string} [phone=""] - The phone number of the new contact.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function addNewContact(name, mail, phone = "") {
    let currentColor = getContactColorType();
        return await postData("/contacts/",{
        userName: name,
        email: mail,
        phone: phone,
        color: currentColor,
        });
}


/**
 * Updates an existing contact in the database
 * with the current values from the edit-contact form.
 *
 * @param {string} id - The id of the contact to update.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function updateUser(id){
    const nameValue = document.getElementById("editContactNameID").value;
    const mailValue = document.getElementById("editContactMailID").value;
    const phoneValue = document.getElementById("editContactPhoneID").value;
    return await patchData("/contacts/" + id,{
        userName: nameValue,
        email: mailValue,
        phone: phoneValue
    });
}


/**
 * Sends a PATCH request to update existing data in the database.
 *
 * @param {string} [path=""] - The database path to update.
 * @param {object} [data={}] - The data object that should be patched.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function patchData(path="", data={}){
   	 let response = await fetch(BASE_URL + path + ".json",{
        		method: "PATCH",
        		headers: {
            	"Content-Type": "application/json",
        		},
        		body: JSON.stringify(data)
   	});
    return await response.json();
}


/**
 * Deletes data from the database at the given path.
 *
 * @param {string} [path=""] - The database path to delete.
 * @returns {Promise<object|null>} A promise that resolves to the server response.
 */
async function deleteData(path=""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
    const responseToJson = await response.json();
    return responseToJson;
}


/**
 * Deletes a contact, removes that contact from all related tasks,
 * closes the contact detail view, and refreshes the contact list.
 *
 * @param {string} id - The id of the contact to delete.
 * @returns {Promise<void>} A promise that resolves when the contact has been fully removed.
 */
async function deleteContact(id){
    const floatingCard = document.getElementById(id + "-floatingContact")
    clearAllBlogs();
    await deleteData("/contacts/" + id);
    await removeDeletedContactFromAllTasks(id);
    floatingCard.classList.toggle("is-visible");
    choosedContactID = "";
    floatBackContactDetails(id);
    popUpDeleteContactSucces();
    await renderContacts();
}


/**
 * Loads data from the Firebase database for the given path.
 *
 * @param {string} [path=""] - The database path that should be loaded.
 * @returns {Promise<object|null>} A promise that resolves to the loaded JSON data.
 */
async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}


/**
 * Removes a deleted contact from all tasks in the database.
 *
 * @param {string} contactID - The id of the deleted contact.
 * @returns {Promise<void>} A promise that resolves when all task entries have been checked.
 */
async function removeDeletedContactFromAllTasks(contactID){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    await removeDeletedContactFromTaskEntries(entries, contactID);
}


/**
 * Iterates through all task entries and removes the deleted contact
 * from every task that still contains it.
 *
 * @param {Array<[string, object]>} entries - All task entries from the database.
 * @param {string} contactID - The id of the deleted contact.
 * @returns {Promise<void>} A promise that resolves when all task entries have been processed.
 */
async function removeDeletedContactFromTaskEntries(entries, contactID){
    for (let index = 0; index < entries.length; index++) {
        const taskID = entries[index][0];
        const contactArray = entries[index][1].contacts;
        if(contactArray != undefined){
            await removeDeletedContactFromTaskContacts(contactArray, contactID, taskID);
        }
    }
}


/**
 * Removes a deleted contact from a single task contact array
 * and updates the task in the database if a change was necessary.
 *
 * @param {object[]} contactArray - The contact array of a task.
 * @param {string} contactID - The id of the deleted contact.
 * @param {string} taskID - The id of the task to update.
 * @returns {Promise<void>} A promise that resolves when the task update is complete.
 */
async function removeDeletedContactFromTaskContacts(contactArray, contactID, taskID){
    const filteredContacts = contactArray.filter(contact => contact && contact.id !== contactID);
    if (filteredContacts.length !== contactArray.length) {
        await patchData("/tasks/" + taskID, {
            contacts: filteredContacts
        });
    }
}