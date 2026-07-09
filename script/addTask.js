let priority = "";
let subtaskID = 0;
let subtasks = [];
let choosedContacts = [];
let globalUserMail = "";
let currentTaskStatus;

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";


initCustomSelects();


function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);

    if(contactFound){
        return;
    }
    
    console.log(choosedContacts);
    if(choosedContacts == null){
        choosedContacts = [];
    }
    choosedContacts.push({id: id, initals: initials, color: color});
    return;
}


function checkIfContactAreAlreadyInArray(id){
    if(choosedContacts == null){
        setContactInFocus(id);
        return false;
    }
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

    if(choosedContacts != undefined){
        if(choosedContacts.length > 4){
        for (let index = 0; index < 3; index++) {
            const currentContact = choosedContacts[index];
            const initials = currentContact.initals;
            const color = currentContact.color;
            contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
        }
        contentRef.innerHTML += `<span class="remaining-contact-bubble-font">+${choosedContacts.length - 4}</span>`;
    }else{
            for (let index = 0; index < choosedContacts.length; index++) {
            const currentContact = choosedContacts[index];
            const initials = currentContact.initals;
            const color = currentContact.color;
            contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
            }
        }
    }
}


function popUpSuccesAddTask(){
    const popUpWindowRef = document.getElementById("popUpSuccesID");
    const whiteTransparentOverlayRef = document.getElementById("whiteTransparentOverlayID");
    popUpWindowRef.classList.add("top-50-percent");
    whiteTransparentOverlayRef.classList.add("show-overlay-add-task");
    return;
}


function resetGlobalArrays(){
    const contactBallsRef = document.getElementById("initialBallContainerID");
    const subtasksRef = document.getElementById("createdSubtasksContainerID");
    const contactSelectionContainerRef = document.getElementById("contactSelectionID");
    choosedContacts = [];
    subtasks = [];

    contactBallsRef.innerHTML = "";
    subtasksRef.innerHTML = "";
    contactSelectionContainerRef.innerHTML = "";
    loadContacts();
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
    let everyImportantThingIsFilled = true;

    const cleanedTitle = title.trim();

    const titleRef = document.getElementById("titleID");
    const dateRef = document.getElementById("dateID");
    const categoryRef = document.getElementById("categoryID");

    const titleFontRef = document.getElementById("titleFontID");
    const dateFontRef = document.getElementById("dateFontID");

    titleFontRef.style.color = "black";
    dateFontRef.style.color = "black";

    titleRef.classList.remove("input-title-error-addTask");
    dateRef.classList.remove("input-date-error-addTask");
    categoryRef.classList.remove("input-date-error-addTask");

    dateFontRef.innerHTML = `This field is required`

    if(cleanedTitle === ""){
        titleRef.classList.add("input-title-error-addTask");
        titleFontRef.style.color = "#FF3D00";
        everyImportantThingIsFilled = false;
    }
    if(date === ""){
        dateRef.classList.add("input-date-error-addTask");
        dateFontRef.style.color = "#FF3D00";
        dateFontRef.innerHTML = "This field is required";
        everyImportantThingIsFilled = false;
    }
    if (date !== "" && !isDateInFuture(date)) {
        dateRef.classList.add("input-date-error-addTask");
        dateFontRef.style.color = "#FF3D00";
        dateFontRef.innerHTML = "Please don't take a date in the past!";
        everyImportantThingIsFilled = false;
    }
    if(category === ""){
        categoryRef.classList.add("input-date-error-addTask");
        everyImportantThingIsFilled = false;
    }

    return everyImportantThingIsFilled;
}


function isDateInFuture(dateValue) {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    return dateValue >= minDate;
}