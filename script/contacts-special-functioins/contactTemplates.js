function renderContactsTemplate(userName, email, phone, color, id, initial){

        return `
            
                    <contact onclick="renderContactDetails('${userName}', '${email}', '${phone}')" class="single-contact-container" id="${id}">

                        <div class="inital-ball ${color}">
                            ${initial}
                        </div>

                        <div class="name-mail-container">
                            <span class="name-font-contact" id="${id}-userName">${userName}</span>
                            <span class="mail-font-contact" id="${id}-email">${email}</span>
                        </div>

                    </contact>
            
                `

}


function contactDetailsTemplate(name, mail, initials, color, phone, id){
    return `
                <div class="floating-contact-container" id="${id}-floatingContact">
                    <div class="arrow-and-informationspan-container"> 
                        <h3 class="h3-font-floating-contact-responsive">Contact Information</h3>
                        <img onclick="floatBackContactDetails('${id}')" class="arrow-button-contact" src="./img/arrow.svg">
                    </div>
                    <top-section class="top-section-floating-contact">
                    
                        <div class="inital-ball-floating-contact ${color}" id="contactDetailInitialsID">
                            ${initials}
                        </div>
                        <div class="name-and-edit-delete-button-container-floating-contanct">
                            <h2 class="h2-floating-contact" id="contactDetailNameID">${name}</h2>
                            <div class="edit-and-delete-container-floating-contact">
                                <div 
                                        class="edit-and-delete-single-container-floating-contact"
                                        onclick="showEditContactWindow('${name}', '${mail}', '${initials}', '${color}', '${phone}', '${id}')"
                                        onmouseenter="this.querySelector('.edit-delete-icons-floating-contact').src='./img/userstory/edit-blue.svg'"
                                        onmouseleave="this.querySelector('.edit-delete-icons-floating-contact').src='./img/contacts/edit.svg'" 
                                    >
                                        <img class="edit-delete-icons-floating-contact" src="./img/contacts/edit.svg">
                                        <span class="edit-delete-font-float-contaier">Edit</span>
                                </div>
                                <div 
                                        class="edit-and-delete-single-container-floating-contact"
                                        onclick="deleteContact('${id}')"
                                        onmouseenter="this.querySelector('.edit-delete-icons-floating-contact').src='./img/userstory/delete-blue.svg'"
                                        onmouseleave="this.querySelector('.edit-delete-icons-floating-contact').src='./img/contacts/delete.svg'" 
                                    >
                                    <img class="edit-delete-icons-floating-contact" src="./img/contacts/delete.svg">
                                    <span class="edit-delete-font-float-contaier">Delete</span>
                                </div>
                            </div>
                        </div>
                    </top-section>
                    <bottom-section>
                        <h3 class="h3-font-floating-contact">Contact Information</h3>
                        <p class="p-tag-headline-font-floating-contact">Email</p>
                        <p class="email-font-floating-contact" id="contactDetailMailID">${mail}</p>
                        <p class="p-tag-headline-font-floating-contact">Phone</p>
                        <p class="phonenumber-font-floating-contact" id="contactDetailPhoneID">${phone}</p>
                    </bottom-section>

                    <div class="three-dots-button-container">
                        <button onclick="openThreeDotsWindow()" class="three-dots-button">
                            <img src="./img/three_dots.svg">
                        </button>
                    </div>
                
                </div>


                <popupmenue class="popup-three-dots-button d_none" id="threeDotsID">
                    <div class="popup-three-dots-container">
                        <div onclick="showEditContactWindow('${name}', '${mail}', '${initials}', '${color}', '${phone}', '${id}')" class="popup-three-dots-single-container">
                            <img class="edit-delete-icons-floating-contact" src="./img/contacts/edit.svg">
                            <span class="popup-three-dots-span-font">Edit</span>
                        </div>
                        <div onclick="deleteContact('${id}'), closeThreeDotsWindow()" class="popup-three-dots-single-container">
                            <img class="edit-delete-icons-floating-contact" src="./img/contacts/delete.svg">
                            <span class="popup-three-dots-span-font">Delete</span>
                        </div>
                    </div>
                </popupmenue>

            `
}


function addContactTemplate(){
    return  `
                <top-section class="top-section-addContact">

                    <div onclick="hideAddContactAndEditContactWindow()" class="close-button-container-add-contact"><img class="close-button" src="./img/close.svg" alt=""></div>


                    <div class="top-section-inside-addContact-ontainer">
                        <div class="join-logo-contact-container"><img class="join-logo-contact" src="./img/Capa 1.svg" alt=""></div>
                        <h2 class="h2-font-contact">Add Task</h2>
                        <span class="top-section-contact-font">Tasks are better with a team!</span>
                    </div>


                </top-section>

                <contact class="bottom-section-contact">

                        <form onsubmit="return validateAddContactForm(event)" name="addContactForm" class="bottom-section-container-contact" novalidate>

                            <div class="person-logo-container-contact">
                                <img class="person-logo-contact" src="./img/person.svg" alt="">
                            </div>

                            <div class="input-container-contact">

                                <div style="height: 40px;">
                                    <div class="single-inputfield-container-contact">
                                            <input onblur="checkIfNameIsValid()" class="inputfield-contact" type="text" placeholder="Name" name="name" id="nameID">
                                            <img class="inputfield-placeholder-img" src="./img/person.svg">
                                        
                                    </div>
                                    <span class="inputfield-contact-errormessage-name" id="errorNameID"></span>
                                </div>
                                
                                <div style="height: 40px;">
                                    <div class="single-inputfield-container-contact">
                                        <input onblur="checkIfMailIsValid()" class="inputfield-contact" type="email" placeholder="Email" name="mail" id="mailID">
                                        <img class="inputfield-placeholder-img" src="./img/mail.svg">
                                    </div>
                                    <span class="inputfield-contact-errormessage-mail" id="errorMailID"></span>
                                </div>

                                <div style="height: 40px;">
                                    <div class="single-inputfield-container-contact">
                                        <input onblur="checkIfPhonnumberIsValid()" class="inputfield-contact" type="tel" placeholder="Phone" name="phone" id="phoneID">
                                        <img class="inputfield-placeholder-img" src="./img/call.svg">
                                    </div>
                                    <span class="inputfield-contact-errormessage-number" id="errorNumberID"></span>
                                </div>

                            </div>

                            <div class="button-order-addContact">

                                <button type="button" onclick="hideAddContactAndEditContactWindow()" class="cancel-button-addContact">Cancel <img class="white-button-x" src="./img/iconoir_cancel.svg" alt=""></button>

                                <button type="submit" class="blue-button-big">Create Contact <img class="blue-button-check" src="./img/check.svg" alt=""></button>

                            </div>

                        </form>

                </contact>
            `
}


function editContactTemplate(initials, color, id){
    return `

                <top-section class="top-section-editContact">

                    <div onclick="hideAddContactAndEditContactWindow()" class="close-button-container-add-contact"><img class="close-button" src="./img/close.svg"></div>


                    <div class="top-section-inside-editContact-ontainer">
                        <div class="join-logo-contact-container"><img class="join-logo-contact" src="./img/Capa 1.svg" alt=""></div>
                        <h2 class="h2-font-contact">Edit contact</h2>
                    </div>


                </top-section>

                <contact class="bottom-section-contact">

                    <form onsubmit="return validateEditContactForm(event, '${id}')" name="editContactForm" class="bottom-section-container-contact" novalidate>

                        <div class="initial-container-edit-contact ${color}">
                            <span class="inital-font-edit-contact">${initials}</span>
                        </div>

                        <div class="input-container-contact">

                            <div style="height: 40px;">
                                <div class="single-inputfield-container-contact">
                                    <input onblur="checkIfNameIsValidEdit()" class="inputfield-contact" type="text" name="name" id="editContactNameID">
                                    <img class="inputfield-placeholder-img" src="./img/person.svg">
                                </div>
                                <span class="inputfield-contact-errormessage-name" id="editErrorNameID"></span>
                            </div>

                            <div style="height: 40px;">   
                                <div class="single-inputfield-container-contact">
                                    <input onblur="checkIfMailIsValidEdit()" class="inputfield-contact" type="email" name="mail" id="editContactMailID">
                                    <img class="inputfield-placeholder-img" src="./img/mail.svg">
                                </div>
                                <span class="inputfield-contact-errormessage-name" id="editErrorMailID"></span>
                            </div>

                            <div style="height: 40px;">
                                <div class="single-inputfield-container-contact">
                                    <input onblur="checkIfPhonnumberIsValidEdit()" class="inputfield-contact" type="tel" name="phone" id="editContactPhoneID">
                                    <img class="inputfield-placeholder-img" src="./img/call.svg">
                                </div>
                                <span class="inputfield-contact-errormessage-name" id="editErrorNumberID"></span>
                            </div>

                        </div>

                        <div class="button-order-editContact">
                            <button type="button" onclick="deleteContact('${id}')" class="white-button-big">
                                Delete
                            </button>

                            <button type="submit" class="blue-button-editContact-big">
                                Save
                                <img class="blue-button-check-editContact" src="./img/check.svg" alt="">
                            </button>
                        </div>

                    </form>

                </contact>

            `
}