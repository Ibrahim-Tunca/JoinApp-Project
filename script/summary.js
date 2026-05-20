const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

async function getTaskEntriesFromDataBase(){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    return entries;
}


async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}


async function loadTaskStats(){
     greetLoggedUser();
    const tasks = await getTaskEntriesFromDataBase();
    const urgentTasksNumberRef = document.getElementById("urgentTasksNumberID");
    const tasksBoardNumberRef = document.getElementById("tasksBoardNumberID");
    const tasksTodoNumberRef = document.getElementById("tasksTodoNumberID");
    const tasksInProgressNumberRef = document.getElementById("tasksInProgressNumberID");
    const tasksAwaitingFeedbackNumberRef = document.getElementById("tasksAwaitingFeedbackNumberID");
    const tasksDoneNumberRef = document.getElementById("tasksDoneNumberID");

    let urgentCounter = 0, onBoardCounter = 0, todoCounter = 0, progressCounter = 0, feedbackCounter = 0, doneCounter = 0;

    for (let index = 0; index < tasks.length; index++) {
        const currentStatus = tasks[index][1].status;
        const currentPriority = tasks[index][1].priority;

        switch(currentStatus){
            case"todo":{
                todoCounter++;
                break;
            }
            case"inProgress":{
                progressCounter++;
                break;
            }
            case"awaitFeedback":{
                feedbackCounter++;
                break;
            }
            case"done":{
                doneCounter++;
                break;
            }
        }

            if(currentPriority === "urgent"){
                urgentCounter++;
            }
            onBoardCounter++;
    }    
        urgentTasksNumberRef.innerHTML = urgentCounter;
        tasksBoardNumberRef.innerHTML = onBoardCounter;

        tasksTodoNumberRef.innerHTML = todoCounter;
        tasksInProgressNumberRef.innerHTML = progressCounter;
        tasksAwaitingFeedbackNumberRef.innerHTML = feedbackCounter;
        tasksDoneNumberRef.innerHTML = doneCounter;
}


function greetLoggedUser(){
    const greetingContainerRef = document.getElementById("greetingID");
    const userIsLogged = checkIfUserIsLogged();
    
    if(!userIsLogged){
        greetingContainerRef.innerHTML = `<h1 class="h1-summary">Good morning</h1>`;
        return;
    }else {
        const userDataString = localStorage.getItem("userData")
        const userData = JSON.parse(userDataString);
        const username = userData.userName;

        greetingContainerRef.innerHTML = `<span class="greeting-font-summary">Good morning,</span><span class="username-font-summary"> ${username}</span>`
    }
 
}
