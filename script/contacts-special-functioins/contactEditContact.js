async function validateEditContactForm(event, id){
    event.preventDefault();
    clearAllBlogs();
    const everthingIsFilled = checkIfEverthingIsFilledEditContact();
    const nameIsValid = checkIfNameIsValidEdit();
    const emailIsValid = checkIfMailIsValidEdit();
    const phoneNumberIsValid = checkIfPhonnumberIsValidEdit();
    if (everthingIsFilled == false || nameIsValid == false || emailIsValid == false || phoneNumberIsValid == false) {
        return false;
    }
    updateContactDetail();
    await updateUser(id);
    renderContacts();
    hideAddContactAndEditContactWindow();
    return false;
}


function updateContactDetail(){
    const contactDetailNameRef = document.getElementById("contactDetailNameID");
    const contactDetailInitialsRef = document.getElementById("contactDetailInitialsID");
    const contactDetailMailRef = document.getElementById("contactDetailMailID");
    const contactDetailPhoneRef = document.getElementById("contactDetailPhoneID");

    const nameValue = document.getElementById("editContactNameID").value;
    const nameParts = nameValue.trim().split(/\s+/);
    const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    const mailValue = document.getElementById("editContactMailID").value;
    const phoneValue = document.getElementById("editContactPhoneID").value;

    contactDetailNameRef.innerHTML = nameValue;
    contactDetailInitialsRef.innerHTML = initialsValue;
    contactDetailMailRef.innerHTML = mailValue;
    contactDetailPhoneRef.innerHTML = phoneValue;
}


function checkIfEverthingIsFilledEditContact(){
    let everythingIsFilled = true;
    const nameValue = document.getElementById("editContactNameID").value;
    const mailValue = document.getElementById("editContactMailID").value;
    const phoneValue = document.getElementById("editContactPhoneID").value;
    const cleanedNameValue = nameValue.trim();
    const cleanedMailValue = mailValue.trim();
    const cleanedPhoneValue = phoneValue.trim();
    if(cleanedNameValue === ""){
        everythingIsFilled = false;
    }
    if(cleanedMailValue === ""){
        everythingIsFilled = false;
    }
    if(cleanedPhoneValue === ""){
        everythingIsFilled = false;
    }
    return everythingIsFilled;
}


function checkIfNameIsValidEdit(){
    const errorNameRef = document.getElementById("editErrorNameID");
    const nameValue = document.getElementById("editContactNameID").value;
    const cleanedName = nameValue.trim();
    removeErrorMessageNameEdit();s
    if(cleanedName === ""){
        errorMessageNameEdit();
        return false;
    }
    if(cleanedName.length > 28){
        errorMessageNameEdit();
        errorNameRef.innerHTML = "Entered name too long!"
        return false;
    }
    return true;
}


function checkIfMailIsValidEdit(){
    const errorMailRef = document.getElementById("editErrorMailID");
    const contactMailValue = document.getElementById("editContactMailID").value;
    const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    removeErrorMessageMailEdit();

    if(contactMailValue === "" || !emailPattern.test(contactMailValue)){
        errorMessageMailEdit();
        return false;
    }
    if(contactMailValue.length > 38){
        errorMessageMailEdit();
        errorMailRef.innerHTML = "Email address too long!";
        return false;
    }
    return true;
}


function checkIfPhonnumberIsValidEdit(){
    const errorNumberRef = document.getElementById("editErrorNumberID");
    const phoneValue = document.getElementById("editContactPhoneID").value;
    const normalizedPhone = phoneValue.replace(/\s+/g, "");
    const phonePattern = /^\+?\d+$/;
    removeErrorMessagePhoneEdit();

    if(normalizedPhone.length > 40){
        errorMessagePhoneEdit();
        errorNumberRef.innerHTML = "Entered phonenumber is to long";
        return false;
    }
    if(normalizedPhone === "" || !phonePattern.test(normalizedPhone)){
        errorMessagePhoneEdit();   
        return false;
    }
    return true;
}


function errorMessageNameEdit(){
    const nameRef = document.getElementById("editContactNameID");
    const errorNameRef = document.getElementById("editErrorNameID");

    nameRef.classList.add("inputfield-contact-error");
    errorNameRef.classList.add("d_block");
    errorNameRef.innerHTML = "Please enter a name!";
}


function removeErrorMessageNameEdit(){
    const nameRef = document.getElementById("editContactNameID");
    const errorNameRef = document.getElementById("editErrorNameID");

    nameRef.classList.remove("inputfield-contact-error");
    errorNameRef.classList.remove("d_block");
    errorNameRef.innerHTML = "";
}


function errorMessageMailEdit(){
    const mailRef = document.getElementById("editContactMailID");
    const errorMailRef = document.getElementById("editErrorMailID");

    mailRef.classList.add("inputfield-contact-error");
    errorMailRef.classList.add("d_block");
    errorMailRef.innerHTML = "Please enter a valid email address.";
}


function removeErrorMessageMailEdit(){
    const mailRef = document.getElementById("editContactMailID");
    const errorMailRef = document.getElementById("editErrorMailID");

    mailRef.classList.remove("inputfield-contact-error");
    errorMailRef.classList.remove("d_block");
    errorMailRef.innerHTML = "";
}


function errorMessagePhoneEdit(){
    const numberRef = document.getElementById("editContactPhoneID");
    const errorNumberRef = document.getElementById("editErrorNumberID");

    numberRef.classList.add("inputfield-contact-error");
    errorNumberRef.classList.add("d_block");
    errorNumberRef.innerHTML = "Please enter a valid phone number.";
}


function removeErrorMessagePhoneEdit(){
    const numberRef = document.getElementById("editContactPhoneID");
    const errorNumberRef = document.getElementById("editErrorNumberID");

    numberRef.classList.remove("inputfield-contact-error");
    errorNumberRef.classList.remove("d_block");
    errorNumberRef.innerHTML = ""
}