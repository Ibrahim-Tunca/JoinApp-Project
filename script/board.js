let globalSubtasks = [];

function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}


function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}


function showAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");
    addTaskWindowRef.classList.remove("slide-addTask-window-board");
    showWhiteTransparentOverlay();
}


function hideAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");
    addTaskWindowRef.classList.add("slide-addTask-window-board");
    hideWhiteTransparentOverlay();
}


function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");
    cardDetailContainerRef.classList.remove("top-50-percent");
    hideWhiteTransparentOverlay();
}





async function loadCardsToDo() {
    const toDoContainerRef = document.getElementById("toDoContainerID");
    const entries = await getTaskEntriesFromDataBase(); 

    for (let index = 0; index < entries.length; index++) {
        const taskID = entries[index][0];
        const title = entries[index][1].title;
        const description = entries[index][1].description;
        const category = entries[index][1].category;
        const date = entries[index][1].date;
        const priority = entries[index][1].priority;
        
        const contacts = entries[index][1].contacts ?? [];
        const subtasks = entries[index][1].subtasks ?? [];
        
        toDoContainerRef.innerHTML +=   getCardTemplate(taskID, title, description, category, date, priority)
                                        getImgByPriority(priority, taskID);
                                        getHeadlineCardColor(category, taskID);
                                        getLetterBalls(contacts, taskID);
                                        showSubtaskProgress(subtasks, taskID);
                                        getContactsContainerFromTaskByID(taskID);
                                        
    }
}


