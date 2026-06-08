let priority = "";
let subtaskID = 0;
let subtasks = [];
let choosedContacts = [];

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

initCustomSelects();

function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);

    if(contactFound){
        return;
    }
    
    choosedContacts.push({id: id, initals: initials, color: color});
    return;
}


function checkIfContactAreAlreadyInArray(id){

    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        if(currentContactID === id){
            setContactInUnfocus(id);
            choosedContacts.splice(index, 1);
            return true;
        }
    }
    setContactInFocus(id);
    return false;
}


function generateInitalBallUnderContactOption(){
    contentRef = document.getElementById("initialBallContainerID");

    contentRef.innerHTML = "";
    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContact = choosedContacts[index];
        
        const initials = currentContact.initals;
        const color = currentContact.color;
        contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
    }

}


function popUpSuccesAddTask(){

    const popUpWindowRef = document.getElementById("popUpSuccesID");
    const whiteTransparentOverlayRef = document.getElementById("whiteTransparentOverlayID");

    popUpWindowRef.classList.add("top-50-percent");
    whiteTransparentOverlayRef.classList.add("show-overlay-add-task");

    return;
}


function relodePage(){
    window.location.reload();
}


async function validateAddTaskForm(event){
    event.preventDefault();

    const titleRef = document.forms["addTaskForm"]["addTaskTitle"].value;
    const descriptionRef = document.forms["addTaskForm"]["addTaskDescription"].value;
    const dateRef = document.forms["addTaskForm"]["addTaskDate"].value;
    const taskCategory = document.forms["addTaskForm"]["taskCategory"].value;

    const requiredFieldsAreFilled = checkIfEverthingImportantIsFillingdOut(titleRef, dateRef, taskCategory);

    if (!requiredFieldsAreFilled) {
        return;
    }

    await addNewTask(titleRef, descriptionRef, dateRef, taskCategory);
    popUpSuccesAddTask();

    setTimeout(() => {
        window.location.reload();
    }, 2500);
}


function checkIfEverthingImportantIsFillingdOut(title, date, category){
    const titleRef = document.getElementById("titleID");
    const dateRef = document.getElementById("dateID");
    const prioContainerRef = document.getElementById("prioID");

    const titleFontRef = document.getElementById("titleFontID");
    const dateFontRef = document.getElementById("dateFontID");

    titleFontRef.style.color = "black";
    dateFontRef.style.color = "black";

    
    titleRef.classList.remove("input-title-error-addTask");
    dateRef.classList.remove("input-date-error-addTask");
    prioContainerRef.classList.remove("prio-buttons-order-error-addTask");

    if(title === ""){
        titleRef.classList.add("input-title-error-addTask");
        titleFontRef.style.color = "#FF3D00";
        return false;
    }
    if(date === ""){
        dateRef.classList.add("input-date-error-addTask");
        dateFontRef.style.color = "#FF3D00";
        return false;
    }
    if(priority === ""){
        prioContainerRef.classList.add("prio-buttons-order-error-addTask");
        return false;
    }
    return true;
}