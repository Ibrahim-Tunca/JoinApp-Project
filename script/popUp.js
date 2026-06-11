function togglePopUpMenue(){
    contentRef = document.getElementById("popUpID");
    contentRef.classList.toggle("d_none");
}


function logout(){
    localStorage.removeItem("userData");
}


