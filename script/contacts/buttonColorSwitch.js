function toggleAddContactWindow(){
    let buttonRef = document.getElementById("contactsButtonID");
    let overlayRef = document.getElementById("overlayID");
    let contentRef = document.getElementById("addContactID");

    buttonRef.classList.toggle("toggle-color-contacts-button");
    overlayRef.classList.toggle("hide-and-show-overlay-contacts");
    contentRef.classList.toggle("toggle-add-contact-card");
}

