async function findContactIdByData(name, mail, phone) {
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();

    const entries = Object.entries(responseToJson);

    for (let index = 0; index < entries.length; index++) {
        const [id, contact] = entries[index];
        if(contact.userName === name && contact.email === mail && contact.phone === phone){
            return id;
        }
    }
    return null; 
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


async function addNewContact(name, mail, phone = "") {
    let currentColor = getContactColorType();

        return await postData("/contacts/",{
        userName: name,
        email: mail,
        phone: phone,
        color: currentColor,
        });
}


async function updateUser(id){
    const nameValue = document.getElementById("editContactNameID").value;
    const mailValue = document.getElementById("editContactMailID").value;
    const phoneValue = document.getElementById("editContactPhoneID").value;

    return await patchData("/contacts/" + id,{
        userName: nameValue,
        email: mailValue,
        phone: phoneValue
    });
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
    const responseToJson = await response.json();
    return responseToJson;
}


async function deleteContact(id){
    const floatingCard = document.getElementById(id + "-floatingContact")

    clearAllBlogs();
    await deleteData("/contacts/" + id);
    await removeDeletedContactFromAllTasks(id);

    floatingCard.classList.toggle("is-visible");
    choosedContactID = "";

    floatBackContactDetails(id);
    popUpDeleteContactSucces();
    await renderContacts();
}


async function loadData(path=""){
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
    return responseToJson;
}


async function removeDeletedContactFromAllTasks(contactID){
    const variable = await loadData("/tasks");
    const entries = Object.entries(variable || {});
    
    await removeDeletedContactFromTaskEntries(entries, contactID);
}


async function removeDeletedContactFromTaskEntries(entries, contactID){
    for (let index = 0; index < entries.length; index++) {
        const taskID = entries[index][0];
        const contactArray = entries[index][1].contacts;

        if(contactArray != undefined){
            await removeDeletedContactFromTaskContacts(contactArray, contactID, taskID);
        }
    }
}


async function removeDeletedContactFromTaskContacts(contactArray, contactID, taskID){
    const filteredContacts = contactArray.filter(contact => contact && contact.id !== contactID);

    if (filteredContacts.length !== contactArray.length) {
        await patchData("/tasks/" + taskID, {
            contacts: filteredContacts
        });
    }
}