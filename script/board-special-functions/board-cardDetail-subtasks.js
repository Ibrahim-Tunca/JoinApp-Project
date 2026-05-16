function showButtonsCardDetail(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonCardDetailContainerID");
    const subtaskValue = document.forms["addTaskFormInCardDetail"]["subtaskformInCardDetail"].value;

    if(subtaskValue != ""){
        subtasksInputfieldButtonContainerRef.classList.remove("d_none");
        return;
    }

    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    return;
}

function pasteSubtaskUnderInputfieldCardDetail(){
    const subtasksInputfieldButtonContainerRef = document.getElementById("subtasksInputfieldButtonCardDetailContainerID");
    const subtaskValue = document.forms["addTaskForm"]["subtaskform"].value;
    const createdSubtasksContainer = document.getElementById("createdSubtasksInCardDetailContainerID");

    subtasks.push({id: subtaskID, value: subtaskValue, status: false});
    createdSubtasksContainer.innerHTML += pasteSubtaskUnderInputfieldTemplate(subtaskID, subtaskValue);

    subtaskID++;
    subtasksInputfieldButtonContainerRef.classList.add("d_none");
    document.forms["addTaskForm"]["subtaskform"].value = "";
}