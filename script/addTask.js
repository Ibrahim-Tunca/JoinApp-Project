let priority = "";
let subtaskID = 0;
let subtasks = [];
let choosedContacts = [];
let globalUserMail = "";
let currentTaskStatus;
let categoryTouched = false;
const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

initCustomSelects();


/**
 * Adds a contact to the selected contacts array for the current task.
 * If the contact is already selected, the function stops without adding it again.
 *
 * @param {string|number} id - The unique id of the contact.
 * @param {string} initials - The initials shown for the selected contact.
 * @param {string} color - The CSS color class used for the contact bubble.
 */


function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);
    if(contactFound){
        return;
    }
    if(choosedContacts == null){
        choosedContacts = [];
    }
    choosedContacts.push({id: id, initals: initials, color: color});
    return;
}


/**
 * Checks whether a contact is already part of the selected contacts array.
 * If the contact is already selected, it is removed again and visually unfocused.
 *
 * @param {string|number} id - The unique id of the contact.
 * @returns {boolean} Returns true if the contact was already selected, otherwise false.
 */


function checkIfContactAreAlreadyInArray(id){
    if(choosedContacts == null){
        setContactInFocus(id);
        return false;
    }
    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        if(currentContactID === id){
            setContactInUnfocus(id);
            choosedContacts.splice(index, 1);
            return true;
        }
    }
    setContactInFocus(id);
    return false;
}


/**
 * Renders the selected contact bubbles below the contact selection field.
 * If more than four contacts are selected, an overflow preview is shown.
 */


function generateInitalBallUnderContactOption(){
    const contentRef = document.getElementById("initialBallContainerID");
    contentRef.innerHTML = "";
    if(choosedContacts != undefined){
        if(choosedContacts.length > 4){
            renderSelectedContactsPreviewWithOverflow();
        }else{
            renderSelectedContactsPreview();
        }
    }
}


/**
 * Renders up to four selected contact bubbles and shows an overflow indicator
 * for any additional selected contacts.
 */


function renderSelectedContactsPreviewWithOverflow(){
    const contentRef = document.getElementById("initialBallContainerID");
    for (let index = 0; index < 4; index++) {
            const currentContact = choosedContacts[index];
            const initials = currentContact.initals;
            const color = currentContact.color;
            contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
    }
    contentRef.innerHTML += `<span class="remaining-contact-bubble-font">+${choosedContacts.length - 4}</span>`;
}


/**
 * Renders all selected contact bubbles below the contact selection field.
 */


function renderSelectedContactsPreview(){
    const contentRef = document.getElementById("initialBallContainerID");
    for (let index = 0; index < choosedContacts.length; index++) {
            const currentContact = choosedContacts[index];
            const initials = currentContact.initals;
            const color = currentContact.color;
            contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
    }
}


/**
 * Displays the success popup after a task has been created.
 */


function popUpSuccesAddTask(){
    const popUpWindowRef = document.getElementById("popUpSuccesID");
    const whiteTransparentOverlayRef = document.getElementById("whiteTransparentOverlayID");
    popUpWindowRef.classList.add("top-50-percent");
    whiteTransparentOverlayRef.classList.add("show-overlay-add-task");
    return;
}


/**
 * Resets the selected contacts, subtasks, and related UI containers
 * after a task action has been completed.
 */


function resetGlobalArrays(){
    const contactBallsRef = document.getElementById("initialBallContainerID");
    const subtasksRef = document.getElementById("createdSubtasksContainerID");
    const contactSelectionContainerRef = document.getElementById("contactSelectionID");
    choosedContacts = [];
    subtasks = [];
    contactBallsRef.innerHTML = "";
    subtasksRef.innerHTML = "";
    contactSelectionContainerRef.innerHTML = "";
    loadContacts();
}


/**
 * Validates the add-task form, creates a new task if all required values are valid,
 * shows the success popup, and redirects to the board page.
 *
 * @param {SubmitEvent} event - The submit event triggered by the form.
 * @returns {Promise<void>} A promise that resolves when the task flow is finished.
 */


async function validateAddTaskForm(event){
    event.preventDefault();
    const titleRef = document.forms["addTaskForm"]["addTaskTitle"].value;
    const descriptionRef = document.forms["addTaskForm"]["addTaskDescription"].value;
    const dateRef = document.forms["addTaskForm"]["addTaskDate"].value;
    const taskCategory = document.forms["addTaskForm"]["taskCategory"].value;
    const requiredFieldsAreFilled = checkIfEverthingImportantIsFillingdOut(titleRef, dateRef, taskCategory);
    const titleIsValid = checkIfTitleIsValid();
    const dateIsValid = checkIfDateIsValid();
    if (!requiredFieldsAreFilled || titleIsValid == false || dateIsValid == false) {
        return;
    }
    await addNewTask(titleRef, descriptionRef, dateRef, taskCategory);
    popUpSuccesAddTask();
    setTimeout(() => {
        window.location.href = "./board.html";
    }, 2500);
}


/**
 * Checks whether all required fields for creating a task are filled correctly.
 *
 * @param {string} title - The task title entered by the user.
 * @param {string} date - The selected due date.
 * @param {string} category - The selected task category.
 * @returns {boolean} Returns true if all required fields are valid, otherwise false.
 */


function checkIfEverthingImportantIsFillingdOut(title, date, category){
    let everyImportantThingIsFilled = true;
    const cleanedTitle = title.trim();
    if(cleanedTitle === ""){
        everyImportantThingIsFilled = false;
    }
    if(date === ""){
        everyImportantThingIsFilled = false;
    }
    if (date !== "" && !isDateInFuture(date)) {
        everyImportantThingIsFilled = false;
    }
    if(category === ""){
        everyImportantThingIsFilled = false;
    }
    return everyImportantThingIsFilled;
}


/**
 * Validates the task title input and shows an error style if the field is empty.
 *
 * @returns {boolean} Returns true if the title is valid, otherwise false.
 */


function checkIfTitleIsValid(){
    const titleRef = document.getElementById("titleID");
    const titleFontRef = document.getElementById("titleFontID");
    const titleValue = document.forms["addTaskForm"]["addTaskTitle"].value;
    const cleanedTitle = titleValue.trim();
    hideErrorMessage(titleRef, titleFontRef)
    if(cleanedTitle === ""){
        showErrorMessage(titleRef, titleFontRef);
        return false;
    }
    return true;
}


/**
 * Validates the date input and shows an error message
 * if the field is empty or the date is in the past.
 *
 * @returns {boolean} Returns true if the date is valid, otherwise false.
 */


function checkIfDateIsValid(){
    const dateRef = document.getElementById("dateID");
    const dateFontRef = document.getElementById("dateFontID");
    const dateValue = document.forms["addTaskForm"]["addTaskDate"].value;
    hideErrorMessage(dateRef, dateFontRef)
    if(dateValue === ""){
        showErrorMessage(dateRef, dateFontRef);
        dateFontRef.innerHTML = "This field is required";
        return false;
    }
    if (dateValue !== "" && !isDateInFuture(dateValue)) {
        showErrorMessage(dateRef, dateFontRef);
        dateFontRef.innerHTML = "Please don't take a date in the past!";
        return false;
    }
    return true;
}


/**
 * Checks whether the selected date is today or in the future
 * according to the minimum allowed task date.
 *
 * @param {string} dateValue - The selected date in YYYY-MM-DD format.
 * @returns {boolean} Returns true if the date is valid, otherwise false.
 */


function isDateInFuture(dateValue) {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    return dateValue >= minDate;
}


/**
 * Applies the error styling to an input element and its related label or message.
 *
 * @param {HTMLElement} contentRef - The input element that should receive the error style.
 * @param {HTMLElement} fontRef - The text element whose color should be changed.
 */


function showErrorMessage(contentRef, fontRef){
    contentRef.classList.add("input-title-error-addTask");
    fontRef.style.color = "#FF3D00";
}


/**
 * Removes the error styling from an input element and resets the text color.
 *
 * @param {HTMLElement} contentRef - The input element that should lose the error style.
 * @param {HTMLElement} errorRef - The text element whose color should be reset.
 */


function hideErrorMessage(contentRef, errorRef){
    contentRef.classList.remove("input-title-error-addTask");
    errorRef.style.color = "black";
}


/**
 * Hides the category error message and removes the error styling
 * from the category input field.
 */


function categoryErrorMessage(){
    const categoryRef = document.getElementById("categoryID");
    const categoryErrorMessageRef = document.getElementById("categoryErrorMessageID");
    categoryRef.classList.remove("input-date-error-addTask");
    categoryErrorMessageRef.classList.add("d_none");
}


/**
 * Shows the category error message and applies the error styling
 * to the category input field.
 */


function removeCategoryErrorMessage(){
    const categoryRef = document.getElementById("categoryID");
    const categoryErrorMessageRef = document.getElementById("categoryErrorMessageID");
    categoryRef.classList.add("input-date-error-addTask");
    categoryErrorMessageRef.classList.remove("d_none");
}