function getImgByPriority(priority, id){
    const priorityRef = document.getElementById("priorityNr" + id);

    if (priority === "low") {
        priorityRef.innerHTML = `<img class="other-prio-icon-card" src="./img/addTask/prio-low.svg">`
    }
    if (priority === "medium") {
        priorityRef.innerHTML = `<img class="mid-prio-icon-card" src="./img/addTask/prio-medium.svg">`
    }
    if (priority === "urgent") {
        priorityRef.innerHTML = `<img class="other-prio-icon-card" src="./img/addTask/prio-high.svg">`
    }
}


function getHeadlineCardColor(category, id){
    const categoryRef = document.getElementById("categoryNr" + id);

    if(category === "User Story"){
        categoryRef.classList.add("background-color-orange");
    }
    if(category === "Technical Task"){
        categoryRef.classList.add("background-color-blue");
    }
}


function countFinishedSubtasks(subtasks){
    let subtaskCounter = 0;
    for (let index = 0; index < subtasks.length; index++) {
        const currentSubtaskStatus = subtasks[index].status;
        if(currentSubtaskStatus == true){
            subtaskCounter++
        }
    }
    return subtaskCounter;
}


function showSubtaskProgress(subtasks, id){
    const subTaskContainerRef = document.getElementById("subTaskContainerNr" + id);
    const finishedSubTasks = countFinishedSubtasks(subtasks);

    if(subtasks.length < 1){
        return;
    }

    subTaskContainerRef.innerHTML = subtaskProgressbarTemplate(finishedSubTasks, subtasks);
    return;
}


function getLetterBalls(contacts, id){
    const letterBallContainerRef = document.getElementById("letterBallContainerNr" + id);
    const remainingContactballContainer = document.getElementById("remainingContactballContainerNr" + id);
    let distanceBetweenInitalBalls = 0;

    if(contacts.length > 4){
        for (let index = 0; index < 4; index++) {
            const initals = contacts[index].initals;
            const color = contacts[index].color;
            const contactId = contacts[index].id;
            letterBallContainerRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
            distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
        }
        remainingContactballContainer.innerHTML += `<span class="remaining-contact-bubble-font" style="padding-left: 92px;">+${contacts.length - 4}</span>`;
    }
    else{
        for (let index = 0; index < contacts.length; index++) {
            const initals = contacts[index].initals;
            const color = contacts[index].color;
            const contactId = contacts[index].id;
            letterBallContainerRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
            distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
        }
    }
}


async function getContactsContainerFromTaskByID(id){
    const taskEntries = await getTaskEntriesFromDataBase();

    for (let index = 0; index < taskEntries.length; index++) {
        const taskID = taskEntries[index][0];
        if(taskID === id){
            const contacts = taskEntries[index][1].contacts;
            return contacts
        }
    }
    return;
}


async function openPopupMenu(event, id) {
    event.stopPropagation();

    closeAllPopupMenus();
    currentClickedTaskID = id;

    renderTheRightMoveToOptionsTemplate(id);
}


function closeAllPopupMenus() {
    const openMenus = document.querySelectorAll('[id^="popupMenuNR"]');

    openMenus.forEach((menuRef) => {
        menuRef.innerHTML = "";
    });
}


async function moveTaskFromMenu(event, id, status) {
    event.stopPropagation();

    await updateStatusFromTask(id, status);
    await renderAllCards();
}       


document.addEventListener("click", (event) => {
    if (
        event.target.closest(".popUpMenue-moveto") ||
        event.target.closest(".swap-button-board")
    ) {
        return;
    }

    closeAllPopupMenus();
});