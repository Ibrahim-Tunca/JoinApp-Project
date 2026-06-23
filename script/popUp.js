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


function logout(){
    localStorage.removeItem("userData");
}


