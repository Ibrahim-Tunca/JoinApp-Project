async function getToDoCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "todo");

    return cardsArray; 
}


async function getInProgressCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "inProgress");

    return cardsArray; 
}


async function getAwaitFeedbackCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "awaitFeedback");

    return cardsArray; 
}

async function getDoneCards(){
    const tasks = await getTaskEntriesFromDataBase();
    const cardsArray = tasks.filter(([, task]) => task.status === "done");

    return cardsArray; 
}