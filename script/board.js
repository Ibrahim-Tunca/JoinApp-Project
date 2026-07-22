let currentDraggedTaskID;
let currentClickedTaskID;


/**
 * Loads all task cards by status and renders them into their matching board columns.
 *
 * @returns {Promise<void>} A promise that resolves when all board columns have been rendered.
 */
async function renderAllCards() {
    const toDoContainerRef = document.getElementById("toDoContainerID");
    const inProgressContainerRef = document.getElementById("inProgressContainerID");
    const awaitFeedbackContainerRef = document.getElementById("awaitFeedbackContainerID");
    const doneContainerRef = document.getElementById("doneContainerID");
    const toDoTasks = await getToDoCards();
    const inProgressTasks = await getInProgressCards();
    const awaitFeedbackTasks = await getAwaitFeedbackCards();
    const doneTasks = await getDoneCards();
    getCardValues(toDoTasks, toDoContainerRef);
    getCardValues(inProgressTasks, inProgressContainerRef);
    getCardValues(awaitFeedbackTasks, awaitFeedbackContainerRef);
    getCardValues(doneTasks, doneContainerRef);
}


/**
 * Extracts the relevant values from a task list and renders the matching card content
 * into the provided container.
 *
 * @param {Array<[string, object]>} tasks - The list of task entries to render.
 * @param {HTMLElement} containerRef - The board column container that receives the card content.
 */
function getCardValues(tasks, containerRef){
    containerRef.innerHTML = "";
    checkIfTaskContainerIsEmptyAndAddPlaceholder(tasks, containerRef);
    for (let index = 0; index < tasks.length; index++) {
        const taskID = tasks[index][0];
        const title = tasks[index][1].title;
        const description = tasks[index][1].description;
        const category = tasks[index][1].category;
        const date = tasks[index][1].date;
        const priority = tasks[index][1].priority;  
        const contacts = tasks[index][1].contacts || [];
        const subtasks = tasks[index][1].subtasks || [];
        containerRef.innerHTML +=   getCardTemplate(taskID, title, description, category, date, priority)
                                        getImgByPriority(priority, taskID);
                                        getHeadlineCardColor(category, taskID);
                                        getLetterBalls(contacts, taskID);
                                        showSubtaskProgress(subtasks, taskID);
                                        getContactsContainerFromTaskByID(taskID);
    }
}


/**
 * Checks whether a task container is empty and shows a placeholder message if no tasks exist.
 *
 * @param {Array<[string, object]>} tasks - The list of task entries for the current column.
 * @param {HTMLElement} containerRef - The board column container to update.
 */
function checkIfTaskContainerIsEmptyAndAddPlaceholder(tasks, containerRef){
    if(tasks.length === 0){
            containerRef.innerHTML = `<div class="no-task-to-do"> No Task To do</div>`
    };
}


/**
 * Filters all tasks by the current search input and re-renders the board columns
 * with the matching results.
 *
 * @returns {Promise<void>} A promise that resolves when the filtered task cards have been rendered.
 */
async function searchCards() {
    const searchBarRef = document.getElementById("searchBarID");
    const searchValue = searchBarRef.value.trim().toLowerCase();
    renderAllCardIfSearchbarIsEmpty(searchValue);
    const toDoContainerRef = document.getElementById("toDoContainerID");
    const inProgressContainerRef = document.getElementById("inProgressContainerID");
    const awaitFeedbackContainerRef = document.getElementById("awaitFeedbackContainerID");
    const doneContainerRef = document.getElementById("doneContainerID");
    const allTasks = await getTaskEntriesFromDataBase();
    const filteredTasks = filterTasksBySearchValue(allTasks, searchValue);
    const toDoTasks = filteredTasks.filter(([, task]) => task.status === "todo");
    const inProgressTasks = filteredTasks.filter(([, task]) => task.status === "inProgress");
    const awaitFeedbackTasks = filteredTasks.filter(([, task]) => task.status === "awaitFeedback");
    const doneTasks = filteredTasks.filter(([, task]) => task.status === "done");
    getCardValues(toDoTasks, toDoContainerRef);
    getCardValues(inProgressTasks, inProgressContainerRef);
    getCardValues(awaitFeedbackTasks, awaitFeedbackContainerRef);
    getCardValues(doneTasks, doneContainerRef);
}


/**
 * Filters tasks by title, description, or category using the current search value.
 *
 * @param {Array<[string, object]>} tasks - The full list of task entries.
 * @param {string} searchValue - The normalized search term entered by the user.
 * @returns {Array<[string, object]>} The filtered list of matching task entries.
 */
function filterTasksBySearchValue(tasks, searchValue) {
    return tasks.filter(([, task]) => {
        const title = (task.title || "").toLowerCase();
        const description = (task.description || "").toLowerCase();
        const category = (task.category || "").toLowerCase();
        return title.includes(searchValue) ||
               description.includes(searchValue) ||
               category.includes(searchValue);
    });
}


/**
 * Renders all board cards again if the search input is empty.
 *
 * @param {string} searchValue - The normalized search term entered by the user.
 */
function renderAllCardIfSearchbarIsEmpty(searchValue){
    if (searchValue === "") {
        renderAllCards();
        return;
    }
    return;
}
