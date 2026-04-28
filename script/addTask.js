let priority = "";

let subtaskID = 0;

const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/";

initCustomSelects();

async function loadContacts(){
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    const entries = Object.entries(responseToJson);

    

    const contactSelectionContainerRef = document.getElementById("contactSelectionID");


    for (let index = 0; index < entries.length; index++) {
        const contactName = entries[index][1].userName;
        const contactColor = entries[index][1].color;
        const contactInitals = entries[index][1].userName.charAt(0).toUpperCase();
        const contactKey = entries[index][0];

        

        contactSelectionContainerRef.innerHTML += ` <label class="contact-option-addTask" id="contactID${contactKey}">
                                                        <input
                                                            class="contact-checkbox-addTask"
                                                            type="checkbox"
                                                            name="contacts"
                                                            value="${contactName}"
                                                        >
                                                        <div class="contact-option-left-container-addTask">
                                                            <div class="contact-initial-ball ${contactColor}">${contactInitals}</div>
                                                            ${contactName}
                                                        </div>
                                                        <span class="contact-checkbox-visual-addTask" aria-hidden="true"></span>
                                                    </label>`
    }
    
    
}







