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
    const entries = Object.entries(variable ?? {});
    return entries;
}


async function getContactEntriesFromDataBase(){
    const variable = await loadData("/contacts");
    const entries = Object.entries(variable ?? {});
    return entries;
}