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


function getHeadlineCardColor(category, id){
    const categoryRef = document.getElementById("categoryNr" + id);

    if(category === "User Story"){
        categoryRef.classList.add("background-color-orange");
    }
    if(category === "Technical Task"){
        categoryRef.classList.add("background-color-blue");
    }
}


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


function showSubtaskProgress(subtasks, id){
    const subTaskContainerRef = document.getElementById("subTaskContainerNr" + id);
    const finishedSubTasks = countFinishedSubtasks(subtasks);

    if(subtasks.length < 1){
        return;
    }

    subTaskContainerRef.innerHTML = `
                                        <progress class="progress-bar-style-board" value="${finishedSubTasks}" max="${subtasks.length}"></progress>
                                        <span >${finishedSubTasks}/${subtasks.length} Subtasks</span>
                                    `
    return;
}


function getLetterBalls(contacts, id){
    const letterBallContainerRef = document.getElementById("letterBallContainerNr" + id);
    let distanceBetweenInitalBalls = 0;

    for (let index = 0; index < contacts.length; index++) {
        const initals = contacts[index].initals;
        const color = contacts[index].color;
        const contactId = contacts[index].id;

        letterBallContainerRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
        distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
    }
}


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


async function updateStatusFromSubtask(subtaskID, taskID, bool){
    return await patchData("/tasks/" + taskID + "/subtasks/" + subtaskID,{
        status: bool
    });
}


function getCardTemplate(id, title, description, category, date, priority){
    return  `
                <div class="filled-card-board" onclick="showCardDetail('${id}', '${title}', '${description}', '${category}', '${date}', '${priority}')">

                    <div class="headline-card-container-board">
                        <span class="headline-card-board" id="categoryNr${id}">${category}</span>
                    </div>

                    <span class="headline-font-task-card">
                        ${title}
                    </span>

                    <span class="description-font-card">
                        ${description}
                    </span>

                    <div class="progress-container-card" id="subTaskContainerNr${id}">
                                                    
                    </div>

                    <div class="letter-ball-and-priority-container">
                        <div class="letter-ball-container" id="letterBallContainerNr${id}">
                                                        
                        </div>
                        <div id="priorityNr${id}">
                        </div>
                    </div>

                </div>
            `
}