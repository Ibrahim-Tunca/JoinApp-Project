let priority = "";
let subtaskID = 0;
let subtasks = [];
let choosedContacts = [];
let globalUserMail = "";
let currentTaskStatus;
let categoryTouched = false;

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";


initCustomSelects();


function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);

    if(contactFound){
        return;
    }
    
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
        for (let index = 0; index < 4; index++) {
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
    const titleIsValid = checkIfTitleIsValid();
    const dateIsValid = checkIfDateIsValid();

    if (!requiredFieldsAreFilled || titleIsValid == false || dateIsValid == false) {
        return;
    }

    await addNewTask(titleRef, descriptionRef, dateRef, taskCategory);
    popUpSuccesAddTask();

    setTimeout(() => {
        window.location.href = "./board.html";
    }, 2500);
}


function checkIfEverthingImportantIsFillingdOut(title, date, category){
    let everyImportantThingIsFilled = true;
    const cleanedTitle = title.trim();

    if(cleanedTitle === ""){
        everyImportantThingIsFilled = false;
    }
    if(date === ""){
        everyImportantThingIsFilled = false;
    }
    if (date !== "" && !isDateInFuture(date)) {
        everyImportantThingIsFilled = false;
    }
    if(category === ""){
        everyImportantThingIsFilled = false;
    }
    return everyImportantThingIsFilled;
}


function checkIfTitleIsValid(){
    const titleValue = document.forms["addTaskForm"]["addTaskTitle"].value;
    const cleanedTitle = titleValue.trim();

    removeTitleErrorMessage();

    if(cleanedTitle === ""){
        titleErrorMessage();
        return false;
    }
    return true;
}


function checkIfDateIsValid(){
    const dateFontRef = document.getElementById("dateFontID");
    const dateValue = document.forms["addTaskForm"]["addTaskDate"].value;

    removeDateErrorMessage();

    if(dateValue === ""){
        dateErrorMessage();
        return false;
    }
    if (dateValue !== "" && !isDateInFuture(dateValue)) {
        dateErrorMessage();
        dateFontRef.innerHTML = "Please don't take a date in the past!";
        return false;
    }
    return true;
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


function titleErrorMessage(){
    const titleRef = document.getElementById("titleID");
    const titleFontRef = document.getElementById("titleFontID");

    titleRef.classList.add("input-title-error-addTask");
    titleFontRef.style.color = "#FF3D00";
}


function removeTitleErrorMessage(){
    const titleRef = document.getElementById("titleID");
    const titleFontRef = document.getElementById("titleFontID");

    titleRef.classList.remove("input-title-error-addTask");
    titleFontRef.style.color = "black";
}


function dateErrorMessage(){
    const dateRef = document.getElementById("dateID");
    const dateFontRef = document.getElementById("dateFontID");

    dateRef.classList.add("input-date-error-addTask");
    dateFontRef.style.color = "#FF3D00";
    dateFontRef.innerHTML = "This field is required";
}


function removeDateErrorMessage(){
    const dateRef = document.getElementById("dateID");
    const dateFontRef = document.getElementById("dateFontID");

    dateRef.classList.remove("input-date-error-addTask");
    dateFontRef.style.color = "black";
}


function categoryErrorMessage(){
    const categoryRef = document.getElementById("categoryID");
    const categoryErrorMessageRef = document.getElementById("categoryErrorMessageID");

    categoryRef.classList.remove("input-date-error-addTask");
    categoryErrorMessageRef.classList.add("d_none");
}


function removeCategoryErrorMessage(){
    const categoryRef = document.getElementById("categoryID");
    const categoryErrorMessageRef = document.getElementById("categoryErrorMessageID");

    categoryRef.classList.add("input-date-error-addTask");
    categoryErrorMessageRef.classList.remove("d_none");
}

