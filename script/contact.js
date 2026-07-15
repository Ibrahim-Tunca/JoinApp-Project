let contacts = [];

let choosedContactID = "";

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"


let alphabeticalOrder = [
    { letter: "A", contacts: [] },{ letter: "B", contacts: [] },{ letter: "C", contacts: [] },{ letter: "D", contacts: [] },{ letter: "E", contacts: [] },
    { letter: "F", contacts: [] },{ letter: "G", contacts: [] },{ letter: "H", contacts: [] },{ letter: "I", contacts: [] },
    { letter: "J", contacts: [] },{ letter: "K", contacts: [] },{ letter: "L", contacts: [] },{ letter: "M", contacts: [] },{ letter: "N", contacts: [] },
    { letter: "O", contacts: [] },{ letter: "P", contacts: [] },{ letter: "Q", contacts: [] },{ letter: "R", contacts: [] },
    { letter: "S", contacts: [] },{ letter: "T", contacts: [] },{ letter: "U", contacts: [] },{ letter: "V", contacts: [] },{ letter: "W", contacts: [] },
    { letter: "X", contacts: [] },{ letter: "Y", contacts: [] },{ letter: "Z", contacts: [] },{ letter: "Other", contacts: [] }
];


function onloadFunc(){
    renderContacts();        
}


function clearAllBlogs(){
    for (let index = 0; index < alphabeticalOrder.length; index++) {
        const blog = alphabeticalOrder[index];
        blog.contacts = [];
    }
}


async function renderContacts(){
    let contactRef = document.getElementById("contactID")
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    sortIntoAlphabeticalOrder(entries);  
    contactRef.innerHTML = "";

    for (let index = 0; index < alphabeticalOrder.length; index++) {
        const blog = alphabeticalOrder[index];
        showBlogIfBlogIsNotEmpty(blog, contactRef);
        renderContact(blog, contactRef);
    }
}


function renderContact(blog, contactRef){
    for (let index = 0; index < blog.contacts.length; index++) {
            const contact = blog.contacts[index];
            const nameParts = contact.userName.trim().split(/\s+/);
            const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
            
            contactRef.innerHTML += renderContactsTemplate(contact.userName, contact.email, contact.phone, contact.color, contact.id, initialsValue);
    }
}


async function renderContactDetails(name, mail, phone){
    const response = await fetch(BASE_URL + "contacts.json");
    const responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const pickedContactID = await findContactIdByData(name, mail, phone);
    for (let index = 0; index < entries.length; index++) {
        const currentContactID = entries[index][0];
        setLastContactBackToUnfocused();

        if (currentContactID === pickedContactID){
            setContactDetailValues(currentContactID, pickedContactID, entries, index);
            floatContactDetails(currentContactID);  
            return;
        } 
    }
}


function setContactDetailValues(currentContactID, pickedContactID, entries, index){
    const contactDetailsRef = document.getElementById("contactDetailsID");

    const foundName = entries[index][1].userName;
    const foundMail = entries[index][1].email;
    const nameParts = foundName.trim().split(/\s+/);
    const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    const foundColor = entries[index][1].color;
    const foundPhone = entries[index][1].phone;

    contactDetailsRef.innerHTML = contactDetailsTemplate(foundName, foundMail, initialsValue, foundColor, foundPhone, currentContactID);
}


function floatContactDetails(id){
    const floatingCard = document.getElementById(id + "-floatingContact")

    if(id != choosedContactID){
        requestAnimationFrame(() => {
        floatingCard.classList.add("is-visible");
        });
        setContactInFocusMode(id);
        choosedContactID = id;
        return;
    }
    setLastContactBackToUnfocused();
    choosedContactID = "";
    hideAddContactAndEditContactWindow();
    return;
}


function floatBackContactDetails(id){
    const floatingCard = document.getElementById(id + "-floatingContact")
    
        requestAnimationFrame(() => {
        floatingCard.classList.remove("is-visible");
        });
   
        setLastContactBackToUnfocused();
        choosedContactID = "";
        hideAddContactAndEditContactWindow();
        return;
}



