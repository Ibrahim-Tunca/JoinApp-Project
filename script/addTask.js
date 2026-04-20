let priority = "";

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