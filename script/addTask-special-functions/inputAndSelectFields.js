function setPrioToLow(){
    buttonLowPrioRef = document.getElementById("lowPrioID");
    buttonMidPrioRef = document.getElementById("mediumPrioID");
    buttonHighPrioRef = document.getElementById("urgentPrioID");

    imgLowPrioRef = document.getElementById("lowPrioIMGID");
    imgMidPrioRef = document.getElementById("midPrioIMGID");
    imgHighPrioRef = document.getElementById("urgentPrioIMGID");

    buttonLowPrioRef.classList.add("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.remove("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.remove("high-prio-button-focused-addTask");

    imgLowPrioRef.src = "./img/addTask/prio-low-white.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high.svg"

    priority = "low";
}


function setPrioToMedium(){
    buttonLowPrioRef = document.getElementById("lowPrioID");
    buttonMidPrioRef = document.getElementById("mediumPrioID");
    buttonHighPrioRef = document.getElementById("urgentPrioID");

    imgLowPrioRef = document.getElementById("lowPrioIMGID");
    imgMidPrioRef = document.getElementById("midPrioIMGID");
    imgHighPrioRef = document.getElementById("urgentPrioIMGID");
    
    buttonLowPrioRef.classList.remove("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.add("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.remove("high-prio-button-focused-addTask");

    imgLowPrioRef.src = "./img/addTask/prio-low.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium-white.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high.svg"

    priority = "medium";
}


function setPrioToUrgent(){
    buttonLowPrioRef = document.getElementById("lowPrioID");
    buttonMidPrioRef = document.getElementById("mediumPrioID");
    buttonHighPrioRef = document.getElementById("urgentPrioID");

    imgLowPrioRef = document.getElementById("lowPrioIMGID");
    imgMidPrioRef = document.getElementById("midPrioIMGID");
    imgHighPrioRef = document.getElementById("urgentPrioIMGID");
    
    buttonLowPrioRef.classList.remove("low-prio-button-focused-addTask");
    buttonMidPrioRef.classList.remove("mid-prio-button-focused-addTask");
    buttonHighPrioRef.classList.add("high-prio-button-focused-addTask");

    imgLowPrioRef.src = "./img/addTask/prio-low.svg"
    imgMidPrioRef.src = "./img/addTask/prio-medium.svg"
    imgHighPrioRef.src = "./img/addTask/prio-high-white.svg"

    priority = "urgent";
}


function setContactInFocus(id){    
    contactRef = document.getElementById("contactID" + id);
    checkBoxRef = document.getElementById("checkBoxID" + id);

    contactRef.classList.add("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("./img/addTask/checkbox_checked_white.svg")';
}


function setContactInUnfocus(id){
    contactRef = document.getElementById("contactID" + id);
    checkBoxRef = document.getElementById("checkBoxID" + id);

    contactRef.classList.remove("contact-option-addTask-focused");
    checkBoxRef.style.backgroundImage = 'url("../img/checkbox_unchecked.svg")';
}


function showButtons(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;

    if(subtaskValue != ""){
        subtasksInputfieldButtonContainerRef.classList.remove("d_none");
        return;
    }

    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    return;
}


function pasteSubtaskUnderInputfield(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;
    const createdSubtasksContainer = document.getElementById("createdSubtasksContainerID");

    subtasks.push({id: subtaskID, value: subtaskValue, status: false});
    createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(subtaskID, subtaskValue);

    subtaskID++;
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
}


function deleteInputValueSubtask(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonContainerID");
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
}


function deleteSingleSubtask(id){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    deleteSingleSubtaskFromGlobalArray(id);
    subTaskRef.remove();
}


function deleteSingleSubtaskFromGlobalArray(id){
    for (let index = 0; index < subtasks.length; index++) {
        const currentTaskID = subtasks[index].id;
        if(currentTaskID === id){
            subtasks.splice(index, 1);
            return;
        }
    }
}


function overwriteAnSubtaskFromGlobalArray(id, value){
    for (let index = 0; index < subtasks.length; index++) {
        const currentTaskID = subtasks[index].id;
        if(currentTaskID === id){
            subtasks[index].value = value;
            return;
        }
    }
}


function editSingleSubtask(id, value){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    subTaskRef.style.paddingLeft = "0";
    subTaskRef.innerHTML = editSingleSubtaskTemplate(id);

        const inputRef = document.getElementById("editSubtask" + id);
        inputRef.value = value;
        inputRef.focus();
        inputRef.setSelectionRange(value.length, value.length);

        setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
    }, 0);

    function handleOutsideClick(event) {
        if (subTaskRef.contains(event.target)) {
            return;
        }

        const currentValue = inputRef.value.trim();
        subTaskRef.innerHTML = pasteSubtaskUnderInputfieldTemplate(id, currentValue);
        subTaskRef.style.paddingLeft = "";

        document.removeEventListener("click", handleOutsideClick);
    }
}


function confirmEditSubtask(id){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    const subTaskValue = document.getElementById("editSubtask" + id).value;

    overwriteAnSubtaskFromGlobalArray(id, subTaskValue);
    subTaskRef.innerHTML =  confirmEditSubtaskTemplate(id, subTaskValue);
}


function initCustomSelects() {
    const customSelects = document.querySelectorAll(".custom-select-addTask");

    customSelects.forEach((selectElement) => {
        const toggleButton = selectElement.querySelector(".custom-select-toggle-addTask");
        const label = selectElement.querySelector(".custom-select-label-addTask");
        const hiddenInput = selectElement.querySelector('input[type="hidden"]');
        const menu = selectElement.querySelector(".custom-select-menu-addTask");
        const options = selectElement.querySelectorAll(".custom-select-option-addTask");
        const placeholder = selectElement.dataset.placeholder;

        selectElement.classList.add("placeholder");

        toggleButton.addEventListener("click", () => {
            const isOpen = selectElement.classList.contains("open");

            closeAllCustomSelects();

            if (!isOpen) {
                selectElement.classList.add("open");
                menu.classList.remove("d_none");
            }
        });

        options.forEach((optionButton) => {
            optionButton.addEventListener("click", () => {
                const optionValue = optionButton.dataset.value;
                const optionText = optionButton.textContent;

                hiddenInput.value = optionValue;
                label.textContent = optionText;
                selectElement.classList.remove("placeholder");
                selectElement.classList.remove("open");
                menu.classList.add("d_none");
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".custom-select-addTask")) {
            closeAllCustomSelects();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllCustomSelects();
        }
    });
}

function closeAllCustomSelects() {
    document.querySelectorAll(".custom-select-addTask").forEach((selectElement) => {
        selectElement.classList.remove("open");

        const menu = selectElement.querySelector(".custom-select-menu-addTask");
        if (menu) {
            menu.classList.add("d_none");
        }
    });
}

