/**
 * Loads all tasks with the status "todo".
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all todo task entries.
 */
async function getToDoCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "todo");

    return cardsArray; 
}


/**
 * Loads all tasks with the status "inProgress".
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all in-progress task entries.
 */
async function getInProgressCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "inProgress");

    return cardsArray; 
}


/**
 * Loads all tasks with the status "awaitFeedback".
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all awaiting-feedback task entries.
 */
async function getAwaitFeedbackCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "awaitFeedback");

    return cardsArray; 
}


/**
 * Loads all tasks with the status "done".
 *
 * @returns {Promise<Array<[string, object]>>} A promise that resolves to all completed task entries.
 */
async function getDoneCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "done");
    
    return cardsArray; 
}


/**
 * Prepares the add-task window so that a new task is created
 * directly in the "in progress" column.
 */
function addTaskInInProgressContainer(){
    currentTaskStatus = "inProgress";
    showAddTaskWindow();
}


/**
 * Prepares the add-task window so that a new task is created
 * directly in the "awaiting feedback" column.
 */
function addTaskInAwaitFeedbackContainer(){
    currentTaskStatus = "awaitFeedback";
    showAddTaskWindow();
}