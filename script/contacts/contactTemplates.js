function renderContactsTemplate(userName, email, phone, color, initial){

        return `
            
                    <contact onclick="renderContactDetails('${userName}', '${email}', '${phone}')" class="contact-container">

                        <div class="inital-ball ${color}">
                            ${initial}
                        </div>

                        <div class="name-mail-container">
                            <span class="name-font-contact">${userName}</span>
                            <span class="mail-font-contact">${email}</span>
                        </div>

                    </contact>
            
                `

}

function contactDetailsTemplate(name, mail, initials, color, phone){
    return `
                <div class="floating-contact-container">
                    <top-section class="top-section-floating-contact">
                        <div class="inital-ball-floating-contact ${color}">
                            ${initials}
                        </div>
                        <div class="name-and-edit-delete-button-container-floating-contanct">
                            <h2 class="h2-floating-contact">${name}</h2>
                            <div class="edit-and-delete-container-floating-contact">
                                <div class="edit-and-delete-single-container-floating-contact">
                                    <img class="edit-delete-icons-floating-contact" src="./img/contacts/edit.svg" alt="">
                                    <span class="edit-delete-font-float-contaier">Edit</span>
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