async function addNewTask(title, description, date, category) {

        const response = await postData("/tasks/",{
            title: title,
            description: description,
            date: date,
            priority: priority,
            category: category,
            contacts: choosedContacts,
            subtasks: subtasks
        });
    priority = "";
    choosedContacts = [];
    subtasks = [];

    window.location.reload();
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