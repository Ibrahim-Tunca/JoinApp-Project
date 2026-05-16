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


function getLetterBallsCardDetailWindow(contacts){
    let contactContainerRef = document.getElementById("cardDetailContactContainerID");
    for (let index = 0; index < contacts.length; index++) {
        const initals = contacts[index].initals;
        const color = contacts[index].color;

        contactContainerRef.innerHTML += `<div class="letter-ball-card ${color}">${initals}</div>`;
    }
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


async function getSubtaskArrayFromDataBaseByID(taskID){
    const task = await getTaskById(taskID);
    const subtaskArray = task.subtasks;
    return subtaskArray;
}


async function subTaskDone(subtaskID, taskID){
    const subTaskRef = document.getElementById("subTaskNr" + subtaskID);
    const subtaskArray = await getSubtaskArrayFromDataBaseByID(taskID);
    
    

    for (let index = 0; index < subtaskArray.length; index++) {
        const currentSubtaskID = subtaskArray[index].id;

        if(currentSubtaskID === subtaskID){
            const subtaskStatus = subtaskArray[index].status;
            if(subtaskStatus == false){
                subTaskRef.style.backgroundImage = 'url("../../img/checkbox_checked.svg")';
                const trueBool = true;
                await updateStatusFromSubtask(subtaskID, taskID, trueBool);
                await renderAllCards();
            }
            if(subtaskStatus == true){
                subTaskRef.style.backgroundImage = 'url("../../img/checkbox_unchecked.svg")';
                const falseBool = false;
                await updateStatusFromSubtask(subtaskID, taskID, falseBool); 
                await renderAllCards();
            }
            

        }
        
        
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


async function showCardDetail(id, title, description, category, date, priority){
    showWhiteTransparentOverlay();
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    const categoryRef = document.getElementById("cardDetailCategoryID");
    const titleRef = document.getElementById("cardDetailTitleID");
    const descriptionRef = document.getElementById("cardDetailDescriptionID");
    const dateRef = document.getElementById("cardDetailDateID");
    const priorityRef = document.getElementById("cardDetailPriorityID");
    currentClickedTaskID = id;

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

async function editCardDetail(){
    const cardDetailRef = document.getElementById("cardDetailContainerID");
    const task = await getTaskById(currentClickedTaskID);

    const title = task.title;
    const description = task.description;
    const date = task.date;
    const priority = task.priority;
    const subtaskArray = task.subtasks;
    const contacts = task.contacts;

    
    
    
    subtasks = subtaskArray;
    choosedContacts = contacts;


    cardDetailRef.innerHTML =   `
                                <form onsubmit="validateAddTaskForm(event)" name="addTaskFormInCardDetail" class="addTask-maincontainer-board slide-addTask-window-board" id="addTaskFormInCardDetail">
                                    <div style="display: flex; justify-content: flex-end">
                                        <img 
                                                class="close-button-userstory" 
                                                src="./img/close-blue.svg"
                                                onclick="hideCardDetailWindow()"
                                                onmouseenter="this.src='./img/close-deep-blue.svg'"
                                                onmouseleave="this.src='./img/close-blue.svg'"
                                        >
                                    </div>

                                    <input name="addTaskTitle" class="input-title-addTask" type="text" value="${title}" id="titleID">

                                    <div class="margin-top-add-task">
                                        <span class="font-bold-add-task">Description</span>
                                    </div>
                                    <textarea class="textarea-description-addtask" name="addTaskDescription">${description}</textarea>

                                    <div class="margin-top-add-task">
                                        <span class="font-bold-add-task">Due date</span>
                                    </div>
                                    <input class="input-date-addTask" type="date" name="addTaskDate" value="${date}" id="dateID">

                                    <priority class="margin-top-bigger-add-task">
                                        <span class="font-bold-add-task">Priority</span>
                                        <div class="prio-buttons-order-addTask margin-top-add-task" id="prioID">
                                            <button onclick="setPrioToUrgent()" type="button" class="prio-buttons-addTask high-prio-button-addTask" id="urgentPrioID">Urgent<img class="prio-icons-addTask" src="./img/addTask/prio-high.svg" id="urgentPrioIMGID"></button>
                                            <button onclick="setPrioToMedium()" type="button" class="prio-buttons-addTask mid-prio-button-addTask" id="mediumPrioID">Medium<img class="prio-icons-addTask" src="./img/addTask/prio-medium.svg" id="midPrioIMGID"></button>
                                            <button onclick="setPrioToLow()" type="button" class="prio-buttons-addTask low-prio-button-addTask" id="lowPrioID">Low<img class="prio-icons-addTask" src="./img/addTask/prio-low.svg" id="lowPrioIMGID"></button>
                                        </div>
                                    </priority>

                                    <assignedTo class="margin-top-bigger-add-task">
                                        <span class="font-bold-add-task">Assigned to</span>
                                    </assignedTo>

                                    


                                    <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select contacts to assign">
                                        <input type="hidden" name="contacts" value="">
                                        
                                        <button type="button" class="custom-select-toggle-addTask">
                                            <span class="custom-select-label-addTask">Select contacts to assign</span>
                                            <span class="custom-select-arrow-wrap-addTask">
                                                <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                            </span>
                                        </button>

                                        <div class="custom-select-menu-addTask d_none" id="contactSelectionCardDetailID">
                                        </div>
                                    </div>

                                    <div class="contact-inital-ball-container-under-contact-option" id="initialBallContainerCardDetailID"></div>


                                    <subtask class="margin-top-bigger-add-task">
                                        <span class="font-bold-add-task">Subtask</span>
                                    </subtask>

                                    <div class="wrapper-div-container margin-top-add-task margin-bottom-add-task">
                                        <input onkeyup="showButtonsCardDetail" name="subtaskformInCardDetail" class="input-subtask-addTask" type="text" placeholder="add new subtask" id="subtaskValueID">
                                        
                                        <div class="cancel-and-confirm-container d_none" id="subtasksInputfieldButtonCardDetailContainerID">
                                                <img onclick="deleteInputValueSubtask()" class="cancel-icon" src="./img/addTask/cancel.svg">
                                                <span class="cancel-and-confirm-separator"></span>
                                                <img onclick="pasteSubtaskUnderInputfieldCardDetail()" class="confirm-icon" src="./img/addTask/confirm.svg">
                                        </div>
                                    </div>

                                    <div class="subtask-container-window" id="createdSubtasksInCardDetailContainerID"></div>
                                
                                </form>
                                `
                                  
                                initCustomSelects();
                                await loadContactsInCardDetailWindow(); 
                                generateInitalBallUnderContactOptionCardDetail();
                                
                                
                                 
}