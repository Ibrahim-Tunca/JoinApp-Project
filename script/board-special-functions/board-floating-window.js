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
}


function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");

    if(!cardDetailContainerRef){
        return
    }

    cardDetailContainerRef.classList.remove("top-50-percent");
    hideWhiteTransparentOverlay();
}