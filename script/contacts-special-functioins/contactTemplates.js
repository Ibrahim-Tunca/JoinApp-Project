function renderContactsTemplate(userName, email, phone, color, id, initial){

        return `
            
                    <contact onclick="renderContactDetails('${userName}', '${email}', '${phone}')" class="contact-container" id="${id}">

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
                    <top-section class="top-section-floating-contact">
                        <div class="inital-ball-floating-contact ${color}">
                            ${initials}
                        </div>
                        <div class="name-and-edit-delete-button-container-floating-contanct">
                            <h2 class="h2-floating-contact">${name}</h2>
                            <div class="edit-and-delete-container-floating-contact">
                                <div class="edit-and-delete-single-container-floating-contact">
                                    <img class="edit-delete-icons-floating-contact" src="./img/contacts/edit.svg" alt="">
                                    <span onclick="showEditContactWindow('${name}', '${mail}', '${initials}', '${color}', '${phone}', '${id}')" class="edit-delete-font-float-contaier">Edit</span>
                                </div>
                                <div class="edit-and-delete-single-container-floating-contact">
                                    <img class="edit-delete-icons-floating-contact" src="./img/contacts/delete.svg" alt="">
                                    <span class="edit-delete-font-float-contaier">Delete</span>
                                </div>
                            </div>
                        </div>
                    </top-section>
                    <bottom-section>
                        <h3 class="h3-font-floating-contact">Contact Information</h3>
                        <p class="p-tag-headline-font-floating-contact">Email</p>
                        <p class="email-font-floating-contact">${mail}</p>
                        <p class="p-tag-headline-font-floating-contact">Phone</p>
                        <p class="phonenumber-font-floating-contact">${phone}</p>
                    </bottom-section>
                </div>

            `
}

function editContactTemplate(initials, color, id){
    return `

                <top-section class="top-section-editContact">

                    <div onclick="hideAddContactAndEditContactWindow()" class="close-button-container-add-contact"><img class="close-button" src="./img/close.svg" alt=""></div>


                    <div class="top-section-inside-editContact-ontainer">
                        <div class="join-logo-contact-container"><img class="join-logo-contact" src="./img/Capa 1.svg" alt=""></div>
                        <h2 class="h2-font-contact">Edit contact</h2>
                    </div>


                </top-section>

                <contact class="bottom-section-contact">

                    <form onsubmit="return validateEditContactForm(event, '${id}')" name="editContactForm" class="bottom-section-container-contact">

                        <div class="initial-container-edit-contact ${color}">
                            <span class="inital-font-edit-contact">${initials}</span>
                        </div>

                        <div class="input-container-contact">

                            <div class="single-inputfield-container-contact">
                                <input class="inputfield-contact" type="text" name="name" id="editContactNameID">
                                <img class="inputfield-placeholder-img" src="./img/person.svg" alt="">
                            </div>
                            <div class="single-inputfield-container-contact">
                                <input class="inputfield-contact" type="email" name="mail" id="editContactMailID">
                                <img class="inputfield-placeholder-img" src="./img/mail.svg" alt="">
                            </div>
                            <div class="single-inputfield-container-contact">
                                <input class="inputfield-contact" type="tel" name="phone" id="editContactPhoneID">
                                <img class="inputfield-placeholder-img" src="./img/call.svg" alt="">
                            </div>

                        </div>

                        <div class="button-order-editContact">
                            <button type="button" onclick="hideAddContactAndEditContactWindow()" class="white-button-big">
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