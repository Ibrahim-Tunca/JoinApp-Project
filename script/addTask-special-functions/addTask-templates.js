/**
 * Returns the HTML template for a rendered subtask entry below the subtask input.
 *
 * @param {string|number} id - The id of the subtask.
 * @param {string} value - The text content of the subtask.
 * @returns {string} The HTML string for the rendered subtask.
 */
function pasteSubtaskUnderInputfieldTemplate(id, value){
    return      `<div class="single-subtask-container" id="subtaskNr${id}ID">    
                        <div class="subtask-content">
                            <span class="subtask-bullet">•</span>
                            <span class="subtask-text">${value}</span>
                        </div>
                        <div class="subtask-button-container">
                        <img 
                            onclick="deleteSingleSubtask(${id})"
                            class="subtask-trash-icon" 
                            src="./img/trashcan.svg" 
                            onmouseenter="this.src='./img/addTask/trashcan-blue.svg'"
                            onmouseleave="this.src='./img/trashcan.svg'"
                        >
                        <div class="subtask-separator"></div>
                            <img 
                                onclick="editSingleSubtask(${id}, '${value}')"
                                class="subtask-pencil-icon" 
                                src="./img/pencil.svg" 
                                onmouseenter="this.src='./img/addTask/pencil-blue.svg'"
                                onmouseleave="this.src='./img/pencil.svg'"
                            >
                        </div>
                </div>`;
}


/**
 * Returns the HTML template for a subtask in edit mode.
 *
 * @param {string|number} id - The id of the subtask being edited.
 * @returns {string} The HTML string for the editable subtask row.
 */
function editSingleSubtaskTemplate(id){
    return `    <div class="wrapper-div-container">
                        <input 
                        class="edit-input-subtask-addTask" 
                        type="text" 
                        placeholder="add new subtask" 
                        id="editSubtask${id}"
                        >
                            
                        <div class="cancel-and-confirm-container" style="gap: 5px;">
                            <img 
                                onclick="deleteSingleSubtask(${id})" 
                                class="edit-subtask-trashcan-icon" 
                                src="./img/trashcan.svg"
                                onmouseenter="this.src='./img/addTask/trashcan-blue.svg'"
                                onmouseleave="this.src='./img/trashcan.svg'"
                            >
                            <span class="cancel-and-confirm-separator"></span>
                            <img 
                                onclick="confirmEditSubtask(${id})" 
                                class="edit-subtask-confirm-icon" 
                                src="./img/addTask/confirm.svg"
                                onmouseenter="this.src='./img/addTask/confirm-blue.svg'"
                                onmouseleave="this.src='./img/addTask/confirm.svg'"
                            >
                        </div>
                </div>`
}


/**
 * Returns the HTML template for one contact entry in the add-task contact selection.
 *
 * @param {string|number} id - The id of the contact.
 * @param {string} initials - The initials displayed for the contact.
 * @param {string} color - The CSS color class used for the contact avatar.
 * @param {string} name - The display name of the contact.
 * @param {string} mail - The email address of the contact.
 * @returns {string} The HTML string for the contact selection entry.
 */
function contactSelectionTemplate(id, initials, color, name, mail){
    return `<label class="contact-option-addTask" id="contactID${id}">
                <input
                    onchange="addContactInTask('${id}', '${initials}', '${color}'), generateInitalBallUnderContactOption()"
                    class="contact-checkbox-addTask"
                    type="checkbox"
                    name="contacts"
                    value="${name}"
                >
                <div class="contact-option-left-container-addTask">
                    <div class="contact-initial-ball ${color}">${initials}</div>
                    <span class="contact-option-font" id="${mail}ID">${name}</span>
                </div>
                <span class="contact-checkbox-visual-addTask" aria-hidden="true" id="checkBoxID${id}"></span>
            </label>`
}

