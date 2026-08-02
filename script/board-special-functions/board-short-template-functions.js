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
 * Returns the HTML template for the move-to menu
 * of a task that is currently in the "todo" column.
 *
 * @param {string} id - The id of the selected task.
 * @returns {string} The HTML string for the move-to popup menu.
 */
function getMoveToMenuTodoTemplate(id){
    return `
                <div class="swap-button-order-board">
                                            <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                            <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                            <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                </div>
            `
}


/**
 * Returns the HTML template for the move-to menu
 * of a task that is currently in the "in progress" column.
 *
 * @param {string} id - The id of the selected task.
 * @returns {string} The HTML string for the move-to popup menu.
 */
function getMoveToMenuInProgressTemplate(id){
    return `
                <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                </div>
            `
}


/**
 * Returns the HTML template for the move-to menu
 * of a task that is currently in the "awaiting feedback" column.
 *
 * @param {string} id - The id of the selected task.
 * @returns {string} The HTML string for the move-to popup menu.
 */
function getMoveToMenuAwaitFeedbackTemplate(id){
    return `
                <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                </div>
            `
}


/**
 * Returns the HTML template for the move-to menu
 * of a task that is currently in the "done" column.
 *
 * @param {string} id - The id of the selected task.
 * @returns {string} The HTML string for the move-to popup menu.
 */
function getMoveToMenuDoneTemplate(id){
    return `
                <div class="swap-button-order-board">
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                        <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                </div>
            `
}