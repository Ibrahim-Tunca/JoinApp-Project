/**
 * Returns a random integer between 0 and the given maximum value.
 *
 * @param {number} max - The upper boundary for the random number.
 * @returns {number} A random integer from 0 up to, but not including, max.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


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
 * Returns a random color class name for a contact avatar.
 *
 * @returns {string|undefined} The generated color class name.
 */
function getContactColorType(){
    let randomNumber = getRandomInt(100);
    const colorCode = randomNumber % 15;  

    if(colorCode === 0){
        return "ocker";
    }
    if(colorCode === 1){
        return "yellow";
    }
    if(colorCode === 2){
        return "orange";
    }
    if(colorCode === 3){
        return "red";
    }
    if(colorCode === 4){
        return "salmon";
    }
    if(colorCode === 5){
        return "creme";
    }
    if(colorCode === 6){
        return "lila";
    }
    if(colorCode === 7){
        return "lavender";
    }
    if(colorCode === 8){
        return "violette";
    }
    if(colorCode === 9){
        return "pink";
    }
    if(colorCode === 10){
        return "magenta";
    }
    if(colorCode === 11){
        return "blue";
    }
    if(colorCode === 12){
        return "turquoise";
    }
    if(colorCode === 13){
        return "babyblue";
    }
    if(colorCode === 14){
        return "lime";
    }
}


/**
 * Sorts contact entries into the predefined alphabetical groups.
 *
 * @param {Array<[string, object]>} entries - The contact entries loaded from the database.
 */
function sortIntoAlphabeticalOrder(entries){
    for (let index = 0; index < entries.length; index++) {
        const contact = entries[index][1];
        const contactFirstLetter = contact.userName.charAt(0).toUpperCase();
        const contactID = entries[index][0];
        switch (contactFirstLetter) {
            case "A":
                alphabeticalOrder[0].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "B":
                alphabeticalOrder[1].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "C":
                alphabeticalOrder[2].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "D":
                alphabeticalOrder[3].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "E":
                alphabeticalOrder[4].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "F":
                alphabeticalOrder[5].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "G":
                alphabeticalOrder[6].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "H":
                alphabeticalOrder[7].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "I":
                alphabeticalOrder[8].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "J":
                alphabeticalOrder[9].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "K":
                alphabeticalOrder[10].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "L":
                alphabeticalOrder[11].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "M":
                alphabeticalOrder[12].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "N":
                alphabeticalOrder[13].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "O":
                alphabeticalOrder[14].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "P":
                alphabeticalOrder[15].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "Q":
                alphabeticalOrder[16].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "R":
                alphabeticalOrder[17].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "S":
                alphabeticalOrder[18].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "T":
                alphabeticalOrder[19].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "U":
                alphabeticalOrder[20].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "V":
                alphabeticalOrder[21].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "W":
                alphabeticalOrder[22].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "X":
                alphabeticalOrder[23].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "Y":
                alphabeticalOrder[24].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            case "Z":
                alphabeticalOrder[25].contacts.push({
                    ...contact,
                    id: contactID
                });
                break;
            default:
                alphabeticalOrder[26].contacts.push({
                    ...contact,
                    id: contactID
                });
        }

    }

    sortContactsInsideBlogs();
    return;
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