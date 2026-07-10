function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}


function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}


function showAddTaskWindow() {
    const sectionContainerRef = document.getElementById("formContainerID");
    sectionContainerRef.innerHTML = getAddTaskFormTemplate();
    const addTaskWindowRef = document.getElementById("addTaskForm");

    showWhiteTransparentOverlay();
    initCustomSelects();
    loadContacts();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            addTaskWindowRef.classList.remove("slide-addTask-window-board");
        });
    });
}


function hideAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");

    if(!addTaskWindowRef){
        return
    }

    addTaskWindowRef.classList.add("slide-addTask-window-board");
    hideWhiteTransparentOverlay();
    makeAddTaksButtonBlue();
    setFirstButtonBlue();
    setSecondButtonBlue();
    setThirdButtonBlue();
}


function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    if(!cardDetailContainerRef){
        return
    }

    cardDetailContainerRef.classList.remove("top-50-percent-board");
    hideWhiteTransparentOverlay();
}


function makeAddTaksButtonBlack(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.add("addTask-Button-toggle-board");
}


function makeAddTaksButtonBlue(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.remove("addTask-Button-toggle-board");
}


function setFirstButtonGrey(){
    const buttonRef = document.getElementById("firstPLusID");
    buttonRef.classList.add("plus-button-board-focus");
}


function setFirstButtonBlue(){
    const buttonRef = document.getElementById("firstPLusID");
    buttonRef.classList.remove("plus-button-board-focus");
}


function setSecondButtonGrey(){
    const buttonRef = document.getElementById("secondPlusID");
    buttonRef.classList.add("plus-button-board-focus");
}


function setSecondButtonBlue(){
    const buttonRef = document.getElementById("secondPlusID");
    buttonRef.classList.remove("plus-button-board-focus");
}


function setThirdButtonGrey(){
    const buttonRef = document.getElementById("thirdPlusID");
    buttonRef.classList.add("plus-button-board-focus");
}


function setThirdButtonBlue(){
    const buttonRef = document.getElementById("thirdPlusID");
    buttonRef.classList.remove("plus-button-board-focus");
}