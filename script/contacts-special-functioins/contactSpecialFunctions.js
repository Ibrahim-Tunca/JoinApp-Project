/**
 * Renders the letter heading for an alphabetical contact group
 * if the group contains at least one contact.
 *
 * @param {{ letter: string, contacts: object[] }} blog - The alphabetical contact group.
 * @param {HTMLElement} contactRef - The container that receives the group heading.
 */
function showBlogIfBlogIsNotEmpty(blog, contactRef){

    if(blog.contacts.length > 0)
        {
            contactRef.innerHTML += `<div class="letter-container"><span class="letter">${blog.letter}</span></div>`
        }
}


/**
 * Opens the three-dots action menu.
 */
function openThreeDotsWindow(){
    const contentRef = document.getElementById("threeDotsID");
    contentRef.classList.remove("d_none");
}


/**
 * Closes the three-dots action menu.
 */
function closeThreeDotsWindow() {
    const contentRef = document.getElementById("threeDotsID");
    contentRef.classList.add("d_none");
}


document.addEventListener("click", (event) => {
    const menuRef = document.getElementById("threeDotsID");
    if (
        !menuRef ||
        menuRef.classList.contains("d_none") ||
        menuRef.contains(event.target) ||
        event.target.closest(".three-dots-button")
    ) {
        return;
    }
    closeThreeDotsWindow();
});


/**
 * Applies the focused styling to a selected contact in the contact list.
 *
 * @param {string} id - The id of the contact that should be focused.
 */
function setContactInFocusMode(id){
    const contactRef = document.getElementById(id);
    const contactNameRef = document.getElementById(id + "-userName");
    const contactMailRef = document.getElementById(id + "-email");

    contactRef.classList.toggle("backgroundcolor-blue");
    contactNameRef.classList.toggle("font-color-white");
    contactMailRef.classList.toggle("font-color-white");
}


/**
 * Removes the focused styling from the previously selected contact.
 */
function setLastContactBackToUnfocused(){
    if(choosedContactID != ""){
        const contactRef = document.getElementById(choosedContactID);
        const contactNameRef = document.getElementById(choosedContactID + "-userName");
        const contactMailRef = document.getElementById(choosedContactID + "-email");
        contactRef.classList.remove("backgroundcolor-blue");
        contactNameRef.classList.remove("font-color-white");
        contactMailRef.classList.remove("font-color-white");
        return;
    }
    return;
}

/**
 * Sorts contact entries into the predefined alphabetical groups.
 * Contacts whose names do not start with a letter from A to Z
 * are added to the "Other" group.
 *
 * @param {Array<[string, object]>} entries - The contact entries loaded from the database.
 */
function sortIntoAlphabeticalOrder(entries) {
    for (let index = 0; index < entries.length; index++) {
        const contact = entries[index][1];
        const contactID = entries[index][0];
        const firstLetter = contact.userName.charAt(0).toUpperCase();
        const targetIndex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(firstLetter);
        alphabeticalOrder[targetIndex === -1 ? 26 : targetIndex].contacts.push({
            ...contact,
            id: contactID
        });
    }
    sortContactsInsideBlogs();
}


/**
 * Sorts the contacts inside each alphabetical group by username.
 */
function sortContactsInsideBlogs() {
    alphabeticalOrder.forEach((blog) => {
        blog.contacts.sort((a, b) =>
            a.userName.localeCompare(b.userName, "de", { sensitivity: "base" })
        );
    });
}