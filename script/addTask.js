let priority = "";

let subtaskID = 0;

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

    createdSubtasksContainer.innerHTML +=   `<div class="single-subtask-container" id="subtaskNr${subtaskID}ID">    
                                                        <span>• ${subtaskValue}</span>  
                                                        <div class="subtask-button-container">
                                                            <img 
                                                                onclick="deleteSingleSubtask(${subtaskID})"
                                                                class="subtask-trash-icon" 
                                                                src="./img/trashcan.svg" 
                                                                alt=""
                                                                onmouseenter="this.src='./img/addTask/trashcan-blue.svg'"
                                                                onmouseleave="this.src='./img/trashcan.svg'"
                                                            >
                                                            <div class="subtask-separator"></div>
                                                            <img 
                                                                onclick="editSingleSubtask(${subtaskID}, '${subtaskValue}')"
                                                                class="subtask-pencil-icon" 
                                                                src="./img/pencil.svg" 
                                                                alt=""
                                                                onmouseenter="this.src='./img/addTask/pencil-blue.svg'"
                                                                onmouseleave="this.src='./img/pencil.svg'"
                                                            >
                                                        </div>
                                            </div>`;

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
    subTaskRef.remove();
}

function editSingleSubtask(id, value){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    subTaskRef.style.paddingLeft = "0";

    subTaskRef.innerHTML = `<div class="wrapper-div-container">
                                <input 
                                    class="edit-input-subtask-addTask" 
                                    type="text" 
                                    placeholder="add new subtask" 
                                    id="editSubtask${id}">
                            
                                <div class="cancel-and-confirm-container" style="gap: 5px;">
                                    <img 
                                        onclick="deleteSingleSubtask(${id})" 
                                        class="edit-subtask-trashcan-icon" 
                                        src="./img/trashcan.svg"
                                        onmouseenter="this.src='./img/addTask/trashcan-blue.svg'"
                                        onmouseleave="this.src='./img/trashcan.svg'"
                                    >
                                    <span class="cancel-and-confirm-separator"></span>
                                    <img 
                                        onclick="confirmEditSubtask(${id})" 
                                        class="edit-subtask-confirm-icon" 
                                        src="./img/addTask/confirm.svg"
                                        onmouseenter="this.src='./img/addTask/confirm-blue.svg'"
                                        onmouseleave="this.src='./img/addTask/confirm.svg'">
                                </div>
                            </div>`

        const inputRef = document.getElementById("editSubtask" + id);
        inputRef.value = value;
        inputRef.focus();
        inputRef.setSelectionRange(value.length, value.length);
}

function confirmEditSubtask(id){
    const subTaskRef = document.getElementById("subtaskNr" + id + "ID");
    const subTaskValue = document.getElementById("editSubtask" + id).value;


    subTaskRef.innerHTML =  `
                                            <div class="single-subtask-container" id="subtaskNr${id}ID">    
                                                        <span>• ${subTaskValue}</span>  
                                                        <div class="subtask-button-container">
                                                            <img 
                                                                onclick="deleteSingleSubtask(${id})"
                                                                class="subtask-trash-icon" 
                                                                src="./img/trashcan.svg" 
                                                                alt=""
                                                                onmouseenter="this.src='./img/addTask/trashcan-blue.svg'"
                                                                onmouseleave="this.src='./img/trashcan.svg'"
                                                            >
                                                            <div class="subtask-separator"></div>
                                                            <img 
                                                                onclick="editSingleSubtask(${id}, '${subTaskValue}')"
                                                                class="subtask-pencil-icon" 
                                                                src="./img/pencil.svg" 
                                                                alt=""
                                                                onmouseenter="this.src='./img/addTask/pencil-blue.svg'"
                                                                onmouseleave="this.src='./img/pencil.svg'"
                                                            >
                                                        </div>
                                            </div>
                                `;
    
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

initCustomSelects();