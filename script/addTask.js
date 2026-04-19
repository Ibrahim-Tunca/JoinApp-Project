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