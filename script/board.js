let currentDraggedTaskID;

let currentClickedTaskID;

function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}


function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}


function showAddTaskWindow() {
    const sectionContainerRef = document.getElementById("formContainerID");
    sectionContainerRef.innerHTML = getAddTaskFormTemplate();

    const addTaskWindowRef = document.getElementById("addTaskForm");

    showWhiteTransparentOverlay();
    initCustomSelects();
    loadContacts();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            addTaskWindowRef.classList.remove("slide-addTask-window-board");
        });
    });
}




function hideAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");

    if(!addTaskWindowRef){
        return
    }

    addTaskWindowRef.classList.add("slide-addTask-window-board");
    hideWhiteTransparentOverlay();
}


function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    if(!cardDetailContainerRef){
        return
    }

    cardDetailContainerRef.classList.remove("top-50-percent");
    hideWhiteTransparentOverlay();
}


async function renderAllCards() {
    const toDoContainerRef = document.getElementById("toDoContainerID");
    const inProgressContainerRef = document.getElementById("inProgressContainerID");
    const awaitFeedbackContainerRef = document.getElementById("awaitFeedbackContainerID");
    const doneContainerRef = document.getElementById("doneContainerID");

    const toDoTasks = await getToDoCards();
    const inProgressTasks = await getInProgressCards();
    const awaitFeedbackTasks = await getAwaitFeedbackCards();
    const doneTasks = await getDoneCards();


    getCardValues(toDoTasks, toDoContainerRef);
    getCardValues(inProgressTasks, inProgressContainerRef);
    getCardValues(awaitFeedbackTasks, awaitFeedbackContainerRef);
    getCardValues(doneTasks, doneContainerRef);
}


function getCardValues(tasks, containerRef){
    containerRef.innerHTML = "";

    if(tasks.length === 0){
            containerRef.innerHTML = `<div class="no-task-to-do"> No Task To do</div>`
        };

    for (let index = 0; index < tasks.length; index++) {
        const taskID = tasks[index][0];
        const title = tasks[index][1].title;
        const description = tasks[index][1].description;
        const category = tasks[index][1].category;
        const date = tasks[index][1].date;
        const priority = tasks[index][1].priority;
        
        const contacts = tasks[index][1].contacts || [];
        const subtasks = tasks[index][1].subtasks || [];
        
        containerRef.innerHTML +=   getCardTemplate(taskID, title, description, category, date, priority)
                                        getImgByPriority(priority, taskID);
                                        getHeadlineCardColor(category, taskID);
                                        getLetterBalls(contacts, taskID);
                                        showSubtaskProgress(subtasks, taskID);
                                        getContactsContainerFromTaskByID(taskID);
                                        
    }

}

