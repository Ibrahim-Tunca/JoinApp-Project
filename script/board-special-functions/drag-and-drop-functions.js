function allowDrop(ev){
    ev.preventDefault();
}


function moveTask(id){
    currentDraggedTaskID = id;
}


function getContainerDragHover(id){
    const containerRef = document.getElementById(id);
    containerRef.classList.add("cards-container-drag-hover-board");
}


function removeContainerDragHover(id){
    const containerRef = document.getElementById(id);
    containerRef.classList.remove("cards-container-drag-hover-board");
}


async function moveTo(containerRef){
    const statusByContainer = {
        toDoContainerID: "todo",
        inProgressContainerID: "inProgress",
        awaitFeedbackContainerID: "awaitFeedback",
        doneContainerID: "done"
    };
    
    const status = statusByContainer[containerRef];
        if (!status || !currentDraggedTaskID) {
            return;
        }

    await updateStatusFromTask(currentDraggedTaskID, status);
    await renderAllCards();
}