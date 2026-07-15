let currentDraggedTaskID;

let currentClickedTaskID;


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


function getCardValues(tasks, containerRef){
    containerRef.innerHTML = "";

    if(tasks.length === 0){
            containerRef.innerHTML = `<div class="no-task-to-do"> No Task To do</div>`
        };

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


async function searchCards() {
    const searchBarRef = document.getElementById("searchBarID");
    const searchValue = searchBarRef.value.trim().toLowerCase();

    if (searchValue === "") {
        renderAllCards();
        return;
    }

    const toDoContainerRef = document.getElementById("toDoContainerID");
    const inProgressContainerRef = document.getElementById("inProgressContainerID");
    const awaitFeedbackContainerRef = document.getElementById("awaitFeedbackContainerID");
    const doneContainerRef = document.getElementById("doneContainerID");

    const allTasks = await getTaskEntriesFromDataBase();

    const filteredTasks = allTasks.filter(([, task]) => {
        const title = (task.title || "").toLowerCase();
        const description = (task.description || "").toLowerCase();
        const category = (task.category || "").toLowerCase();

        return title.includes(searchValue) ||
               description.includes(searchValue) ||
               category.includes(searchValue);
    });

    const toDoTasks = filteredTasks.filter(([, task]) => task.status === "todo");
    const inProgressTasks = filteredTasks.filter(([, task]) => task.status === "inProgress");
    const awaitFeedbackTasks = filteredTasks.filter(([, task]) => task.status === "awaitFeedback");
    const doneTasks = filteredTasks.filter(([, task]) => task.status === "done");

    getCardValues(toDoTasks, toDoContainerRef);
    getCardValues(inProgressTasks, inProgressContainerRef);
    getCardValues(awaitFeedbackTasks, awaitFeedbackContainerRef);
    getCardValues(doneTasks, doneContainerRef);
}
