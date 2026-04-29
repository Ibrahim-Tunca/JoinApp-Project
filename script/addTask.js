let priority = "";

let subtaskID = 0;

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


function addContactInTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArray(id);

    if(contactFound){
        console.log(choosedContacts);
        return;
    }

    choosedContacts.push({id: id, initals: initials, color: color});
    console.log(choosedContacts);
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


function setContactInFocus(id){
    contactRef = document.getElementById("contactID" + id);
    checkBoxRef = document.getElementById("checkBoxID" + id);

    contactRef.classList.add("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("./img/addTask/checkbox_checked_white.svg")';
}


function setContactInUnfocus(id){
    contactRef = document.getElementById("contactID" + id);
    checkBoxRef = document.getElementById("checkBoxID" + id);

    contactRef.classList.remove("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("../img/checkbox_unchecked.svg")';
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



