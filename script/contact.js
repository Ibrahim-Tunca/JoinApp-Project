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
            const contactInital = contact.userName.charAt(0).toUpperCase();
            
            contactRef.innerHTML += renderContactsTemplate(contact.userName, contact.email, contact.phone, contact.color, contact.id, contactInital);
    }
}


async function renderContactDetails(name, mail, phone){
    const response = await fetch(BASE_URL + "contacts.json");
    const responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const pickedContactID = await findContactIdByData(name, mail, phone);
    const contactDetailsRef = document.getElementById("contactDetailsID");

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


async function validateEditContactForm(event, id){
    event.preventDefault();
    clearAllBlogs();

    const everthingIsFilled = checkIfEverthingIsFilledInEditContact();
    const emailIsValid = checkIfMailIsValidEdit();
    if (everthingIsFilled == false || emailIsValid == false) {
        return false;
    }

    await updateUser(id);
    renderContacts();
    hideAddContactAndEditContactWindow();
    return false;
}


async function validateAddContactForm(event){
    event.preventDefault();
    clearAllBlogs();

    const contactNameValue = document.forms["addContactForm"]["name"].value;
    const contactMailValue = document.forms["addContactForm"]["mail"].value
    const contactPhoneNumberValue = document.forms["addContactForm"]["phone"].value;
    const everthingIsFilled = checkIfEverthingIsFilled(contactNameValue, contactMailValue, contactPhoneNumberValue);
    const emailIsValid = checkIfMailIsValid(contactMailValue);

    if (everthingIsFilled == false || emailIsValid == false) {
        return false;
    }

    await addNewContact(contactNameValue, contactMailValue, contactPhoneNumberValue);
    renderContacts();
    popUpAddContactSucces();
    return true;
}


function checkIfEverthingIsFilled(name, mail, number){
    let everythingIsFilled = true;

    const nameRef = document.getElementById("nameID");
    const mailRef = document.getElementById("mailID");
    const numberRef = document.getElementById("phoneID");

    const errorNameRef = document.getElementById("errorNameID");
    const errorMailRef = document.getElementById("errorMailID");
    const errorNumberRef = document.getElementById("errorNumberID");

    nameRef.classList.remove("inputfield-contact-error");
    mailRef.classList.remove("inputfield-contact-error");
    numberRef.classList.remove("inputfield-contact-error");

    errorNameRef.classList.remove("d_block");
    errorMailRef.classList.remove("d_block");
    errorNumberRef.classList.remove("d_block");

    errorMailRef.innerHTML = "Please enter a emailadress!";

    if(name === ""){
        nameRef.classList.add("inputfield-contact-error");
        errorNameRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    if(mail === ""){
        mailRef.classList.add("inputfield-contact-error");
        errorMailRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    if(number === ""){
        numberRef.classList.add("inputfield-contact-error");
        errorNumberRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    return everythingIsFilled;
}


function checkIfEverthingIsFilledInEditContact(){
    let everythingIsFilled = true;

    const nameRef = document.getElementById("editContactNameID");
    const mailRef = document.getElementById("editContactMailID");
    const numberRef = document.getElementById("editContactPhoneID");

    const errorNameRef = document.getElementById("editErrorNameID");
    const errorMailRef = document.getElementById("editErrorMailID");
    const errorNumberRef = document.getElementById("editErrorNumberID");

    const nameValue = document.getElementById("editContactNameID").value;
    const mailValue = document.getElementById("editContactMailID").value;
    const phoneValue = document.getElementById("editContactPhoneID").value;

    errorMailRef.innerHTML = "Please enter a emailadress!";

    nameRef.classList.remove("inputfield-contact-error");
    mailRef.classList.remove("inputfield-contact-error");
    numberRef.classList.remove("inputfield-contact-error");

    errorNameRef.classList.remove("d_block");
    errorMailRef.classList.remove("d_block");
    errorNumberRef.classList.remove("d_block");

    if(nameValue === ""){
        nameRef.classList.add("inputfield-contact-error");
        errorNameRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    if(mailValue === ""){
        mailRef.classList.add("inputfield-contact-error");
        errorMailRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    if(phoneValue === ""){
        numberRef.classList.add("inputfield-contact-error");
        errorNumberRef.classList.add("d_block");
        everythingIsFilled = false;
    }
    return everythingIsFilled;
}


function checkIfMailIsValid(mail){
    const mailFieldRef = document.getElementById("mailID");
    const mailFieldErrorMessage = document.getElementById("errorMailID");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mail !== "" && !emailPattern.test(mail)) {
        mailFieldRef.classList.add("inputfield-contact-error");
        mailFieldErrorMessage.classList.add("d_block");
        mailFieldErrorMessage.innerHTML = "Please enter a valid email address.";
        return false;
    }

    return true;
}

function checkIfMailIsValidEdit(){
    const errorMailRef = document.getElementById("editErrorMailID");
    const mailRef = document.getElementById("editContactMailID");

    const mailValue = document.getElementById("editContactMailID").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mailValue !== "" && !emailPattern.test(mailValue)) {
        mailRef.classList.add("inputfield-contact-error");
        errorMailRef.classList.add("d_block");
        errorMailRef.innerHTML = "Please enter a valid email address.";
        return false;
    }

    return true;
}