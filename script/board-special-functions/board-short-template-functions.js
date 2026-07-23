function subtaskProgressbarTemplate(finishedSubTasks, subtasks){
    return  `
                <progress class="progress-bar-style-board" value="${finishedSubTasks}" max="${subtasks.length}"></progress>
                <span >${finishedSubTasks}/${subtasks.length} Subtasks</span>
            `
}


function getSubtaskTemplate(subtaskID, subtaskValue, id){
    return  `
                <div class="subtask-single-container-userstory">
                    <span onclick="subTaskDone(${subtaskID}, '${id}')" class="subtask-checkbox-cardDetail" id="subTaskNr${subtaskID}"></span>
                    <span class="regular-span-font-userstory">${subtaskValue}</span>
                </div>
            `
}


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