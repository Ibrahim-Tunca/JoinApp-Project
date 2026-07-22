/**
 * Shows the transparent overlay behind floating board windows.
 */
function showWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.add("show-overlay-board");
}


/**
 * Hides the transparent overlay behind floating board windows.
 */
function hideWhiteTransparentOverlay(){
    const overlayRef = document.getElementById("whiteTransparentOverlayID");
    overlayRef.classList.remove("show-overlay-board");
}


/**
 * Opens the add-task window on the board,
 * renders the form, and starts the opening animation.
 */
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


/**
 * Closes the add-task window on the board
 * and resets the related button states.
 */
function hideAddTaskWindow(){
    const addTaskWindowRef = document.getElementById("addTaskForm");
    if(!addTaskWindowRef){
        return
    }
    addTaskWindowRef.classList.add("slide-addTask-window-board");
    hideWhiteTransparentOverlay();
    makeAddTaksButtonBlue();
    setAllButtonsBlueAgain();
}


/**
 * Closes the task detail window and hides the overlay.
 */
function hideCardDetailWindow(){
    const cardDetailContainerRef = document.getElementById("cardDetailContainerID");
    if(!cardDetailContainerRef){
        return
    }
    cardDetailContainerRef.classList.remove("top-50-percent-board");
    hideWhiteTransparentOverlay();
}


/**
 * Applies the active styling to the main add-task button.
 */
function makeAddTaksButtonBlack(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.add("addTask-Button-toggle-board");
}


/**
 * Removes the active styling from the main add-task button.
 */
function makeAddTaksButtonBlue(){
    const addTaskButtonRef = document.getElementById("addTaskButtonID");
    addTaskButtonRef.classList.remove("addTask-Button-toggle-board");
}


/**
 * Applies the focused styling to one plus button on the board.
 *
 * @param {string} id - The id of the button that should be highlighted.
 */
function setButtonGrey(id){
    const buttonRef = document.getElementById(id);
    buttonRef.classList.add("plus-button-board-focus");
}


/**
 * Resets all plus buttons on the board to their default styling.
 */
function setAllButtonsBlueAgain(){
    const buttonRef1 = document.getElementById("firstPlusID");
    const buttonRef2 = document.getElementById("secondPlusID");
    const buttonRef3 = document.getElementById("thirdPlusID");
    buttonRef1.classList.remove("plus-button-board-focus");
    buttonRef2.classList.remove("plus-button-board-focus");
    buttonRef3.classList.remove("plus-button-board-focus");
}


