function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}





function showBlogIfBlogIsNotEmpty(blog, contactRef){

    if(blog.contacts.length > 0)
        {
            contactRef.innerHTML += `<div class="letter-container"><span class="letter">${blog.letter}</span></div>`
        }
}




function setContactInFocusMode(id){
    const contactRef = document.getElementById(id);
    const contactNameRef = document.getElementById(id + "-userName");
    const contactMailRef = document.getElementById(id + "-email");

    contactRef.classList.toggle("backgroundcolor-blue");
    contactNameRef.classList.toggle("font-color-white");
    contactMailRef.classList.toggle("font-color-white");
}


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
    return;
}