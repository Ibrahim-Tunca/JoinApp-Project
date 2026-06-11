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


