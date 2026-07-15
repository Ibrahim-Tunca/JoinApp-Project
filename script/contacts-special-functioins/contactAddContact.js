async function validateAddContactForm(event){
    event.preventDefault();
    clearAllBlogs();
    const contactNameValue = document.forms["addContactForm"]["name"].value;
    const contactMailValue = document.forms["addContactForm"]["mail"].value
    const contactPhoneNumberValue = document.forms["addContactForm"]["phone"].value;
    const everthingIsFilled = checkIfEverthingIsFilled(contactNameValue, contactMailValue, contactPhoneNumberValue);
    const nameIsValid = checkIfNameIsValid();
    const emailIsValid = checkIfMailIsValid();
    const phoneNumberIsValid = checkIfPhonnumberIsValid();
    if (everthingIsFilled == false || nameIsValid == false || emailIsValid == false || phoneNumberIsValid == false){
        return false;
    }
    await addNewContact(contactNameValue, contactMailValue, contactPhoneNumberValue);
    renderContacts();
    popUpAddContactSucces();
    return true;
}


function checkIfEverthingIsFilled(name, mail, number){
    let everythingIsFilled = true;
    const cleanedName = name.trim();
    const cleanedMail = mail.trim();
    const cleanedNumber = number.trim();

    if(cleanedName === ""){
        everythingIsFilled = false;
    }
    if(cleanedMail === ""){
        everythingIsFilled = false;
    }
    if(cleanedNumber === ""){
        everythingIsFilled = false;
    }
    return everythingIsFilled;
}


function checkIfNameIsValid(){
    const errorNameRef = document.getElementById("errorNameID");
    const contactNameValue = document.forms["addContactForm"]["name"].value;
    const cleanedName = contactNameValue.trim();
    removeErrorMessageName();
    if(cleanedName === ""){
        errorMessageName();
        return false;
    }
    if(cleanedName.length > 28){
        errorMessageName();
        errorNameRef.innerHTML = "Entered name too long!"
        return false;
    }
    return true;
}


function checkIfMailIsValid(){
    const errorMailRef = document.getElementById("errorMailID");
    const contactMailValue = document.forms["addContactForm"]["mail"].value
    const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    removeErrorMessageMail();

    if(contactMailValue === "" || !emailPattern.test(contactMailValue)){
        errorMessageMail();
        return false;
    }
    if(contactMailValue.length > 38){
        errorMessageMail();
        errorMailRef.innerHTML = "Email address too long!";
        return false;
    }
    return true;
}


function checkIfPhonnumberIsValid(){
    const errorNumberRef = document.getElementById("errorNumberID");
    const contactPhoneNumberValue = document.forms["addContactForm"]["phone"].value;
    const normalizedPhone = contactPhoneNumberValue.replace(/\s+/g, "");
    const phonePattern = /^\+?\d+$/;
    removeErrorMessagePhone();
    if(normalizedPhone.length > 40){
        errorMessagePhone();
        errorNumberRef.innerHTML = "Entered phonenumber is to long";
        return false;
    }
    if(normalizedPhone === "" || !phonePattern.test(normalizedPhone)){
        errorMessagePhone();   
        return false;
    }
    return true;
}


function errorMessageName(){
    const nameRef = document.getElementById("nameID");
    const errorNameRef = document.getElementById("errorNameID");

    nameRef.classList.add("inputfield-contact-error");
    errorNameRef.classList.add("d_block");
    errorNameRef.innerHTML = "Please enter a name!";
}


function removeErrorMessageName(){
    const nameRef = document.getElementById("nameID");
    const errorNameRef = document.getElementById("errorNameID");

    nameRef.classList.remove("inputfield-contact-error");
    errorNameRef.classList.remove("d_block");
    errorNameRef.innerHTML = "";
}


function errorMessageMail(){
    const mailRef = document.getElementById("mailID");
    const errorMailRef = document.getElementById("errorMailID");

    mailRef.classList.add("inputfield-contact-error");
    errorMailRef.classList.add("d_block");
    errorMailRef.innerHTML = "Please enter a valid email address.";
}


function removeErrorMessageMail(){
    const mailRef = document.getElementById("mailID");
    const errorMailRef = document.getElementById("errorMailID");

    mailRef.classList.remove("inputfield-contact-error");
    errorMailRef.classList.remove("d_block");
    errorMailRef.innerHTML = "";
}


function errorMessagePhone(){
    const numberRef = document.getElementById("phoneID");
    const errorNumberRef = document.getElementById("errorNumberID");

    numberRef.classList.add("inputfield-contact-error");
    errorNumberRef.classList.add("d_block");
    errorNumberRef.innerHTML = "Please enter a valid phone number.";
}


function removeErrorMessagePhone(){
    const numberRef = document.getElementById("phoneID");
    const errorNumberRef = document.getElementById("errorNumberID");

    numberRef.classList.remove("inputfield-contact-error");
    errorNumberRef.classList.remove("d_block");
    errorNumberRef.innerHTML = ""
}