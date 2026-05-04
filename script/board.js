function showAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");
    addTaskWindowRef.classList.remove("slide-addTask-window-board");
    showWhiteTransparentOverlay();
}

function hideAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");
    addTaskWindowRef.classList.add("slide-addTask-window-board");
    hideWhiteTransparentOverlay();
}
function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}

function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}

