function hideAddContactAndEditContactWindow(){
    let buttonRef = document.getElementById("contactsButtonID");
    let overlayRef = document.getElementById("overlayID");
    let addContactRef = document.getElementById("addContactID");
    let editContactRef = document.getElementById("editContactID");

    buttonRef.classList.remove("toggle-color-contacts-button");
    overlayRef.classList.remove("hide-and-show-overlay-contacts");
    addContactRef.classList.add("toggle-addContact-card");
    editContactRef.classList.add("toggle-editContact-card");
}


function toggleAddContactWindow(){
    let buttonRef = document.getElementById("contactsButtonID");
    let overlayRef = document.getElementById("overlayID");
    let contentRef = document.getElementById("addContactID");

    buttonRef.classList.toggle("toggle-color-contacts-button");
    overlayRef.classList.toggle("hide-and-show-overlay-contacts");
    contentRef.classList.toggle("toggle-addContact-card");
}

function showEditContactWindow(name, mail, initials, color, phone, id){
    let overlayRef = document.getElementById("overlayID");
    let contentRef = document.getElementById("editContactID");

    contentRef.innerHTML = editContactTemplate(initials, color, id);
    
    const nameRef = document.getElementById("editContactNameID");
    const mailRef = document.getElementById("editContactMailID");
    const phoneRef = document.getElementById("editContactPhoneID");

    overlayRef.classList.add("hide-and-show-overlay-contacts");
    contentRef.classList.remove("toggle-editContact-card");

    nameRef.value = name;
    mailRef.value = mail;
    phoneRef.value = phone;
}