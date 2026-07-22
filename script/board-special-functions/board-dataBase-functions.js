/**
 * Loads all contacts into the card detail selection list
 * and highlights contacts that are already assigned to the task.
 *
 * @returns {Promise<void>} A promise that resolves when the contact list has been rendered.
 */
async function loadContactsInCardDetailWindow(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const contactSelectionContainerRef = document.getElementById("contactSelectionCardDetailID");
    for (let index = 0; index < entries.length; index++) {
        const contactName = entries[index][1].userName;
        const contactColor = entries[index][1].color;
        const nameParts = entries[index][1].userName.trim().split(/\s+/);
        const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        const contactKey = entries[index][0];                
        contactSelectionContainerRef.innerHTML += contactSelectionTemplateCardDetail(contactKey, initialsValue, contactColor, contactName);
        setContactInFocusWhenContactIsAlreadyInTheArray(contactKey);
    } 
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
    return responseToJson = await response.json();
}


/**
 * Loads data from the database using a GET request.
 *
 * @param {string} [path=""] - The base database path to load.
 * @param {string} [taskID=""] - An optional task id for more specific access.
 * @returns {Promise<object|null>} A promise that resolves to the loaded JSON data.
 */
async function getData(path="", taskID = ""){
	const requestPath = taskID ? `${path}/${taskID}` : path;
	const response = await fetch(BASE_URL + path + ".json", {
				method: "GET",
				headers: {
				"Content-Type": "application/json",	
				},

	});
	const responseToJson = await response.json();
	return responseToJson;
}


/**
 * Loads a single task by its id.
 *
 * @param {string} taskID - The id of the task to load.
 * @returns {Promise<object|null>} A promise that resolves to the requested task.
 */
async function getTaskById(taskID) {
    return await loadData(`/tasks/${taskID}`);
}


/**
 * Loads all tasks from the database and returns them as key-value pairs.
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all task entries.
 */
async function getTaskEntriesFromDataBase(){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    return entries;
}


/**
 * Loads all contacts from the database and returns them as key-value pairs.
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all contact entries.
 */
async function getContactEntriesFromDataBase(){
    const variable = await loadData("/contacts");
    const entries = Object.entries(variable || {});
    return entries;
}


/**
 * Updates the completion status of a single subtask in the database.
 *
 * @param {string|number} subtaskID - The id of the subtask to update.
 * @param {string} taskID - The id of the parent task.
 * @param {boolean} bool - The new completion status of the subtask.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function updateStatusFromSubtask(subtaskID, taskID, bool){
    return await patchData("/tasks/" + taskID + "/subtasks/" + subtaskID,{
        status: bool
    });
}


/**
 * Updates the status of a task in the database.
 *
 * @param {string} taskID - The id of the task to update.
 * @param {string} status - The new task status.
 * @returns {Promise<object>} A promise that resolves to the server response.
 */
async function updateStatusFromTask(taskID, status){
    return await patchData("/tasks/" + taskID,{
        status: status
    });
}


/**
 * Deletes the currently selected task,
 * closes the detail window, and re-renders the board.
 *
 * @returns {Promise<void>} A promise that resolves when the task has been deleted.
 */
async function deleteTask(){
    await deleteData("/tasks/" + currentClickedTaskID);
    hideCardDetailWindow();
    renderAllCards();
}
