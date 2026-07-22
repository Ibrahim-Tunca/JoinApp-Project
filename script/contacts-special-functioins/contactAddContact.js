/**
 * Validates the add-contact form, creates a new contact if all fields are valid,
 * refreshes the contact list, and shows the success popup.
 *
 * @param {SubmitEvent} event - The submit event triggered by the add-contact form.
 * @returns {Promise<boolean|void>} Returns false if validation fails.
 */
async function validateAddContactForm(event){
    event.preventDefault();
    clearAllBlogs();
    const contactNameValue = document.forms["addContactForm"]["name"].value;
    const contactMailValue = document.forms["addContactForm"]["mail"].value
    const contactPhoneNumberValue = document.forms["addContactForm"]["phone"].value;
    const nameIsValid = checkIfNameIsValid();
    const emailIsValid = checkIfMailIsValid();
    const phoneNumberIsValid = checkIfPhonnumberIsValid();
    if (nameIsValid == false || emailIsValid == false || phoneNumberIsValid == false){
        return false;
    }
    await addNewContact(contactNameValue, contactMailValue, contactPhoneNumberValue);
    renderContacts();
    popUpAddContactSucces();
}


/**
 * Validates the contact name field.
 *
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function checkIfNameIsValid(){
    const nameRef = document.getElementById("nameID");
    const errorNameRef = document.getElementById("errorNameID");
    const contactNameValue = document.forms["addContactForm"]["name"].value;
    let fieldCheck = true;
    hideErrorMessage(nameRef, errorNameRef);
    fieldCheck = checkIfFieldIsEmpty(contactNameValue, nameRef, errorNameRef, "Please enter a mame!");
    fieldCheck = checkIfFieldValueIsToLong(contactNameValue, 28, nameRef, errorNameRef, "Entered name too long!") && fieldCheck == true;
    return fieldCheck;
}


/**
 * Validates the contact email field.
 *
 * @returns {boolean} Returns true if the email address is valid, otherwise false.
 */
function checkIfMailIsValid(){
    const mailRef = document.getElementById("mailID");
    const errorMailRef = document.getElementById("errorMailID");
    const contactMailValue = document.forms["addContactForm"]["mail"].value
    let fieldCheck = true;
    hideErrorMessage(mailRef, errorMailRef);
    fieldCheck = checkIfFieldIsEmpty(contactMailValue, mailRef, errorMailRef, "Please enter email address!");
    fieldCheck = checkIfFieldValueIsToLong(contactMailValue, 38, mailRef, errorMailRef, "Entered mail address is too long!") && fieldCheck == true;
    if(fieldCheck){
        fieldCheck = checkIfTheMailvalueIsAValidAdress(contactMailValue, mailRef, errorMailRef, "Please enter a valid email address!");
    }
    return fieldCheck;
}


/**
 * Validates the contact phone number field.
 *
 * @returns {boolean} Returns true if the phone number is valid, otherwise false.
 */
function checkIfPhonnumberIsValid(){
    const numberRef = document.getElementById("phoneID");
    const errorNumberRef = document.getElementById("errorNumberID");
    const contactPhoneNumberValue = document.forms["addContactForm"]["phone"].value;
    let fieldCheck = true;
    hideErrorMessage(numberRef, errorNumberRef);
    fieldCheck = checkIfFieldIsEmpty(contactPhoneNumberValue, numberRef, errorNumberRef, "Please enter a phone number!");
    fieldCheck = checkIfFieldValueIsToLong(contactPhoneNumberValue, 40, numberRef, errorNumberRef, "Entered phonenumber is to long!") && fieldCheck == true;
    if(fieldCheck){
        fieldCheck = checkIfThePhoneNumberValueIsValid(contactPhoneNumberValue, numberRef, errorNumberRef, "Please enter a valid phone number!");
    }
    return fieldCheck;
}


/**
 * Shows an error state and message for an invalid input field.
 *
 * @param {HTMLElement} contentRef - The input element that should receive the error styling.
 * @param {HTMLElement} ErrorRef - The element that displays the error message.
 * @param {string} message - The error message to show.
 */
function showErrorMessage(contentRef, ErrorRef, message){
    contentRef.classList.add("inputfield-contact-error");
    ErrorRef.classList.add("d_block");
    ErrorRef.innerHTML = message;
}


/**
 * Removes the error state and clears the error message of an input field.
 *
 * @param {HTMLElement} contentRef - The input element whose error styling should be removed.
 * @param {HTMLElement} ErrorRef - The element that displays the error message.
 */
function hideErrorMessage(contentRef, ErrorRef){
    contentRef.classList.remove("inputfield-contact-error");
    ErrorRef.classList.remove("d_block");
    ErrorRef.innerHTML = "";
}


/**
 * Checks whether a field value is empty after trimming whitespace.
 *
 * @param {string} value - The input value to validate.
 * @param {HTMLElement} contentRef - The input element to mark as invalid if needed.
 * @param {HTMLElement} errorRef - The element that displays the error message.
 * @param {string} message - The error message to show if the field is empty.
 * @returns {boolean} Returns true if the field contains a value, otherwise false.
 */
function checkIfFieldIsEmpty(value, contentRef, errorRef, message){
    const cleanedValue = value.trim();
    if(cleanedValue === ""){
        showErrorMessage(contentRef, errorRef, message)
        return false;
    }
    return true;
}


/**
 * Checks whether a field value exceeds the allowed maximum length.
 *
 * @param {string} value - The input value to validate.
 * @param {number} maxInputLength - The maximum allowed number of characters.
 * @param {HTMLElement} contentRef - The input element to mark as invalid if needed.
 * @param {HTMLElement} errorRef - The element that displays the error message.
 * @param {string} message - The error message to show if the value is too long.
 * @returns {boolean} Returns true if the field length is valid, otherwise false.
 */
function checkIfFieldValueIsToLong(value, maxInputLength, contentRef, errorRef, message){
    if(value.length > maxInputLength){
        showErrorMessage(contentRef, errorRef, message);
        return false;
    }
    return true;
}


/**
 * Checks whether the provided value is a valid email address.
 *
 * @param {string} value - The email address to validate.
 * @param {HTMLElement} contentRef - The input element to mark as invalid if needed.
 * @param {HTMLElement} errorRef - The element that displays the error message.
 * @param {string} message - The error message to show if the email address is invalid.
 * @returns {boolean} Returns true if the email address is valid, otherwise false.
 */
function checkIfTheMailvalueIsAValidAdress(value, contentRef, errorRef, message){
    const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    if(!emailPattern.test(value)){
        showErrorMessage(contentRef, errorRef, message);
        return false;
    }
    return true;
}


/**
 * Checks whether the provided value is a valid phone number.
 *
 * @param {string} value - The phone number to validate.
 * @param {HTMLElement} contentRef - The input element to mark as invalid if needed.
 * @param {HTMLElement} errorRef - The element that displays the error message.
 * @param {string} message - The error message to show if the phone number is invalid.
 * @returns {boolean} Returns true if the phone number is valid, otherwise false.
 */
function checkIfThePhoneNumberValueIsValid(value, contentRef, errorRef, message){
    const normalizedPhone = value.replace(/\s+/g, "");
    const phonePattern = /^\+?\d+$/;
    if(!phonePattern.test(normalizedPhone)){
        showErrorMessage(contentRef, errorRef, message);   
        return false;
    }
    return true;
}