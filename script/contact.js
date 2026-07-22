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


/**
 * Runs on page load and starts rendering the contact list.
 */
function onloadFunc(){
    renderContacts();        
}


/**
 * Clears all contact arrays inside the alphabetical grouping structure.
 */
function clearAllBlogs(){
    for (let index = 0; index < alphabeticalOrder.length; index++) {
        const blog = alphabeticalOrder[index];
        blog.contacts = [];
    }
}


/**
 * Loads all contacts from the database, sorts them into alphabetical groups,
 * and renders them into the contact list.
 *
 * @returns {Promise<void>} A promise that resolves when all contacts have been rendered.
 */
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


/**
 * Renders all contacts of a single alphabetical group into the contact list container.
 *
 * @param {{ letter: string, contacts: object[] }} blog - The current alphabetical contact group.
 * @param {HTMLElement} contactRef - The container that receives the rendered contact entries.
 */
function renderContact(blog, contactRef){
    for (let index = 0; index < blog.contacts.length; index++) {
            const contact = blog.contacts[index];
            const nameParts = contact.userName.trim().split(/\s+/);
            const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
            contactRef.innerHTML += renderContactsTemplate(contact.userName, contact.email, contact.phone, contact.color, contact.id, initialsValue);
    }
}


/**
 * Loads the selected contact details from the database and displays the matching detail card.
 *
 * @param {string} name - The selected contact name.
 * @param {string} mail - The selected contact email address.
 * @param {string} phone - The selected contact phone number.
 * @returns {Promise<void>} A promise that resolves when the contact details have been rendered.
 */
async function renderContactDetails(name, mail, phone){
    const response = await fetch(BASE_URL + "contacts.json");
    const responseToJson = await response.json();
    const entries = Object.entries(responseToJson);
    const pickedContactID = await findContactIdByData(name, mail, phone);
    for (let index = 0; index < entries.length; index++) {
        const currentContactID = entries[index][0];
        setLastContactBackToUnfocused();
        if (currentContactID === pickedContactID){
            setContactDetailValues(currentContactID, entries, index);
            floatContactDetails(currentContactID);  
            return;
        } 
    }
}


/**
 * Sets the HTML content for the selected contact detail view.
 *
 * @param {string} currentContactID - The id of the contact currently being processed.
 * @param {Array<[string, object]>} entries - All contact entries loaded from the database.
 * @param {number} index - The array index of the selected contact entry.
 */
function setContactDetailValues(currentContactID, entries, index){
    const contactDetailsRef = document.getElementById("contactDetailsID");
    const foundName = entries[index][1].userName;
    const foundMail = entries[index][1].email;
    const nameParts = foundName.trim().split(/\s+/);
    const initialsValue = nameParts.length === 1 ? nameParts[0].charAt(0).toUpperCase() : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    const foundColor = entries[index][1].color;
    const foundPhone = entries[index][1].phone;
    contactDetailsRef.innerHTML = contactDetailsTemplate(foundName, foundMail, initialsValue, foundColor, foundPhone, currentContactID);
}


/**
 * Toggles the floating contact detail card.
 * If another contact is selected, the new contact is focused and shown.
 *
 * @param {string} id - The id of the contact whose detail card should be toggled.
 */
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


/**
 * Hides the floating contact detail card and removes the current contact focus.
 *
 * @param {string} id - The id of the contact whose detail card should be hidden.
 */
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



