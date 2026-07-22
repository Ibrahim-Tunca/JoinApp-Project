/**
 * Activates the low priority button and updates the related icon styling.
 */
function setPrioToLow(){
    const buttonLowPrioRef = document.getElementById("lowPrioID");
    const buttonMidPrioRef = document.getElementById("mediumPrioID");
    const buttonHighPrioRef = document.getElementById("urgentPrioID");
    const imgLowPrioRef = document.getElementById("lowPrioIMGID");
    const imgMidPrioRef = document.getElementById("midPrioIMGID");
    const imgHighPrioRef = document.getElementById("urgentPrioIMGID");
    buttonLowPrioRef.classList.add("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.remove("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.remove("high-prio-button-focused-addTask");
    imgLowPrioRef.src = "./img/addTask/prio-low-white.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high.svg"
    priority = "low";
}


/**
 * Activates the medium priority button and updates the related icon styling.
 */
function setPrioToMedium(){
    const buttonLowPrioRef = document.getElementById("lowPrioID");
    const buttonMidPrioRef = document.getElementById("mediumPrioID");
    const buttonHighPrioRef = document.getElementById("urgentPrioID");
    const imgLowPrioRef = document.getElementById("lowPrioIMGID");
    const imgMidPrioRef = document.getElementById("midPrioIMGID");
    const imgHighPrioRef = document.getElementById("urgentPrioIMGID");
    buttonLowPrioRef.classList.remove("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.add("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.remove("high-prio-button-focused-addTask");
    imgLowPrioRef.src = "./img/addTask/prio-low.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium-white.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high.svg"
    priority = "medium";
}


/**
 * Activates the urgent priority button and updates the related icon styling.
 */
function setPrioToUrgent(){
    const buttonLowPrioRef = document.getElementById("lowPrioID");
    const buttonMidPrioRef = document.getElementById("mediumPrioID");
    const buttonHighPrioRef = document.getElementById("urgentPrioID");
    const imgLowPrioRef = document.getElementById("lowPrioIMGID");
    const imgMidPrioRef = document.getElementById("midPrioIMGID");
    const imgHighPrioRef = document.getElementById("urgentPrioIMGID");
    buttonLowPrioRef.classList.remove("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.remove("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.add("high-prio-button-focused-addTask");
    imgLowPrioRef.src = "./img/addTask/prio-low.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high-white.svg"
    priority = "urgent";
}


/**
 * Marks a contact as selected in the contact list.
 *
 * @param {string|number} id - The id of the contact that should be focused.
 */
function setContactInFocus(id){    
    const contactRef = document.getElementById("contactID" + id);
    const checkBoxRef = document.getElementById("checkBoxID" + id);
    contactRef.classList.add("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("./img/addTask/checkbox_checked_white.svg")';
}


/**
 * Removes the selected styling from a contact in the contact list.
 *
 * @param {string|number} id - The id of the contact that should be unfocused.
 */
function setContactInUnfocus(id){
    const contactRef = document.getElementById("contactID" + id);
    const checkBoxRef = document.getElementById("checkBoxID" + id);
    contactRef.classList.remove("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("../img/checkbox_unchecked.svg")';
}


/**
 * Shows or hides the subtask action buttons
 * depending on whether the subtask input field contains text.
 */
function showButtons(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;
    if(subtaskValue != ""){
        subtasksInputfieldButtonContainerRef.classList.remove("d_none");
        return;
    }
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    return;
}


/**
 * Creates a new subtask from the input field
 * and renders it below the subtask input.
 */
function pasteSubtaskUnderInputfield(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;
    const createdSubtasksContainer = document.getElementById("createdSubtasksContainerID");
    subtasks.push({id: subtaskID, value: subtaskValue, status: false});
    createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(subtaskID, subtaskValue);
    subtaskID++;
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
}


/**
 * Clears the current subtask input field and hides the subtask action buttons.
 */
function deleteInputValueSubtask(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
}


/**
 * Removes a rendered subtask and deletes it from the global subtask array.
 *
 * @param {string|number} id - The id of the subtask to delete.
 */
function deleteSingleSubtask(id){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    deleteSingleSubtaskFromGlobalArray(id);
    subTaskRef.remove();
}


/**
 * Removes a subtask from the global subtask array.
 *
 * @param {string|number} id - The id of the subtask to delete.
 */
function deleteSingleSubtaskFromGlobalArray(id){
    for (let index = 0; index < subtasks.length; index++) {
        const currentTaskID = subtasks[index].id;
        if(currentTaskID === id){
            subtasks.splice(index, 1);
            return;
        }
    }
}


/**
 * Updates the text value of a subtask in the global subtask array.
 *
 * @param {string|number} id - The id of the subtask to update.
 * @param {string} value - The new subtask text.
 */
function overwriteAnSubtaskFromGlobalArray(id, value){
    for (let index = 0; index < subtasks.length; index++) {
        const currentTaskID = subtasks[index].id;
        if(currentTaskID === id){
            subtasks[index].value = value;
            return;
        }
    }
}


/**
 * Switches a rendered subtask into edit mode
 * and places the cursor at the end of the current value.
 *
 * @param {string|number} id - The id of the subtask to edit.
 * @param {string} value - The current subtask text.
 */
function editSingleSubtask(id, value){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    subTaskRef.classList.add("subtask-editing");
    subTaskRef.style.paddingLeft = "0";
    subTaskRef.innerHTML = editSingleSubtaskTemplate(id);
        const inputRef = document.getElementById("editSubtask" + id);
        inputRef.value = value;
        inputRef.focus();
        inputRef.setSelectionRange(value.length, value.length);
}


/**
 * Saves the edited subtask value, updates the global array,
 * and re-renders the full subtask list.
 *
 * @param {string|number} id - The id of the edited subtask.
 */
function confirmEditSubtask(id){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    const subTaskValue = document.getElementById("editSubtask" + id).value;
    const createdSubtasksContainer = document.getElementById("createdSubtasksContainerID");
    overwriteAnSubtaskFromGlobalArray(id, subTaskValue);
    subTaskRef.classList.remove("subtask-editing");
    createdSubtasksContainer.innerHTML = "";
    renderSubtasks();
}


/**
 * Initializes all custom select fields used in the add-task form.
 * It wires up toggle, option selection, outside-click, and Escape-key behavior.
 */
function initCustomSelects() {
    const customSelects = document.querySelectorAll(".custom-select-addTask");
    customSelects.forEach((selectElement) => {
        const toggleButton = selectElement.querySelector(".custom-select-toggle-addTask");
        const label = selectElement.querySelector(".custom-select-label-addTask");
        const hiddenInput = selectElement.querySelector('input[type="hidden"]');
        const menu = selectElement.querySelector(".custom-select-menu-addTask");
        const options = selectElement.querySelectorAll(".custom-select-option-addTask");
        const placeholder = selectElement.dataset.placeholder;
        selectElement.classList.add("placeholder");
        toggleButton.addEventListener("click", () => {
            const isOpen = selectElement.classList.contains("open");

            closeAllCustomSelects();

            if (!isOpen) {
                selectElement.classList.add("open");
                menu.classList.remove("d_none");
            }
        });
        options.forEach((optionButton) => {
            optionButton.addEventListener("click", () => {
                const optionValue = optionButton.dataset.value;
                const optionText = optionButton.textContent;

                hiddenInput.value = optionValue;
                label.textContent = optionText;
                selectElement.classList.remove("placeholder");
                selectElement.classList.remove("open");
                menu.classList.add("d_none");
            });
        });
    });
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".custom-select-addTask")) {
            closeAllCustomSelects();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllCustomSelects();
        }
    });
}


/**
 * Closes all currently open custom select menus.
 */
function closeAllCustomSelects() {
    document.querySelectorAll(".custom-select-addTask").forEach((selectElement) => {
        selectElement.classList.remove("open");
        const menu = selectElement.querySelector(".custom-select-menu-addTask");
        if (menu) {
            menu.classList.add("d_none");
        }
    });
}

