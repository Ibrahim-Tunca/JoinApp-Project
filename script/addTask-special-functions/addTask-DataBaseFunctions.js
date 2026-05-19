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