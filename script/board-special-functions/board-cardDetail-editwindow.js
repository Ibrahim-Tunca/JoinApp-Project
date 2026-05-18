function loadPriorityButton(prio){
    if(prio === "low"){
        setPrioToLow();
    }
    if(prio === "medium"){
        setPrioToMedium
    }
    if(prio === "urgent"){
        setPrioToUrgent
    }
}


function setAllContactsInFocusThatAreAlreadyChoosed(){

    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        
        setContactInFocus(currentContactID);
    }
    
}


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


function renderSubtasks(){
    const createdSubtasksContainer = document.getElementById("createdSubtasksContainerID");

    for (let index = 0; index < subtasks.length; index++) {
        const currentSubtaskID = subtasks[index].id;
        const subtaskValue = subtasks[index].value;
        createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(currentSubtaskID, subtaskValue);
        subtaskID++;
    }
}


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


async function updateStatusFromTask(taskID, status){
    return await patchData("/tasks/" + taskID,{
        status: status
    });
}


async function updateTask(){
    const titleRef = document.forms["addTaskForm"]["addTaskTitle"].value;
    const descriptionRef = document.forms["addTaskForm"]["addTaskDescription"].value;
    const dateRef = document.forms["addTaskForm"]["addTaskDate"].value;
    const taskCategory = document.forms["addTaskForm"]["taskCategory"].value;

    return await patchData("/tasks/" + taskID,{
        status: status
    });
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

                    <div class="close-button-carddetail-edit">
                            <img 
                                onclick="hideAddTaskWindow()" 
                                class="close-button" 
                                src="./img/close-blue.svg"
                                onmouseenter="this.src='./img/close-deep-blue.svg'"
                                onmouseleave="this.src='./img/close-blue.svg'"
                            >
                    </div>

                    <form onsubmit="validateAddTaskForm(event)" name="addTaskForm" class="addTask-cardDetailContainer-board" id="addTaskForm">

                        

                        <input name="addTaskTitle" class="input-title-carddetail-edit" type="text" value="${title}" id="titleID">

                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Description</span>
                        </div>
                        <textarea class="textarea-description-addtask" name="addTaskDescription" placeholder="Enter a Description">${description}</textarea>
                        


                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Due date</span>
                        </div>
                        <input class="input-date-addTask" type="date" name="addTaskDate" placeholder="tt/mm/jjjj" value="${date}" id="dateID">
                        <span id="dateFontID">This field is required</span>


                        <priority class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Priority</span>
                            <div class="prio-buttons-order-addTask margin-top-add-task" id="prioID">
                                <button onclick="setPrioToUrgent()" type="button" class="prio-buttons-addTask high-prio-button-addTask" id="urgentPrioID">Urgent<img class="prio-icons-addTask" src="./img/addTask/prio-high.svg" id="urgentPrioIMGID"></button>
                                <button onclick="setPrioToMedium()" type="button" class="prio-buttons-addTask mid-prio-button-addTask" id="mediumPrioID">Medium<img class="prio-icons-addTask" src="./img/addTask/prio-medium.svg" id="midPrioIMGID"></button>
                                <button onclick="setPrioToLow()" type="button" class="prio-buttons-addTask low-prio-button-addTask" id="lowPrioID">Low<img class="prio-icons-addTask" src="./img/addTask/prio-low.svg" id="lowPrioIMGID"></button>
                            </div>
                        </priority>





                        <assignedTo class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Assigned to</span><span class="font-normal-add-task"> (optional)</span>
                        </assignedTo>



                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select contacts to assign">
                            <input type="hidden" name="contacts" value="">
                            
                            <button type="button" class="custom-select-toggle-addTask">
                                <span class="custom-select-label-addTask">Select contacts to assign</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none" id="contactSelectionID">
                            </div>
                        </div>

                        <div class="contact-inital-ball-container-under-contact-option" id="initialBallContainerID"></div>


                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select task category" id="categoryID">
                            <input type="hidden" name="taskCategory">
                            
                            <button type="button" class="custom-select-toggle-addTask underline-color-select-category">
                                <span class="custom-select-label-addTask">Select task category</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none">
                                <button type="button" class="custom-select-option-addTask" data-value="Technical Task">Technical Task</button>
                                <button type="button" class="custom-select-option-addTask" data-value="User Story">User Story</button>
                            </div>
                        </div>

                            


                        <subtask class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Subtask</span><span class="font-normal-add-task"> (optional)</span>
                            
                        </subtask>

                        <div class="wrapper-div-container margin-top-add-task margin-bottom-add-task">
                            <input onkeyup="showButtons()" name="subtaskform" class="input-subtask-addTask" type="text" placeholder="add new subtask" id="subtaskValueID">
                            
                            <div class="cancel-and-confirm-container d_none" id="subtasksInputfieldButtonContainerID">
                                    <img onclick="deleteInputValueSubtask()" class="cancel-icon" src="./img/addTask/cancel.svg">
                                    <span class="cancel-and-confirm-separator"></span>
                                    <img onclick="pasteSubtaskUnderInputfield()" class="confirm-icon" src="./img/addTask/confirm.svg">
                            </div>
                        </div>

                        <div class="subtask-container-window" id="createdSubtasksContainerID"></div>


                        


                    </form>

                    <div class="ok-button-container-carddetail-edit">
                            <button type="submit" form="addTaskForm" class="button-blue-addtask" style="padding: 0 5px">
                                Ok
                                <img class="affirmative-icon-addtask" src="./img/addTask/check.svg" alt="">
                            </button>
                    </div>
                                `
                                initCustomSelects();
                                await loadContacts();
                                loadPriorityButton(priority);

                                setAllContactsInFocusThatAreAlreadyChoosed();
                                generateInitalBallUnderContactOption();
                                renderSubtasks();
                                                                                            
}