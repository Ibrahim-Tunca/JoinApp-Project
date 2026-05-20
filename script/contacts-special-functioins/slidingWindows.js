function hideAddContactAndEditContactWindow(){
    const buttonRef = document.getElementById("contactsButtonID");
    const personIconRef = document.getElementById("addPersonIconID");
    const overlayRef = document.getElementById("overlayID");
    const addContactRef = document.getElementById("addContactID");
    const editContactRef = document.getElementById("editContactID");


    buttonRef.classList.remove("toggle-color-contacts-button");
    personIconRef.src="./img/contacts/person_add.svg";
    overlayRef.classList.remove("hide-and-show-overlay-contacts");
    addContactRef.classList.add("toggle-addContact-card");
    editContactRef.classList.add("toggle-editContact-card");
}


function showAddContactWindow(){
    const buttonRef = document.getElementById("contactsButtonID");
    const personIconRef = document.getElementById("addPersonIconID");
    const overlayRef = document.getElementById("overlayID");
    const contentRef = document.getElementById("addContactID");

    contentRef.innerHTML = addContactTemplate(); 

    buttonRef.classList.add("toggle-color-contacts-button");
    personIconRef.src="./img/contacts/person_add-blue.svg";
    overlayRef.classList.add("hide-and-show-overlay-contacts");
    contentRef.classList.remove("toggle-addContact-card");
}

function showEditContactWindow(name, mail, initials, color, phone, id){
    const overlayRef = document.getElementById("overlayID");
    const contentRef = document.getElementById("editContactID");

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

function popUpAddContactSucces(){

    let popupWindow = document.getElementById("popupContactID");

    popupWindow.innerHTML = `Contact successfully created`;

    popupWindow.classList.add("top-50-percent");

    setTimeout(() => {
        hideAddContactAndEditContactWindow();
        popupWindow.classList.remove("top-50-percent");
    }, 2500);
}

function popUpDeleteContactSucces(){

    let popupWindow = document.getElementById("popupContactID");

    popupWindow.innerHTML = `Contact successfully deleted`;

    popupWindow.classList.add("top-50-percent");

    hideAddContactAndEditContactWindow();

    setTimeout(() => {
        popupWindow.classList.remove("top-50-percent");
    }, 2500);
}
