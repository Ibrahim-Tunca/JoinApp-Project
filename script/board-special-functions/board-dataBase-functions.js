async function loadContactsInCardDetailWindow(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);

    const contactSelectionContainerRef = document.getElementById("contactSelectionCardDetailID");

    for (let index = 0; index < entries.length; index++) {
        const contactName = entries[index][1].userName;
        const contactColor = entries[index][1].color;
        const contactInitals = entries[index][1].userName.charAt(0).toUpperCase();
        const contactKey = entries[index][0];                

        contactSelectionContainerRef.innerHTML += contactSelectionTemplateCardDetail(contactKey, contactInitals, contactColor, contactName);
        setContactInFocusWhenContactIsAlreadyInTheArray(contactKey);
        
    }
    
}


async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}


async function patchData(path="", data={}){
   	 let response = await fetch(BASE_URL + path + ".json",{
        		method: "PATCH",
        		headers: {
            	"Content-Type": "application/json",
        		},
        		body: JSON.stringify(data)
   	});
    return await response.json();
}


async function deleteData(path=""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
    return responseToJson = await response.json();
}


async function getData(path="", taskID = ""){
	const requestPath = taskID ? `${path}/${taskID}` : path;

	const response = await fetch(BASE_URL + path + ".json", {
				method: "GET",
				headers: {
				"Content-Type": "application/json",	
				},

	});
	const responseToJson = await response.json();
	return responseToJson;
}


async function getTaskById(taskID) {
    return await loadData(`/tasks/${taskID}`);
}


async function getTaskEntriesFromDataBase(){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    return entries;
}


async function getContactEntriesFromDataBase(){
    const variable = await loadData("/contacts");
    const entries = Object.entries(variable || {});
    return entries;
}


async function updateStatusFromSubtask(subtaskID, taskID, bool){
    return await patchData("/tasks/" + taskID + "/subtasks/" + subtaskID,{
        status: bool
    });
}


async function updateStatusFromTask(taskID, status){
    return await patchData("/tasks/" + taskID,{
        status: status
    });
}


async function deleteTask(){
    await deleteData("/tasks/" + currentClickedTaskID);
    hideCardDetailWindow();
    renderAllCards();
}
















/*

function generateInitalBallUnderContactOptionCardDetail(){
    contentRef = document.getElementById("initialBallContainerCardDetailID");

    contentRef.innerHTML = "";
    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContact = choosedContacts[index];
        
        const initials = currentContact.initals;
        const color = currentContact.color;
        contentRef.innerHTML += `<div class="contact-initial-ball ${color} margin-right-add-task">${initials}</div>`
    }

}


function contactSelectionTemplateCardDetail(id, initials, color, name){
    return `<label class="contact-option-addTask" id="contactCardDetailID${id}">
                <input
                    onchange="addContactInCardDetailTask('${id}', '${initials}', '${color}', generateInitalBallUnderContactOptionCardDetail())"
                    class="contact-checkbox-addTask"
                    type="checkbox"
                    name="contacts"
                    value="${name}"
                >
                <div class="contact-option-left-container-addTask">
                    <div class="contact-initial-ball ${color}">${initials}</div>
                    <span class="contact-option-font">${name}</span>
                </div>
                <span class="contact-checkbox-visual-addTask" aria-hidden="true" id="checkBoxCarddetailID${id}"></span>
            </label>`
            
}

function addContactInCardDetailTask(id, initials, color){
    let contactFound = checkIfContactAreAlreadyInArrayCardDetail(id);

    if(contactFound){
        return;
    }
    
    choosedContacts.push({id: id, initals: initials, color: color});
    console.log(choosedContacts);
    return;
}


function checkIfContactAreAlreadyInArrayCardDetail(id){

    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        if(currentContactID === id){
            setContactInUnfocusInCardetail(id);
            choosedContacts.splice(index, 1);
            return true;
        }
    }
    setContactInFocusInCardetail(id);
    return false;
}

function setContactInFocusWhenContactIsAlreadyInTheArray(id){
    for (let index = 0; index < choosedContacts.length; index++) {
        const currentContactID = choosedContacts[index].id;
        if(currentContactID === id){
            setContactInFocusInCardetail(id);
        }
    }
}

function setContactInFocusInCardetail(id){
    contactRef = document.getElementById("contactCardDetailID" + id);
    checkBoxRef = document.getElementById("checkBoxCarddetailID" + id);

    contactRef.classList.add("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("./img/addTask/checkbox_checked_white.svg")';
}


function setContactInUnfocusInCardetail(id){
    contactRef = document.getElementById("contactCardDetailID" + id);
    checkBoxRef = document.getElementById("checkBoxCarddetailID" + id);

    contactRef.classList.remove("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("../img/checkbox_unchecked.svg")';
}


*/