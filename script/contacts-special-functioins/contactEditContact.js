/**
 * Validates the edit-contact form, updates the contact in the database,
 * refreshes the contact list, and closes the edit window.
 *
 * @param {SubmitEvent} event - The submit event triggered by the edit-contact form.
 * @param {string} id - The id of the contact to update.
 * @returns {Promise<boolean|void>} Returns false if validation fails.
 */
async function validateEditContactForm(event, id){
    event.preventDefault();
    clearAllBlogs();
    const nameIsValid = checkIfNameIsValidEdit();
    const emailIsValid = checkIfMailIsValidEdit();
    const phoneNumberIsValid = checkIfPhonnumberIsValidEdit();
    if (nameIsValid == false || emailIsValid == false || phoneNumberIsValid == false) {
        return false;
    }
    updateContactDetail();
    await updateUser(id);
    renderContacts();
    hideAddContactAndEditContactWindow();
}


/**
 * Updates the visible contact detail card with the edited field values.
 */
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


/**
 * Validates the edited contact name field.
 *
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function checkIfNameIsValidEdit(){
    const nameRef = document.getElementById("editContactNameID");
    const errorNameRef = document.getElementById("editErrorNameID");
    const nameValue = document.getElementById("editContactNameID").value;
    let fieldCheck = true;
    hideErrorMessage(nameRef, errorNameRef);
    fieldCheck = checkIfFieldIsEmpty(nameValue, nameRef, errorNameRef, "Please enter a name!");
    fieldCheck = checkIfFieldValueIsToLong(nameValue, 28, nameRef, errorNameRef, "Entered name too long!") && fieldCheck == true;
    return fieldCheck;
}


/**
 * Validates the edited contact email field.
 *
 * @returns {boolean} Returns true if the email address is valid, otherwise false.
 */
function checkIfMailIsValidEdit(){
    const mailRef = document.getElementById("editContactMailID");
    const errorMailRef = document.getElementById("editErrorMailID");
    const contactMailValue = document.getElementById("editContactMailID").value;
    hideErrorMessage(mailRef, errorMailRef)
    let fieldCheck = true;
    fieldCheck = checkIfFieldIsEmpty(contactMailValue, mailRef, errorMailRef, "Please enter email address!");
    fieldCheck = checkIfFieldValueIsToLong(contactMailValue, 38, mailRef, errorMailRef, "Entered mail address is too long!") && fieldCheck == true;
    if(fieldCheck){
        fieldCheck = checkIfTheMailvalueIsAValidAdress(contactMailValue, mailRef, errorMailRef, "Please enter a valid email address!");
    }
    return fieldCheck;
}


/**
 * Validates the edited contact phone number field.
 *
 * @returns {boolean} Returns true if the phone number is valid, otherwise false.
 */
function checkIfPhonnumberIsValidEdit(){
    const numberRef = document.getElementById("editContactPhoneID");
    const errorNumberRef = document.getElementById("editErrorNumberID");
    const phoneValue = document.getElementById("editContactPhoneID").value;
    let fieldCheck = true;
    hideErrorMessage(numberRef, errorNumberRef);
    fieldCheck = checkIfFieldIsEmpty(phoneValue, numberRef, errorNumberRef, "Please enter a phone number!");
    fieldCheck = checkIfFieldValueIsToLong(phoneValue, 40, numberRef, errorNumberRef, "Entered phonenumber is to long!") && fieldCheck == true;
    if(fieldCheck){
        fieldCheck = checkIfThePhoneNumberValueIsValid(phoneValue, numberRef, errorNumberRef, "Please enter a valid phone number!");
    }
    return fieldCheck;
}

