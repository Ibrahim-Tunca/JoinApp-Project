let contacts = [];


let alphabeticalOrder = [ A = [], B = [], C = [], D = [], E = [], F = [], G = [], H = [],
                          I = [], J = [], K = [], L = [], M = [], N = [], O = [], P = [],
                          Q = [], R = [], S = [], T = [], U = [], V = [], W = [], X = [],
                          Y = [], Z = [], other = [] ]


const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


async function sortIntoAlphabeticalOrder(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();

    let contactFirstLetter;

    const entries = Object.entries(responseToJson);

    for (let index = 0; index < entries.length; index++) {
        const [id, contact] = entries[index];

        contactFirstLetter = contact.userName.charAt(0).toUpperCase();

        if(contactFirstLetter === "A"){
            P.push(contact);
        }
        if(contactFirstLetter === "B"){
            B.push(contact);
        }
        if(contactFirstLetter === "C"){
            T.push(contact);
        }
        if(contactFirstLetter === "D"){
            U.push(contact);
        }
        if(contactFirstLetter === "E"){
            P.push(contact);
        }
        if(contactFirstLetter === "F"){
            B.push(contact);
        }
        if(contactFirstLetter === "G"){
            T.push(contact);
        }
        if(contactFirstLetter === "H"){
            U.push(contact);
        }
        if(contactFirstLetter === "I"){
            P.push(contact);
        }
        if(contactFirstLetter === "J"){
            B.push(contact);
        }
        if(contactFirstLetter === "K"){
            T.push(contact);
        }
        if(contactFirstLetter === "L"){
            U.push(contact);
        }
        if(contactFirstLetter === "M"){
            P.push(contact);
        }
        if(contactFirstLetter === "N"){
            B.push(contact);
        }
        if(contactFirstLetter === "O"){
            T.push(contact);
        }
        if(contactFirstLetter === "P"){
            U.push(contact);
        }
        if(contactFirstLetter === "Q"){
            P.push(contact);
        }
        if(contactFirstLetter === "R"){
            B.push(contact);
        }
        if(contactFirstLetter === "S"){
            T.push(contact);
        }
        if(contactFirstLetter === "T"){
            U.push(contact);
        }
        if(contactFirstLetter === "U"){
            P.push(contact);
        }
        if(contactFirstLetter === "V"){
            B.push(contact);
        }
        if(contactFirstLetter === "W"){
            T.push(contact);
        }
        if(contactFirstLetter === "X"){
            U.push(contact);
        }
        if(contactFirstLetter === "Y"){
            P.push(contact);
        }
        if(contactFirstLetter === "Z"){
            B.push(contact);
        }
        else{
            other.push(contact);
        }   
    }
}








































function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getContactColorType(){
    let randomNumber = getRandomInt(100);
    const colorCode = randomNumber % 8;  

    if(colorCode === 0){
        return "orange";
    }
    if(colorCode === 1){
        return "lila";
    }
    if(colorCode === 2){
        return "lavander";
    }
    if(colorCode === 3){
        return "violette";
    }
    if(colorCode === 4){
        return "pink";
    }
    if(colorCode === 5){
        return "yellow";
    }
    if(colorCode === 6){
        return "turquoise";
    }
    if(colorCode === 7){
        return "red";
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


async function renderContacts(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();

    let contactRef = document.getElementById("contactID")
    let contactInital;

    sortIntoAlphabeticalOrder();

    console.log(alphabeticalOrder);
    

    const entries = Object.entries(responseToJson);

    for (let index = 0; index < entries.length; index++) {
        const [id, contact] = entries[index];

        contactInital = contact.userName.charAt(0).toUpperCase();

        contactRef.innerHTML += `

                            <div class="letter-container"><span class="letter">A</span></div>

                            <contact class="contact-container">

                                <div class="inital-ball ${contact.color}">
                                    ${contactInital}
                                </div>

                                <div class="name-mail-container">
                                    <span class="name-font-contact">${contact.userName}</span>
                                    <span class="mail-font-contact">${contact.email}</span>
                                </div>

                            </contact>

        `  
    }
}















































async function findContactIdByData(name, mail, phone) {
    let response = await fetch(BASE_URL + "contact.json");
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