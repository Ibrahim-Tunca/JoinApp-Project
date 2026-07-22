const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let urgentCounter = 0, onBoardCounter = 0, todoCounter = 0, progressCounter = 0, feedbackCounter = 0, doneCounter = 0;
let deadline;


/**
 * Loads all task entries from the database and returns them as an array of key-value pairs.
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all stored task entries.
 */


async function getTaskEntriesFromDataBase(){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    return entries;
}


/**
 * Loads data from the Firebase database for the given path.
 *
 * @param {string} [path=""] - The database path that should be loaded.
 * @returns {Promise<object|null>} A promise that resolves to the loaded JSON data.
 */


async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}


/**
 * Loads all task statistics, updates the greeting, counts tasks by status and priority,
 * and renders the values into the summary page.
 *
 * @returns {Promise<void>} A promise that resolves when the summary values have been updated.
 */


async function loadTaskStats(){
    greetLoggedUser();
    const tasks = await getTaskEntriesFromDataBase();
    const urgentTasksNumberRef = document.getElementById("urgentTasksNumberID");
    const tasksBoardNumberRef = document.getElementById("tasksBoardNumberID");
    const tasksTodoNumberRef = document.getElementById("tasksTodoNumberID");
    const tasksInProgressNumberRef = document.getElementById("tasksInProgressNumberID");
    const tasksAwaitingFeedbackNumberRef = document.getElementById("tasksAwaitingFeedbackNumberID");
    const tasksDoneNumberRef = document.getElementById("tasksDoneNumberID");
    countAllTasksFromAllStatusses(tasks);
        urgentTasksNumberRef.innerHTML = urgentCounter;
        tasksBoardNumberRef.innerHTML = onBoardCounter;
        tasksTodoNumberRef.innerHTML = todoCounter;
        tasksInProgressNumberRef.innerHTML = progressCounter;
        tasksAwaitingFeedbackNumberRef.innerHTML = feedbackCounter;
        tasksDoneNumberRef.innerHTML = doneCounter;
        getDeadlineDate()
}


/**
 * Counts all tasks by status and priority and updates the global summary counters.
 *
 * @param {Array<[string, object]>} tasks - The list of task entries loaded from the database.
 */


function countAllTasksFromAllStatusses(tasks){
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
}


/**
 * Renders a greeting for the current user.
 * If no user data is stored, a generic greeting is shown.
 */


function greetLoggedUser(){
    const greetingContainerRef = document.getElementById("greetingID");
    const greetingResponsiveContainerRef = document.getElementById("greetingResponsiveID");
    const userIsLogged = checkIfUserIsLogged();
    if(!userIsLogged){
        greetingContainerRef.innerHTML = `<h1 class="h1-summary">Good morning</h1>`;
        greetingResponsiveContainerRef.innerHTML = `<h1 class="h1-summary">Good morning</h1>`;
        return;
    }else {
        const userDataString = localStorage.getItem("userData")
        const userData = JSON.parse(userDataString);
        const username = userData.userName;
        greetingContainerRef.innerHTML = `<span class="greeting-font-summary">Good morning,</span><span class="username-font-summary"> ${username}</span>`;
        greetingResponsiveContainerRef.innerHTML = `<span class="greeting-font-summary">Good morning,</span><br><span class="username-font-summary-responsesive">${username}</span>`
    }
}


/**
 * Starts the responsive greeting animation and hides it after a short delay.
 */


function greetAnimation(){
    const greetContainerRef = document.getElementById("greetingResponsiveContainerID");
        setTimeout(() => {
            greetContainerRef.classList.add("hide-greeting");
    }, 3000);
}


/**
 * Finds the nearest upcoming task deadline and triggers the deadline display update.
 *
 * @returns {Promise<void>} A promise that resolves when the deadline has been processed.
 */


async function getDeadlineDate(){
    const tasks = await getTaskEntriesFromDataBase();
    const currentDate = new Date();
    for (let index = 0; index < tasks.length; index++) {
        const taskDate = tasks[index][1].date;        
        updateDeadlineIfTaskDateIsUpcoming(taskDate, currentDate);
        setNewDeadline();
    }

}


/**
 * Displays the currently stored nearest deadline in the summary section.
 * If no upcoming deadline exists, a fallback message is shown.
 */


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


/**
 * Checks whether a task date is today or in the future.
 * If so, it compares the date with the current stored deadline.
 *
 * @param {string} taskDate - The due date of the current task.
 * @param {Date} currentDate - The current date used as the comparison baseline.
 */


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


/**
 * Compares a task date with the currently stored deadline and updates the deadline
 * if the task date is earlier.
 *
 * @param {number} taskDay - The day of the task date.
 * @param {number} taskMonth - The month of the task date.
 * @param {number} taskYear - The year of the task date.
 * @param {string} taskDate - The original task date string.
 */


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