/**
 * Activates the correct priority button in the edit view
 * based on the stored task priority.
 *
 * @param {string} prio - The current priority value of the task.
 */
function loadPriorityButton(prio){
    if(prio === "low"){
        setPrioToLow();
    }
    if(prio === "medium"){
        setPrioToMedium();
    }
    if(prio === "urgent"){
        setPrioToUrgent();
    }
}


/**
 * Marks all contacts as selected in the edit view
 * if they are already assigned to the current task.
 */
function setAllContactsInFocusThatAreAlreadyChoosed(){
    if(choosedContacts != undefined){
        for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        setContactInFocus(currentContactID);
        }
    }
}


/**
 * Creates a new subtask from the input field,
 * adds it to the subtask array, and renders it below the input.
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
 * Renders all existing subtasks for the current task in the edit view.
 */
function renderSubtasks(){
    const createdSubtasksContainer = document.getElementById("createdSubtasksContainerID");
    if(subtasks != undefined){
        for (let index = 0; index < subtasks.length; index++) {
            const currentSubtaskID = subtasks[index].id;
            const subtaskValue = subtasks[index].value;
            createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(currentSubtaskID, subtaskValue);
            subtaskID++;
        }
    }
}


/**
 * Shows or hides the subtask action buttons in the card detail edit view
 * depending on whether the input field contains text.
 */
function showButtonsCardDetail(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonCardDetailContainerID");
    const subtaskValue = document.forms["addTaskFormInCardDetail"]["subtaskformInCardDetail"].value;
    if(subtaskValue != ""){
        subtasksInputfieldButtonContainerRef.classList.remove("d_none");
        return;
    }
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    return;
}


/**
 * Creates a new subtask inside the card detail edit view
 * and renders it below the subtask input field.
 */
function pasteSubtaskUnderInputfieldCardDetail(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonCardDetailContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;
    const createdSubtasksContainer = document.getElementById("createdSubtasksInCardDetailContainerID");
    subtasks.push({id: subtaskID, value: subtaskValue, status: false});
    createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(subtaskID, subtaskValue);
    subtaskID++;
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
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
 * Saves the edited task values to the database,
 * closes the detail window, and re-renders the board.
 *
 * @param {SubmitEvent} event - The submit event triggered by the edit form.
 * @returns {Promise<void>} A promise that resolves when the task has been updated.
 */
async function updateTask(event){
    event.preventDefault();  
    const titleValue = document.forms["addTaskForm"]["addTaskTitle"].value;
    const descriptionValue = document.forms["addTaskForm"]["addTaskDescription"].value;
    const dateValue = document.forms["addTaskForm"]["addTaskDate"].value;
    const taskCategory = document.forms["addTaskForm"]["taskCategory"].value;
    await patchData("/tasks/" + currentClickedTaskID,{
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
        category: taskCategory,
        priority: priority,
        contacts: choosedContacts,
        subtasks: subtasks
    });
    hideCardDetailWindow();
    renderAllCards();
}


/**
 * Loads the currently selected task and renders the editable detail view,
 * including contacts, priority, and subtasks.
 *
 * @returns {Promise<void>} A promise that resolves when the edit view has been fully rendered.
 */
async function editCardDetail(){
    const cardDetailRef = document.getElementById("cardDetailContainerID");
    const task = await getTaskById(currentClickedTaskID);
    const title = task.title;
    const description = task.description;
    const date = task.date;
    const priority = task.priority;
    const category = task.category;
    const subtaskArray = task.subtasks;
    const contacts = task.contacts;
    subtasks = subtaskArray;
    choosedContacts = contacts;
    cardDetailRef.innerHTML =   getCardDetailEditTemplate(title, description, date, category);
                                initCustomSelects();
                                await loadContacts();
                                loadPriorityButton(priority);
                                setAllContactsInFocusThatAreAlreadyChoosed();
                                generateInitalBallUnderContactOption();
                                renderSubtasks();                                                                     
}


