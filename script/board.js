
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
function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}

function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}

async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}

async function getTaskEntriesFromDataBase(){
    let variable;
    variable = await loadData("/tasks");
    const entries = Object.entries(variable ?? {});
    return entries;
}

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

async function onloadFunc() {
    const toDoContainerRef = document.getElementById("toDoContainerID");

    const entries = await getTaskEntriesFromDataBase(); 

 
   
    
    for (let index = 0; index < entries.length; index++) {
        const taskID = entries[index][0];

        const category = entries[index][1].category;
        const title = entries[index][1].title;
        const description = entries[index][1].description;
        const subtasks = entries[index][1].subtasks ?? [];
        const contacts = entries[index][1].contacts ?? [];
        const priority = entries[index][1].priority;

        

        

        toDoContainerRef.innerHTML +=   `
                                            <div class="filled-card-board">

                                                <div class="headline-card-container-board">
                                                    <span class="headline-card-board" id="categoryNr${taskID}">${category}</span>
                                                </div>

                                                <span class="headline-font-task-card">
                                                    ${title}
                                                </span>

                                                <span class="description-font-card">
                                                    ${description}
                                                </span>

                                                <div class="progress-container-card" id="subTaskContainerNr${taskID}">
                                                    
                                                </div>

                                                <div class="letter-ball-and-priority-container">
                                                    <div class="letter-ball-container" id="letterBallContainerNr${taskID}">
                                                        
                                                    </div>
                                                    <div id="priorityNr${taskID}">
                                                    </div>
                                                </div>

                                            </div>
                                        `

                                        getImgByPriority(priority, taskID);
                                        getHeadlineCardColor(category, taskID);
                                        getLetterBalls(contacts, taskID);
                                        showSubtaskProgress(subtasks, taskID);
                                        
    }
    
    
}