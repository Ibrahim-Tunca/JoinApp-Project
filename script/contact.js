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


async function onloadFunc(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    let contactRef = document.getElementById("contactID")
    const entries = Object.entries(responseToJson);


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

        setLastContactBackToUnfocused();

        if (currentContactID === pickedContactID){
            const foundName = entries[index][1].userName;
            const foundMail = entries[index][1].email;
            const foundInitials = entries[index][1].userName.charAt(0).toUpperCase();
            const foundColor = entries[index][1].color;
            const foundPhone = entries[index][1].phone;

            contactDetailsRef.innerHTML = contactDetailsTemplate(foundName, foundMail, foundInitials, foundColor, foundPhone, currentContactID);
            floatContactDetails(currentContactID);  
            return;
        } 
    }
}


function floatContactDetails(id){
        const floatingCard = document.getElementById(id + "-floatingContact")

    if(id != choosedContactID){
    
        requestAnimationFrame(() => {
        floatingCard.classList.toggle("is-visible");
        });
        setContactInFocusMode(id);
        choosedContactID = id;
        return;
    }
    setLastContactBackToUnfocused();
    choosedContactID = "";
    return;
}


async function renderContacts(blog, contactRef){
    for (let index = 0; index < blog.contacts.length; index++) {
        const contact = blog.contacts[index];
        const contactInital = contact.userName.charAt(0).toUpperCase();
        
        contactRef.innerHTML += renderContactsTemplate(contact.userName, contact.email, contact.phone, contact.color, contact.id, contactInital);
    }

}


async function validateEditContactForm(event, id){
    event.preventDefault();
    await updateUser(id);
    onloadFunc();
    hideAddContactAndEditContactWindow();
    return false;
}

