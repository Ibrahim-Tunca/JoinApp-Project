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
    toggleBlackAddTaksButtonColor();
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
    toggleBlueAddTaksButtonColor();
}


function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    if(!cardDetailContainerRef){
        return
    }

    cardDetailContainerRef.classList.remove("top-50-percent");
    hideWhiteTransparentOverlay();
}


function toggleBlackAddTaksButtonColor(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.add("addTask-Button-toggle-board");
}


function toggleBlueAddTaksButtonColor(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.remove("addTask-Button-toggle-board");
}