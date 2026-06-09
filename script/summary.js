const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let deadline;

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
        
        getDeadlineDate()
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


async function getDeadlineDate(){
    const tasks = await getTaskEntriesFromDataBase();
    const currentDate = new Date();

    for (let index = 0; index < tasks.length; index++) {
        const taskDate = tasks[index][1].date;        
        updateDeadlineIfTaskDateIsUpcoming(taskDate, currentDate);
        setNewDeadline();
    }

}


function setNewDeadline(){
    const yearRef = document.getElementById("yearID");
    const monthRef = document.getElementById("monthID");
    const dayRef = document.getElementById("dayID");

    if(!deadline){
        monthRef.innerHTML = `No Tasks upcoming!`
        return;
    }

    const day = new Date(deadline).getDate();
    const monthNumber = new Date(deadline).getMonth();
    const monthName = months[monthNumber];
    const year = new Date(deadline).getFullYear();

    

    dayRef.innerHTML = day + ",";
    monthRef.innerHTML = monthName;
    yearRef.innerHTML = year;
}


function updateDeadlineIfTaskDateIsUpcoming(taskDate, currentDate){
        const taskYear = new Date(taskDate).getFullYear();
        const taskMonth = new Date(taskDate).getMonth();
        const taskDay = new Date(taskDate).getDate();
        
        if(taskYear >= currentDate.getFullYear()){
            if (taskMonth >= currentDate.getMonth()) {
                if(taskDay >= currentDate.getDate()){
                    checkIfTaskDateEarlierThanLastTaskDateAndUpdateDeadline(taskDay, taskMonth, taskYear, taskDate);
                }
            }
        }
}

function checkIfTaskDateEarlierThanLastTaskDateAndUpdateDeadline(taskDay, taskMonth, taskYear, taskDate){

    if(!deadline){
        deadline = taskDate;
    }

    const deadlineYear = new Date(deadline).getFullYear();
    const deadlineMonth = new Date(deadline).getMonth();
    const deadlineDay = new Date(deadline).getDate();

    if(deadlineYear >= taskYear){
        if(deadlineMonth >= taskMonth){
            if(deadlineDay > taskDay){
                deadline = taskDate;
            }
        }
    }
}