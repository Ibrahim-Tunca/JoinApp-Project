function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function toggleAddContactWindow(){
    let buttonRef = document.getElementById("contactsButtonID");
    let overlayRef = document.getElementById("overlayID");
    let contentRef = document.getElementById("addContactID");

    buttonRef.classList.toggle("toggle-color-contacts-button");
    overlayRef.classList.toggle("hide-and-show-overlay-contacts");
    contentRef.classList.toggle("toggle-add-contact-card");
}


function getContactColorType(){
    let randomNumber = getRandomInt(100);
    const colorCode = randomNumber % 8;  

    if(colorCode === 0){
        return "orange";
    }
    if(colorCode === 1){
        return "lila";
    }
    if(colorCode === 2){
        return "lavander";
    }
    if(colorCode === 3){
        return "violette";
    }
    if(colorCode === 4){
        return "pink";
    }
    if(colorCode === 5){
        return "yellow";
    }
    if(colorCode === 6){
        return "turquoise";
    }
    if(colorCode === 7){
        return "red";
    }
}


function sortIntoAlphabeticalOrder(entries){

    for (let index = 0; index < entries.length; index++) {
        const contact = entries[index][1];
        const contactFirstLetter = contact.userName.charAt(0).toUpperCase();

        switch (contactFirstLetter) {
            case "A":
                alphabeticalOrder[0].contacts.push(contact);
                break;
            case "B":
                alphabeticalOrder[1].contacts.push(contact);
                break;
            case "C":
                alphabeticalOrder[2].contacts.push(contact);
                break;
            case "D":
                alphabeticalOrder[3].contacts.push(contact);
                break;
            case "E":
                alphabeticalOrder[4].contacts.push(contact);
                break;
            case "F":
                alphabeticalOrder[5].contacts.push(contact);
                break;
            case "G":
                alphabeticalOrder[6].contacts.push(contact);
                break;
            case "H":
                alphabeticalOrder[7].contacts.push(contact);
                break;
            case "I":
                alphabeticalOrder[8].contacts.push(contact);
                break;
            case "J":
                alphabeticalOrder[9].contacts.push(contact);
                break;
            case "K":
                alphabeticalOrder[10].contacts.push(contact);
                break;
            case "L":
                alphabeticalOrder[11].contacts.push(contact);
                break;
            case "M":
                alphabeticalOrder[12].contacts.push(contact);
                break;
            case "N":
                alphabeticalOrder[13].contacts.push(contact);
                break;
            case "O":
                alphabeticalOrder[14].contacts.push(contact);
                break;
            case "P":
                alphabeticalOrder[15].contacts.push(contact);
                break;
            case "Q":
                alphabeticalOrder[16].contacts.push(contact);
                break;
            case "R":
                alphabeticalOrder[17].contacts.push(contact);
                break;
            case "S":
                alphabeticalOrder[18].contacts.push(contact);
                break;
            case "T":
                alphabeticalOrder[19].contacts.push(contact);
                break;
            case "U":
                alphabeticalOrder[20].contacts.push(contact);
                break;
            case "V":
                alphabeticalOrder[21].contacts.push(contact);
                break;
            case "W":
                alphabeticalOrder[22].contacts.push(contact);
                break;
            case "X":
                alphabeticalOrder[23].contacts.push(contact);
                break;
            case "Y":
                alphabeticalOrder[24].contacts.push(contact);
                break;
            case "Z":
                alphabeticalOrder[25].contacts.push(contact);
                break;
            default:
                alphabeticalOrder[26].contacts.push(contact);
        }

    }
    return;
}