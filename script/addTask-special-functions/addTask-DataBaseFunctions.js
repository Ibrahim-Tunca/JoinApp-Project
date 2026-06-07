async function loadContacts(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const sortedEntries = sortContactsAlphabetically(entries);

    const contactSelectionContainerRef = document.getElementById("contactSelectionID");

    for (let index = 0; index < sortedEntries.length; index++) {
        const contactName = sortedEntries[index][1].userName;
        const contactColor = sortedEntries[index][1].color;
        const contactInitals = sortedEntries[index][1].userName.charAt(0).toUpperCase();
        const contactKey = sortedEntries[index][0];        

        contactSelectionContainerRef.innerHTML += contactSelectionTemplate(contactKey, contactInitals, contactColor, contactName);
    }
    
}


async function addNewTask(title, description, date, category) {
    const status = currentTaskStatus || "todo";

        const response = await postData("/tasks/",{
            title: title,
            description: description,
            date: date,
            priority: priority,
            category: category,
            contacts: choosedContacts,
            subtasks: subtasks,
            status: status
        });
    priority = "";
    choosedContacts = [];
    subtasks = [];
    currentTaskStatus = "";

    return response;
}


async function postData(path = "", data = {}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

function sortContactsAlphabetically(entries = []) {
    return [...entries].sort((firstEntry, secondEntry) => {
        const firstName = firstEntry?.[1]?.userName?.trim() ?? "";
        const secondName = secondEntry?.[1]?.userName?.trim() ?? "";

        return firstName.localeCompare(secondName, "de", {
            sensitivity: "base"
        });
    });
}