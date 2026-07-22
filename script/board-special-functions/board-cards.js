/**
 * Renders the correct priority icon for a task card.
 *
 * @param {string} priority - The priority value of the task.
 * @param {string} id - The id of the task card.
 */
function getImgByPriority(priority, id){
    const priorityRef = document.getElementById("priorityNr" + id);
    if (priority === "low") {
        priorityRef.innerHTML = `<img class="other-prio-icon-card" src="./img/addTask/prio-low.svg">`
    }
    if (priority === "medium") {
        priorityRef.innerHTML = `<img class="mid-prio-icon-card" src="./img/addTask/prio-medium.svg">`
    }
    if (priority === "urgent") {
        priorityRef.innerHTML = `<img class="other-prio-icon-card" src="./img/addTask/prio-high.svg">`
    }
}


/**
 * Applies the correct category color styling to a task card.
 *
 * @param {string} category - The category of the task.
 * @param {string} id - The id of the task card.
 */
function getHeadlineCardColor(category, id){
    const categoryRef = document.getElementById("categoryNr" + id);
    if(category === "User Story"){
        categoryRef.classList.add("background-color-orange");
    }
    if(category === "Technical Task"){
        categoryRef.classList.add("background-color-blue");
    }
}


/**
 * Counts how many subtasks of a task have already been completed.
 *
 * @param {object[]} subtasks - The list of subtasks assigned to the task.
 * @returns {number} The number of finished subtasks.
 */
function countFinishedSubtasks(subtasks){
    let subtaskCounter = 0;
    for (let index = 0; index < subtasks.length; index++) {
        const currentSubtaskStatus = subtasks[index].status;
        if(currentSubtaskStatus == true){
            subtaskCounter++
        }
    }
    return subtaskCounter;
}


/**
 * Renders the subtask progress bar for a task card
 * if the task contains at least one subtask.
 *
 * @param {object[]} subtasks - The list of subtasks assigned to the task.
 * @param {string} id - The id of the task card.
 */
function showSubtaskProgress(subtasks, id){
    const subTaskContainerRef = document.getElementById("subTaskContainerNr" + id);
    const finishedSubTasks = countFinishedSubtasks(subtasks);
    if(subtasks.length < 1){
        return;
    }
    subTaskContainerRef.innerHTML = subtaskProgressbarTemplate(finishedSubTasks, subtasks);
    return;
}


/**
 * Renders the assigned contact bubbles for a task card.
 * If more than four contacts exist, an overflow counter is shown.
 *
 * @param {object[]} contacts - The contacts assigned to the task.
 * @param {string} id - The id of the task card.
 */
function getLetterBalls(contacts, id){
    const letterBallContainerRef = document.getElementById("letterBallContainerNr" + id);
    if(contacts.length > 4){
        renderLetterballsWithCounter(contacts, letterBallContainerRef, id);
    }
    else{
        renderLetterballsWthoutCounter(contacts, letterBallContainerRef);
    }
}


/**
 * Renders up to four contact bubbles and shows a counter
 * for the number of additional assigned contacts.
 *
 * @param {object[]} contacts - The contacts assigned to the task.
 * @param {HTMLElement} containerRef - The container that receives the rendered contact bubbles.
 */
function renderLetterballsWithCounter(contacts, containerRef, id){
    const remainingContactballContainer = document.getElementById("remainingContactballContainerNr" + id);
    let distanceBetweenInitalBalls = 0;
    for (let index = 0; index < 4; index++) {
            const initals = contacts[index].initals;
            const color = contacts[index].color;
            const contactId = contacts[index].id;
            containerRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
            distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
        }
    remainingContactballContainer.innerHTML += `<span class="remaining-contact-bubble-font" style="padding-left: 92px;">+${contacts.length - 4}</span>`;
}


/**
 * Renders all assigned contact bubbles without an overflow counter.
 *
 * @param {object[]} contacts - The contacts assigned to the task.
 * @param {HTMLElement} contentRef - The container that receives the rendered contact bubbles.
 */
function renderLetterballsWthoutCounter(contacts, contentRef){
    let distanceBetweenInitalBalls = 0;
    for (let index = 0; index < contacts.length; index++) {
            const initals = contacts[index].initals;
            const color = contacts[index].color;
            const contactId = contacts[index].id;
            contentRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
            distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
        }
}


/**
 * Loads the contact list of a task by its id.
 *
 * @param {string} id - The id of the task.
 * @returns {Promise<object[]|undefined>} A promise that resolves to the task contacts or undefined.
 */
async function getContactsContainerFromTaskByID(id){
    const taskEntries = await getTaskEntriesFromDataBase();
    for (let index = 0; index < taskEntries.length; index++) {
        const taskID = taskEntries[index][0];
        if(taskID === id){
            const contacts = taskEntries[index][1].contacts;
            return contacts
        }
    }
    return;
}


/**
 * Opens the move-to popup menu for the selected task card.
 *
 * @param {MouseEvent} event - The click event that opened the popup menu.
 * @param {string} id - The id of the selected task.
 * @returns {Promise<void>} A promise that resolves when the popup content has been rendered.
 */
async function openPopupMenu(event, id) {
    event.stopPropagation();
    closeAllPopupMenus();
    currentClickedTaskID = id;
    renderTheRightMoveToOptionsTemplate(id);
}


/**
 * Closes all currently open popup menus on the board.
 */
function closeAllPopupMenus() {
    const openMenus = document.querySelectorAll('[id^="popupMenuNR"]');
    openMenus.forEach((menuRef) => {
        menuRef.innerHTML = "";
    });
}


/**
 * Moves a task to another status from the popup menu
 * and re-renders the board afterwards.
 *
 * @param {MouseEvent} event - The click event triggered inside the popup menu.
 * @param {string} id - The id of the task to move.
 * @param {string} status - The target status for the task.
 * @returns {Promise<void>} A promise that resolves when the task has been moved.
 */
async function moveTaskFromMenu(event, id, status) {
    event.stopPropagation();
    await updateStatusFromTask(id, status);
    await renderAllCards();
}       


document.addEventListener("click", (event) => {
    if (
        event.target.closest(".popUpMenue-moveto") ||
        event.target.closest(".swap-button-board")
    ) {
        return;
    }
    closeAllPopupMenus();
});