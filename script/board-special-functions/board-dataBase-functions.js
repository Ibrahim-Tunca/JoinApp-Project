async function loadContactsInCardDetailWindow(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const contactSelectionContainerRef = document.getElementById("contactSelectionCardDetailID");

    for (let index = 0; index < entries.length; index++) {
        const contactName = entries[index][1].userName;
        const contactColor = entries[index][1].color;
        const nameParts = entries[index][1].userName.trim().split(/\s+/);
        const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        const contactKey = entries[index][0];                

        contactSelectionContainerRef.innerHTML += contactSelectionTemplateCardDetail(contactKey, initialsValue, contactColor, contactName);
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
