/**
 * Enables dropping on a drag target by preventing the default browser behavior.
 *
 * @param {DragEvent} ev - The drag event triggered on the drop zone.
 */
function allowDrop(ev){
    ev.preventDefault();
}


/**
 * Stores the id of the task that is currently being dragged.
 *
 * @param {string} id - The id of the dragged task.
 */
function moveTask(id){
    currentDraggedTaskID = id;
}


/**
 * Applies the drag-hover styling to a board column while a task is dragged over it.
 *
 * @param {string} id - The id of the board column container.
 */
function getContainerDragHover(id){
    const containerRef = document.getElementById(id);
    containerRef.classList.add("cards-container-drag-hover-board");
}


/**
 * Removes the drag-hover styling from a board column.
 *
 * @param {string} id - The id of the board column container.
 */
function removeContainerDragHover(id){
    const containerRef = document.getElementById(id);
    containerRef.classList.remove("cards-container-drag-hover-board");
}


/**
 * Moves the currently dragged task to the status that belongs to the target container
 * and re-renders the board afterwards.
 *
 * @param {string} containerRef - The id of the target board column container.
 * @returns {Promise<void>} A promise that resolves when the task has been moved.
 */
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


/**
 * Creates a styled custom drag preview for a task card.
 *
 * @param {DragEvent} event - The drag event used to set the custom drag image.
 * @param {HTMLElement} element - The original task card element to clone as preview.
 */
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