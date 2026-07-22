/**
 * Toggles the visibility of the user popup menu.
 *
 * @param {MouseEvent} event - The click event triggered on the popup toggle button.
 */
function togglePopUpMenue(event) {
    event.stopPropagation();
    const popup = document.getElementById("popUpID");
    popup.classList.toggle("d_none");
}

document.addEventListener("click", function (event) {
    const popup = document.getElementById("popUpID");
    const button = document.getElementById("userInitialButtonID");
    const clickInsidePopup = popup.contains(event.target);
    const clickOnButton = button.contains(event.target);
    if (!clickInsidePopup && !clickOnButton) {
        popup.classList.add("d_none");
    }
});


/**
 * Removes the currently logged-in user data from local storage.
 */
function logout(){
    localStorage.removeItem("userData");
}


