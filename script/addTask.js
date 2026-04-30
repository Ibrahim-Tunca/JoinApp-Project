let priority = "";
let subtaskID = 0;
let subtasks = [];
let choosedContacts = [];

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

initCustomSelects();


async function loadContacts(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);

    const contactSelectionContainerRef = document.getElementById("contactSelectionID");

    for (let index = 0; index < entries.length; index++) {
        const contactName = entries[index][1].userName;
        const contactColor = entries[index][1].color;
        const contactInitals = entries[index][1].userName.charAt(0).toUpperCase();
        const contactKey = entries[index][0];        

        contactSelectionContainerRef.innerHTML += contactSelectionTemplate(contactKey, contactInitals, contactColor, contactName);
    }
    
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


function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);

    if(contactFound){
        return;
    }

    choosedContacts.push({id: id, initals: initials, color: color});
    return;
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



function relodePage(){
    window.location.reload();
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


function popUpSuccesAddTask(){

    const popUpWindowRef = document.getElementById("popUpSuccesID");
    const whiteTransparentOverlayRef = document.getElementById("whiteTransparentOverlayID");

    popUpWindowRef.classList.add("top-50-percent");
    whiteTransparentOverlayRef.classList.add("show-overlay-add-task");

    return;
}




