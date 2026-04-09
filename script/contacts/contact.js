let contacts = [];


const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


let alphabeticalOrder = [
    { letter: "A", contacts: [] },
    { letter: "B", contacts: [] },
    { letter: "C", contacts: [] },
    { letter: "D", contacts: [] },
    { letter: "E", contacts: [] },
    { letter: "F", contacts: [] },
    { letter: "G", contacts: [] },
    { letter: "H", contacts: [] },
    { letter: "I", contacts: [] },
    { letter: "J", contacts: [] },
    { letter: "K", contacts: [] },
    { letter: "L", contacts: [] },
    { letter: "M", contacts: [] },
    { letter: "N", contacts: [] },
    { letter: "O", contacts: [] },
    { letter: "P", contacts: [] },
    { letter: "Q", contacts: [] },
    { letter: "R", contacts: [] },
    { letter: "S", contacts: [] },
    { letter: "T", contacts: [] },
    { letter: "U", contacts: [] },
    { letter: "V", contacts: [] },
    { letter: "W", contacts: [] },
    { letter: "X", contacts: [] },
    { letter: "Y", contacts: [] },
    { letter: "Z", contacts: [] },
    { letter: "Other", contacts: [] }
];


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


async function onloadFunc(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    let contactRef = document.getElementById("contactID")
    const entries = Object.entries(responseToJson);

    console.log(entries[0][1]);

    
    sortIntoAlphabeticalOrder(entries);

    for (let index = 0; index < alphabeticalOrder.length; index++) {
        const blog = alphabeticalOrder[index];

        showBlogIfBlogIsNotEmpty(blog, contactRef);
        renderContacts(blog, contactRef);
    }    
}


async function renderContactDetails(name, mail, phone){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();

    let contactDetailsRef = document.getElementById("contactDetailsID");

    const entries = Object.entries(responseToJson);

    let pickedContactID = await findContactIdByData(name, mail, phone);
    

    for (let index = 0; index < entries.length; index++) {
        const currentContactID = entries[index][0];

        if (currentContactID === pickedContactID){
            const foundName = entries[index][1].userName;
            const foundMail = entries[index][1].email;
            const foundInitials = entries[index][1].userName.charAt(0).toUpperCase();
            const foundColor = entries[index][1].color;
            const foundPhone = entries[index][1].phone;
            contactDetailsRef.innerHTML = contactDetailsTemplate(foundName, foundMail, foundInitials, foundColor, foundPhone)  
            return;
        } 
    }
}


function renderContacts(blog, contactRef){
    for (let index = 0; index < blog.contacts.length; index++) {
        const contact = blog.contacts[index];
        const contactInital = contact.userName.charAt(0).toUpperCase();
        contactRef.innerHTML += renderContactsTemplate(contact.userName, contact.email, contact.phone, contact.color, contactInital);
    }

}


function showBlogIfBlogIsNotEmpty(blog, contactRef){

    if(blog.contacts.length > 0)
        {
            contactRef.innerHTML += `<div class="letter-container"><span class="letter">${blog.letter}</span></div>`
        }
}


function validateAddContactForm(event){
    event.preventDefault();

    const contactNameRef = document.forms["addContactForm"]["name"].value;
    const contactMailRef = document.forms["addContactForm"]["mail"].value
    const contactPhoneNumberRef = document.forms["addContactForm"]["phone"].value;

    addNewContact(contactNameRef, contactMailRef, contactPhoneNumberRef);
    
    return true;
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