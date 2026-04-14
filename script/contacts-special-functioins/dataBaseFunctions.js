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

async function addNewContact(name, mail, phone) {

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

//This function is not in use!!!!
async function loadContacts() {
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();

    return Object.entries(responseToJson).map(([id, contact]) => {
        return {
            id: id,
            ...contact
        };
    });
}