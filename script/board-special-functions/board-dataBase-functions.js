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