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
    const formContainerRef = document.getElementById("formContainerID");
    formContainerRef.innerHTML = getCardDetailTemplate();
    const cardDetailContainer = document.getElementById("cardDetailContainerID");

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
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cardDetailContainer.classList.add("top-50-percent");
        });
    });
   
}
