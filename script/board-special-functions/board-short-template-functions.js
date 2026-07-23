/**
 * Returns the HTML template for the subtask progress bar shown on a board card.
 *
 * @param {number} finishedSubTasks - The number of completed subtasks.
 * @param {object[]} subtasks - The full list of subtasks assigned to the task.
 * @returns {string} The HTML string for the progress bar section.
 */
function subtaskProgressbarTemplate(finishedSubTasks, subtasks){
    return  `
                <progress class="progress-bar-style-board" value="${finishedSubTasks}" max="${subtasks.length}"></progress>
                <span >${finishedSubTasks}/${subtasks.length} Subtasks</span>
            `
}


/**
 * Returns the HTML template for a single subtask in the card detail view.
 *
 * @param {string|number} subtaskID - The id of the subtask.
 * @param {string} subtaskValue - The text content of the subtask.
 * @param {string} id - The id of the parent task.
 * @returns {string} The HTML string for the subtask entry.
 */
function getSubtaskTemplate(subtaskID, subtaskValue, id){
    return  `
                <div class="subtask-single-container-userstory">
                    <span onclick="subTaskDone(${subtaskID}, '${id}')" class="subtask-checkbox-cardDetail" id="subTaskNr${subtaskID}"></span>
                    <span class="regular-span-font-userstory">${subtaskValue}</span>
                </div>
            `
}


/**
 * Returns the HTML template for an assigned contact in the card detail view.
 *
 * @param {string} color - The CSS color class used for the contact avatar.
 * @param {string} initials - The initials displayed for the contact.
 * @param {string} name - The display name of the contact.
 * @returns {string} The HTML string for the assigned contact entry.
 */
function getContactTemplate(color, initials, name){
    return `
                <div class="assigned-to-single-container">
                    <div class="letter-ball-userstory ${color}"">
                        ${initials}
                    </div>
                    <span class="contact-name-font">
                        ${name}
                    </span>
                </div>
            `;
}


/**
 * Renders the correct move-to options for a board card popup menu
 * based on the current task status.
 *
 * @param {string} id - The id of the selected task.
 * @returns {Promise<void>} A promise that resolves when the popup menu has been filled.
 */
async function renderTheRightMoveToOptionsTemplate(id){
    const task = await getTaskById(id);
    const menuRef = document.getElementById("popupMenuNR" + id);
        
    if(task.status === "todo"){
            menuRef.innerHTML = `
                                    <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                                    </div>
                                `
    }
    if(task.status === "inProgress"){
            menuRef.innerHTML = `
                                    <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                                    </div>
                                `
    }
    if(task.status === "awaitFeedback"){
            menuRef.innerHTML = `
                                    <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                                    </div>
                                `
    }
    if(task.status === "done"){
            menuRef.innerHTML = `
                                    <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                    </div>
                                `
    }
}