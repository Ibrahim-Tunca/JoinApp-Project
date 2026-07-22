/**
 * Applies the correct category color styling in the card detail view.
 *
 * @param {string} category - The category of the selected task.
 */
function getHeadlineCardDetailColor(category){
    const categoryRef = document.getElementById("cardDetailCategoryID");
    categoryRef.classList.remove("background-color-orange");
    categoryRef.classList.remove("background-color-blue");
    if(category === "User Story"){
        categoryRef.classList.add("background-color-orange");
    }
    if(category === "Technical Task"){
        categoryRef.classList.add("background-color-blue");
    }
}


/**
 * Renders the priority label and icon in the card detail view.
 *
 * @param {string} priority - The priority of the selected task.
 */
function getCardDetailPriorityImage(priority){
    const priorityImageRef = document.getElementById("cardDetailPriorityID");
    if(priority === "low"){
        priorityImageRef.innerHTML = `<span class="regular-span-font-userstory">Low<img class="priotity-other-icon-userstory" src="./img/userstory/prio-low.svg" alt=""></span>`
    }
    if(priority === "medium"){
        priorityImageRef.innerHTML = `<span class="regular-span-font-userstory">Medium<img class="priotity-medium-icon-userstory" src="./img/userstory/prio-medium.svg" alt=""></span>`
    }
    if(priority === "urgent"){
        priorityImageRef.innerHTML = `<span class="regular-span-font-userstory">Urgent<img class="priotity-other-icon-userstory" src="./img/userstory/prio-high.svg" alt=""></span>`
    }

}


/**
 * Renders the assigned contact bubbles in the card detail window.
 *
 * @param {object[]} contacts - The contacts assigned to the selected task.
 */
function getLetterBallsCardDetailWindow(contacts){
    const contactContainerRef = document.getElementById("cardDetailContactContainerID");
    for (let index = 0; index < contacts.length; index++) {
        const initals = contacts[index].initals;
        const color = contacts[index].color;
        contactContainerRef.innerHTML += `<div class="letter-ball-card ${color}">${initals}</div>`;
    }
}


/**
 * Loads the contacts assigned to a task and renders them in the card detail window.
 *
 * @param {string} id - The id of the selected task.
 * @returns {Promise<void>} A promise that resolves when the contact list has been rendered.
 */
async function getContacts(id){
    const contactsInDataBase = await getContactEntriesFromDataBase();
    const contactsInTask = await getContactsContainerFromTaskByID(id) || [];
    const cardDetailContactContainerRef = document.getElementById("cardDetailContactContainerID");
    cardDetailContactContainerRef.innerHTML = "";
    for (let index = 0; index < contactsInTask.length; index++) {
        const contactTaskID = contactsInTask[index].id;
        const color = contactsInTask[index].color;
        const initals = contactsInTask[index].initals;
        const name = getTheUsernameOfTheContact(contactsInDataBase, contactTaskID);
        cardDetailContactContainerRef.innerHTML +=  getContactTemplate(color, initals, name);
    }   
}


/**
 * Finds the username of a contact by its database id.
 *
 * @param {Array<[string, object]>} contactsInDataBase - All contact entries from the database.
 * @param {string} contactTaskID - The id of the contact assigned to the task.
 * @returns {string|undefined} The username of the matching contact, or undefined if none was found.
 */
function getTheUsernameOfTheContact(contactsInDataBase, contactTaskID){
    for (let index = 0; index < contactsInDataBase.length; index++) {
    const contactDataBaseID = contactsInDataBase[index][0];
        if(contactDataBaseID === contactTaskID){
            const name = contactsInDataBase[index][1].userName;
            return name;
        }
    }
}


/**
 * Loads all subtasks for a task and renders them in the card detail window.
 *
 * @param {string} id - The id of the selected task.
 * @returns {Promise<void>} A promise that resolves when the subtasks have been rendered.
 */
async function getSubtasks(id){
    const tasks = await getTaskEntriesFromDataBase();
    const taskPositionIndex = await getTheRightTaskIndexByID(tasks, id);
    const subtasksArray = tasks[taskPositionIndex][1].subtasks || [];
    printAllSubtasks(subtasksArray, id);    
} 


/**
 * Finds the array index of a task by its id.
 *
 * @param {Array<[string, object]>} tasks - The list of task entries.
 * @param {string} id - The id of the task to search for.
 * @returns {Promise<number|undefined>} A promise that resolves to the matching task index.
 */
async function getTheRightTaskIndexByID(tasks, id){
    for (let index = 0; index < tasks.length; index++) {
        const taskID = tasks[index][0];
        if(taskID === id){
            return index;
        }
    }
}


/**
 * Renders all subtasks of the selected task in the card detail window.
 *
 * @param {object[]} subtasksArray - The subtask list of the selected task.
 * @param {string} id - The id of the parent task.
 */
function printAllSubtasks(subtasksArray, id){
    const cardDetailSubtaskContainerRef = document.getElementById("cardDetailSubtaskContainerID");
    cardDetailSubtaskContainerRef.innerHTML = "";
    for (let index = 0; index < subtasksArray.length; index++) {
            const subtask = subtasksArray[index];
            const subtaskValue = subtasksArray[index].value;
            const subtaskID = subtasksArray[index].id;
            cardDetailSubtaskContainerRef.innerHTML +=  getSubtaskTemplate(subtaskID, subtaskValue, id);
            subtaskSetTheRigthCheckBoxImg(subtask);
        }
}


/**
 * Loads the subtask array of a task from the database.
 *
 * @param {string} taskID - The id of the task.
 * @returns {Promise<object[]|undefined>} A promise that resolves to the subtask array.
 */
async function getSubtaskArrayFromDataBaseByID(taskID){
    const task = await getTaskById(taskID);
    const subtaskArray = task.subtasks;
    return subtaskArray;
}


/**
 * Toggles the completion state of a subtask.
 *
 * @param {string|number} subtaskID - The id of the subtask.
 * @param {string} taskID - The id of the parent task.
 * @returns {Promise<void>} A promise that resolves when the subtask status has been updated.
 */
async function subTaskDone(subtaskID, taskID){
    const subtaskArray = await getSubtaskArrayFromDataBaseByID(taskID);
    for (let index = 0; index < subtaskArray.length; index++) {
        const currentSubtaskID = subtaskArray[index].id;
        if(currentSubtaskID === subtaskID){
            const subtaskStatus = subtaskArray[index].status;
            if(subtaskStatus == false){
                checkSubtask(subtaskID, taskID);
            }
            if(subtaskStatus == true){
                uncheckSubtask(subtaskID, taskID);
            }
        } 
    }
}


/**
 * Marks a subtask as completed, updates the database, and re-renders the board.
 *
 * @param {string|number} subtaskID - The id of the subtask.
 * @param {string} taskID - The id of the parent task.
 * @returns {Promise<void>} A promise that resolves when the subtask has been updated.
 */
async function checkSubtask(subtaskID, taskID){
    const subTaskRef = document.getElementById("subTaskNr" + subtaskID);
    subTaskRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
    const trueBool = true;
    await updateStatusFromSubtask(subtaskID, taskID, trueBool);
    await renderAllCards();
}


/**
 * Marks a subtask as incomplete, updates the database, and re-renders the board.
 *
 * @param {string|number} subtaskID - The id of the subtask.
 * @param {string} taskID - The id of the parent task.
 * @returns {Promise<void>} A promise that resolves when the subtask has been updated.
 */
async function uncheckSubtask(subtaskID, taskID){
    const subTaskRef = document.getElementById("subTaskNr" + subtaskID);
    subTaskRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
    subTaskRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
    const falseBool = false;
    await updateStatusFromSubtask(subtaskID, taskID, falseBool); 
    await renderAllCards();
}


/**
 * Sets the correct checkbox image for a rendered subtask based on its status.
 *
 * @param {{ id: string|number, status: boolean }} subtask - The subtask object to display.
 */
function subtaskSetTheRigthCheckBoxImg(subtask){
    const subTaskRef = document.getElementById("subTaskNr" + subtask.id);
    if(subtask.status == false){
        subTaskRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
        return;
    }
    if(subtask.status == true){
        subTaskRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
        return;
    }
}


/**
 * Starts the opening animation for the card detail window.
 */
function floatCardDetailWindow(){
    const cardDetailContainer = document.getElementById("cardDetailContainerID");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cardDetailContainer.classList.add("top-50-percent-board");
        });
    });
}


/**
 * Opens the card detail window, fills it with the selected task data,
 * and loads the related contacts and subtasks.
 *
 * @param {string} id - The id of the selected task.
 * @param {string} title - The title of the selected task.
 * @param {string} description - The description of the selected task.
 * @param {string} category - The category of the selected task.
 * @param {string} date - The due date of the selected task.
 * @param {string} priority - The priority of the selected task.
 * @returns {Promise<void>} A promise that resolves when the detail window has been rendered.
 */
async function showCardDetail(id, title, description, category, date, priority){
    showWhiteTransparentOverlay();
    const formContainerRef = document.getElementById("formContainerID");
    formContainerRef.innerHTML = getCardDetailTemplate();
    const categoryRef = document.getElementById("cardDetailCategoryID");
    const titleRef = document.getElementById("cardDetailTitleID");
    const descriptionRef = document.getElementById("cardDetailDescriptionID");
    const dateRef = document.getElementById("cardDetailDateID");
    const priorityRef = document.getElementById("cardDetailPriorityID");
    currentClickedTaskID = id;
    categoryRef.innerHTML = category;
    titleRef.innerHTML = title;
    descriptionRef.innerHTML = description;
    dateRef.innerHTML = date;
    getCardDetailPriorityImage(priority);
    getContacts(id);
    getSubtasks(id);
    getHeadlineCardDetailColor(category, id); 
    floatCardDetailWindow();
}
