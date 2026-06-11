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
    let distanceBetweenInitalBalls = 0;

    for (let index = 0; index < contacts.length; index++) {
        const initals = contacts[index].initals;
        const color = contacts[index].color;
        const contactId = contacts[index].id;

        letterBallContainerRef.innerHTML += `<div class="letter-ball-card ${color}" style="left: ${distanceBetweenInitalBalls}px;">${initals}</div>`;
        distanceBetweenInitalBalls = distanceBetweenInitalBalls + 26;
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


function openPopupMenu(event, id) {
    event.stopPropagation();

    currentClickedTaskID = id;
    const menuRef = document.getElementById("popupMenuNR" + id);
    menuRef.classList.remove("d_none");
}


function closePopupMenu(id) {
    const menuRef = document.getElementById("popupMenuNR" + id);
    menuRef.classList.add("d_none");
}


async function moveTaskFromMenu(event, id, status) {
    event.stopPropagation();

    await updateStatusFromTask(id, status);
    await renderAllCards();
}       


document.addEventListener("click", (event) => {
    const menuRef = document.getElementById("popupMenuNR" + currentClickedTaskID);

    if (
        !menuRef ||
        menuRef.classList.contains("d_none") ||
        menuRef.contains(event.target) ||
        event.target.closest(".swap-button-board")
    ) {
        return;
    }

    closePopupMenu(currentClickedTaskID);
});