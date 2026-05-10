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


function showSubtaskProgress(subtasks, id){
    const subTaskContainerRef = document.getElementById("subTaskContainerNr" + id);

    if(subtasks.length < 1){
        return;
    }

    subTaskContainerRef.innerHTML = `
                                        <progress class="progress-bar-style-board" value="0" max="100"></progress>
                                        <span >0/${subtasks.length} Subtasks</span>
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

function getLetterBallsCardDetailWindow(contacts){
    let contactContainerRef = document.getElementById("cardDetailContactContainerID");
    for (let index = 0; index < contacts.length; index++) {
        const initals = contacts[index].initals;
        const color = contacts[index].color;

        contactContainerRef.innerHTML += `<div class="letter-ball-card ${color}">${initals}</div>`;
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


async function getContacts(id){
    const contactsInDataBase = await getContactEntriesFromDataBase();
    const contactsInTask = await getContactsContainerFromTaskByID(id) || [];
    const cardDetailContactContainerRef = document.getElementById("cardDetailContactContainerID");

    cardDetailContactContainerRef.innerHTML = "";

    for (let index = 0; index < contactsInTask.length; index++) {
        const contactTaskID = contactsInTask[index].id;
        for (let index = 0; index < contactsInDataBase.length; index++) {
            const contactDataBaseID = contactsInDataBase[index][0];
            if(contactDataBaseID === contactTaskID){
                const color = contactsInDataBase[index][1].color;
                const initals = contactsInDataBase[index][1].userName.charAt(0).toUpperCase();
                const name = contactsInDataBase[index][1].userName;
                cardDetailContactContainerRef.innerHTML +=  `
                                                                <div class="assigned-to-single-container">
                                                                    <div class="letter-ball-userstory ${color}"">
                                                                        ${initals}
                                                                    </div>
                                                                    <span>
                                                                        ${name}
                                                                    </span>
                                                                </div>
                                                            `;
            }

        }

    }
    
}


async function updateStatusFromSubtask(subtaskID, taskID, bool){
    return await patchData("/tasks/" + taskID + "/subtasks/" + subtaskID,{
        status: bool
    });
}


async function subTaskDone(subtaskID, taskID){
    const subTaskRef = document.getElementById("subTaskNr" + subtaskID);
    

    for (let index = 0; index < globalSubtasks.length; index++) {
        const currentSubtaskID = globalSubtasks[index].id;

        if(currentSubtaskID === subtaskID){
            const subtaskStatus = globalSubtasks[index].status;
            if(subtaskStatus == false){
                subTaskRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
                const trueBool = true;
                globalSubtasks[index].status = trueBool;
                updateStatusFromSubtask(subtaskID, taskID, trueBool);
            }
            if(subtaskStatus == true){
                subTaskRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
                const falseBool = false;
                globalSubtasks[index].status = falseBool;
                updateStatusFromSubtask(subtaskID, taskID, falseBool); 
            }
            

        }
        
        
    }
    
    
}


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


async function getSubtasks(id){
    const tasks = await getTaskEntriesFromDataBase();
    const cardDetailSubtaskContainerRef = document.getElementById("cardDetailSubtaskContainerID");

    cardDetailSubtaskContainerRef.innerHTML = "";

    for (let index = 0; index < tasks.length; index++) {
        const taskID = tasks[index][0];
        const subtasksArray = tasks[index][1].subtasks || [];
        if(taskID === id){
            for (let index = 0; index < subtasksArray.length; index++) {
                const subtask = subtasksArray[index];
                const subtaskValue = subtasksArray[index].value;
                const subtaskID = subtasksArray[index].id;
                
                globalSubtasks = subtasksArray;
                
                
                
                cardDetailSubtaskContainerRef.innerHTML +=  `
                                                                <div class="subtask-single-container-userstory">
                                                                    <span onclick="subTaskDone(${subtaskID}, '${id}')" class="subtask-checkbox-cardDetail" id="subTaskNr${subtaskID}"></span>
                                                                    <span class="regular-span-font-userstory">${subtaskValue}</span>
                                                                </div>
                                                            `
                subtaskSetTheRigthCheckBoxImg(subtask);
            }
            
            
            
        }
    }
} 


async function showCardDetail(id, title, description, category, date, priority){
    showWhiteTransparentOverlay();
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    const categoryRef = document.getElementById("cardDetailCategoryID");
    const titleRef = document.getElementById("cardDetailTitleID");
    const descriptionRef = document.getElementById("cardDetailDescriptionID");
    const dateRef = document.getElementById("cardDetailDateID");
    const priorityRef = document.getElementById("cardDetailPriorityID");
    
    
    


    categoryRef.innerHTML = category;
    titleRef.innerHTML = title;
    descriptionRef.innerHTML = description;
    dateRef.innerHTML = date;
    getCardDetailPriorityImage(priority);
    getContacts(id);
    getSubtasks(id);
    getHeadlineCardDetailColor(category, id);
    cardDetailContainerRef.classList.add("top-50-percent");
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