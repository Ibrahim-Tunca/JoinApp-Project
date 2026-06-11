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


function customDragImage(event, element) {
    const dragPreview = element.cloneNode(true);
    dragPreview.style.backgroundColor = "#D2E3FF";
    dragPreview.style.borderRadius = "24px";
    dragPreview.style.transform = "rotate(10deg)";
    document.body.appendChild(dragPreview);

        event.dataTransfer.setDragImage(
        dragPreview,
        dragPreview.offsetWidth / 2,
        dragPreview.offsetHeight / 2
    );

    setTimeout(() => dragPreview.remove(), 0);
}