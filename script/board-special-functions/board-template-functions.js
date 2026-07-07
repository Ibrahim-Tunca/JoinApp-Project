function subtaskProgressbarTemplate(finishedSubTasks, subtasks){
    return  `
                <progress class="progress-bar-style-board" value="${finishedSubTasks}" max="${subtasks.length}"></progress>
                <span >${finishedSubTasks}/${subtasks.length} Subtasks</span>
            `
}


function getSubtaskTemplate(subtaskID, subtaskValue, id){
    return  `
                <div class="subtask-single-container-userstory">
                    <span onclick="subTaskDone(${subtaskID}, '${id}')" class="subtask-checkbox-cardDetail" id="subTaskNr${subtaskID}"></span>
                    <span class="regular-span-font-userstory">${subtaskValue}</span>
                </div>
            `
}


function getContactTemplate(color, initials, name){
    return `
                <div class="assigned-to-single-container">
                    <div class="letter-ball-userstory ${color}"">
                        ${initials}
                    </div>
                    <span>
                        ${name}
                    </span>
                </div>
            `;
}


function getCardTemplate(id, title, description, category, date, priority){
    return  `
                <div id="boardCardNR${id}" draggable="true" ondragstart="moveTask('${id}'),  customDragImage(event, this)" class="filled-card-board" onclick="showCardDetail('${id}', '${title}', '${description}', '${category}', '${date}', '${priority}')">
                
                    <div class="headline-card-container-board">

                        <span class="headline-card-board" id="categoryNr${id}">${category}</span>

                        <div class="card-menu-wrapper">
                            <button
                                class="swap-button-board"
                                onclick="openPopupMenu(event, '${id}')"
                            >
                                <img class="swap-icon-board" src="./img/swap_horiz.svg" alt="Move task">
                            </button>

                            <div class="popUpMenue-moveto d_none" id="popupMenuNR${id}">
                                <div class="swap-button-order-board">
                                    <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'todo')">To Do</span>
                                    <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'inProgress')">In Progress</span>
                                    <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'awaitFeedback')">Await Feed</span>
                                    <span class="moveto-span-tag" onclick="moveTaskFromMenu(event, '${id}', 'done')">Done</span>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                    <span class="headline-font-task-card">
                        ${title}
                    </span>

                    <span class="description-font-card">
                        ${description}
                    </span>

                    <div class="progress-container-card" id="subTaskContainerNr${id}">
                                                    
                    </div>

                    <div class="letter-ball-and-priority-container">
                        <div class="letter-ball-container" id="letterBallContainerNr${id}">
                                                        
                        </div>
                        <div id="remainingContactballContainerNr${id}">
                        
                        </div>
                        <div id="priorityNr${id}">

                        </div>
                    </div>

                </div>
            `
}


function getCardDetailTemplate(){
    return  `
                <cardDetail class="main-container-userstory" id="cardDetailContainerID">

                        <div style="display: flex; justify-content: space-between;">
                            <span class="userstory-category-tag" id="cardDetailCategoryID">User Story</span>
                            <img 
                                    class="close-button-userstory" 
                                    src="./img/close-blue.svg"
                                    onclick="hideCardDetailWindow()"
                                    onmouseenter="this.src='./img/close-deep-blue.svg'"
                                    onmouseleave="this.src='./img/close-blue.svg'"
                            >
                        </div>

                            <div class="scroll-container-userstory">

                                <h1 class="h1-font-userstory" id="cardDetailTitleID">Kochwelt Page & Recipe Recommander</h1>

                                <span class="regular-span-font-userstory" id="cardDetailDescriptionID">Build start page with recipe recommendation.</span>

                                <date style=" display: flex;">
                                    <span class="bold-span-font-userstory bold-span-font-space-userstory">Due Date:</span>
                                    <span class="regular-span-font-userstory" id="cardDetailDateID">29.02.1988</span>
                                </date>

                                <priotity style=" display: flex;">
                                    <span class="bold-span-font-userstory bold-span-font-space-userstory">Priority:</span>
                                    <div id="cardDetailPriorityID">

                                    </div>
                                </priotity>

                                <assignedTo style="display: flex; flex-direction: column;">
                                    <span class="bold-span-font-userstory bold-span-font-space-userstory">Assigned To:</span>
                                    <div class="assigned-to-content-order" id="cardDetailContactContainerID">

                                    </div>
                                </assignedTo>

                                <subtasks>
                                    <span class="bold-span-font-userstory bold-span-font-space-userstory">Subtaks:</span>
                                    <div class="subtasks-single-container-userstory" id="cardDetailSubtaskContainerID">
                                        
                                    </div>
                                    
                                </subtasks>

                            </div>

                        <edit-delete class="edit-delete-container-userstory">

                            <div 
                                onclick="deleteTask()" 
                                class="delete-single-container-userstory" 
                                onmouseenter="this.querySelector('.delete-icon-userstory').src='./img/userstory/delete-blue.svg'"
                                onmouseleave="this.querySelector('.delete-icon-userstory').src='./img/trashcan.svg'" 
                            >
                                <img class="delete-icon-userstory" src="./img/trashcan.svg">
                                <span class="edit-delete-font-userstory">Delete</span>
                            </div>
                            <separator class="edit-delete-separator-userstory"></separator>
                            <div 
                                onclick="editCardDetail()" 
                                class="edit-single-container-userstory"
                                onmouseenter="this.querySelector('.edit-icon-userstory').src='./img/userstory/edit-blue.svg'"
                                onmouseleave="this.querySelector('.edit-icon-userstory').src='./img/userstory/edit.svg'" 
                            >
                                <img class="edit-icon-userstory" 
                                src="./img/pencil.svg">
                                <span class="edit-delete-font-userstory">Edit</span>
                            </div>

                        </edit-delete>
                
                </cardDetail>
            `
}


function getCardDetailEditTemplate(title, description, date, category){
    return  `
                    <div class="close-button-carddetail-edit">
                            <img 
                                onclick="hideCardDetailWindow()" 
                                class="close-button" 
                                src="./img/close-blue.svg"
                                onmouseenter="this.src='./img/close-deep-blue.svg'"
                                onmouseleave="this.src='./img/close-blue.svg'"
                            >
                    </div>

                    <form onsubmit="updateTask(event)" name="addTaskForm" class="addTask-cardDetailContainer-board" id="addTaskForm">

                        

                        <input name="addTaskTitle" class="input-title-carddetail-edit" type="text" value="${title}" id="titleID">

                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Description</span>
                        </div>
                        <textarea class="textarea-description-addtask" name="addTaskDescription" placeholder="Enter a Description">${description}</textarea>
                        


                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Due date</span>
                        </div>
                        <input class="input-date-addTask" type="date" name="addTaskDate" placeholder="tt/mm/jjjj" value="${date}" id="dateID">
                        <span id="dateFontID">This field is required</span>


                        <priority class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Priority</span>
                            <div class="prio-buttons-order-addTask margin-top-add-task" id="prioID">
                                <button onclick="setPrioToUrgent()" type="button" class="prio-buttons-addTask high-prio-button-addTask" id="urgentPrioID">Urgent<img class="prio-icons-addTask" src="./img/addTask/prio-high.svg" id="urgentPrioIMGID"></button>
                                <button onclick="setPrioToMedium()" type="button" class="prio-buttons-addTask mid-prio-button-addTask" id="mediumPrioID">Medium<img class="prio-icons-addTask" src="./img/addTask/prio-medium.svg" id="midPrioIMGID"></button>
                                <button onclick="setPrioToLow()" type="button" class="prio-buttons-addTask low-prio-button-addTask" id="lowPrioID">Low<img class="prio-icons-addTask" src="./img/addTask/prio-low.svg" id="lowPrioIMGID"></button>
                            </div>
                        </priority>





                        <assignedTo class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Assigned to</span>
                        </assignedTo>



                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select contacts to assign">
                            <input type="hidden" name="contacts" value="">
                            
                            <button type="button" class="custom-select-toggle-addTask">
                                <span class="custom-select-label-addTask">Select contacts to assign</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none" id="contactSelectionID">
                            </div>
                        </div>

                        <div class="contact-inital-ball-container-under-contact-option" id="initialBallContainerID"></div>


                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select task category" id="categoryID">
                            <input type="hidden" value="${category}" name="taskCategory">
                            
                            <button type="button" class="custom-select-toggle-addTask underline-color-select-category">
                                <span class="custom-select-label-addTask">Select task category</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none">
                                <button type="button" class="custom-select-option-addTask" data-value="Technical Task">Technical Task</button>
                                <button type="button" class="custom-select-option-addTask" data-value="User Story">User Story</button>
                            </div>
                        </div>

                            


                        <subtask class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Subtask</span>
                            
                        </subtask>

                        <div class="wrapper-div-container margin-top-add-task margin-bottom-add-task">
                            <input onkeyup="showButtons()" name="subtaskform" class="input-subtask-addTask" type="text" placeholder="add new subtask" id="subtaskValueID">
                            
                            <div class="cancel-and-confirm-container d_none" id="subtasksInputfieldButtonContainerID">
                                    <img onclick="deleteInputValueSubtask()" class="cancel-icon" src="./img/addTask/cancel.svg">
                                    <span class="cancel-and-confirm-separator"></span>
                                    <img onclick="pasteSubtaskUnderInputfield()" class="confirm-icon" src="./img/addTask/confirm.svg">
                            </div>
                        </div>

                        <div class="subtask-container-window" id="createdSubtasksContainerID"></div>


                        


                    </form>

                    <div class="ok-button-container-carddetail-edit">
                            <button type="submit" form="addTaskForm" class="button-blue-addtask" style="padding: 0 5px">
                                Ok
                                <img class="affirmative-icon-addtask" src="./img/addTask/check.svg" alt="">
                            </button>
                    </div>
            `
}


function getAddTaskFormTemplate(){
    return  `
                    <form onsubmit="validateAddTaskForm(event)" name="addTaskForm" class="addTask-maincontainer-board slide-addTask-window-board" id="addTaskForm">

                        <div class="topic-and-close-button-container">
                            <img 
                                onclick="hideAddTaskWindow()" 
                                class="close-button" 
                                src="./img/close-blue.svg"
                                onmouseenter="this.src='./img/close-deep-blue.svg'"
                                onmouseleave="this.src='./img/close-blue.svg'"
                            >
                            <h1 class="h1-font">Add Task</h1>
                        </div>

                        <input name="addTaskTitle" class="input-title-addTask" type="text" placeholder="Enter a title" id="titleID">
                        <span id="titleFontID">This field is required</span>

                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Description</span><span class="font-normal-add-task"> (optional)</span>
                        </div>
                        <textarea class="textarea-description-addtask" name="addTaskDescription" placeholder="Enter a Description"></textarea>
                        


                        <div class="margin-top-add-task">
                            <span class="font-bold-add-task">Due date</span>
                        </div>
                        <input class="input-date-addTask" type="date" name="addTaskDate" placeholder="tt/mm/jjjj" id="dateID">
                        <span id="dateFontID">This field is required</span>


                        <priority class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Priority</span>
                            <div class="prio-buttons-order-addTask margin-top-add-task" id="prioID">
                                <button onclick="setPrioToUrgent()" type="button" class="prio-buttons-addTask high-prio-button-addTask" id="urgentPrioID">Urgent<img class="prio-icons-addTask" src="./img/addTask/prio-high.svg" id="urgentPrioIMGID"></button>
                                <button onclick="setPrioToMedium()" type="button" class="prio-buttons-addTask mid-prio-button-addTask" id="mediumPrioID">Medium<img class="prio-icons-addTask" src="./img/addTask/prio-medium.svg" id="midPrioIMGID"></button>
                                <button onclick="setPrioToLow()" type="button" class="prio-buttons-addTask low-prio-button-addTask" id="lowPrioID">Low<img class="prio-icons-addTask" src="./img/addTask/prio-low.svg" id="lowPrioIMGID"></button>
                            </div>
                        </priority>





                        <assignedTo class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Assigned to</span><span class="font-normal-add-task"> (optional)</span>
                        </assignedTo>



                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select contacts to assign">
                            <input type="hidden" name="contacts" value="">
                            
                            <button type="button" class="custom-select-toggle-addTask">
                                <span class="custom-select-label-addTask">Select contacts to assign</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none" id="contactSelectionID">
                            </div>
                        </div>

                        <div class="contact-inital-ball-container-under-contact-option" id="initialBallContainerID"></div>


                        <div class="custom-select-addTask margin-top-add-task" data-placeholder="Select task category" id="categoryID">
                            <input type="hidden" name="taskCategory">
                            
                            <button type="button" class="custom-select-toggle-addTask underline-color-select-category">
                                <span class="custom-select-label-addTask">Select task category</span>
                                <span class="custom-select-arrow-wrap-addTask">
                                    <img class="custom-select-arrow-addTask" src="./img/addTask/arrow_drop_down.svg" alt="">
                                </span>
                            </button>

                            <div class="custom-select-menu-addTask d_none">
                                <button type="button" class="custom-select-option-addTask" data-value="Technical Task">Technical Task</button>
                                <button type="button" class="custom-select-option-addTask" data-value="User Story">User Story</button>
                            </div>
                        </div>

                            


                        <subtask class="margin-top-bigger-add-task">
                            <span class="font-bold-add-task">Subtask</span><span class="font-normal-add-task"> (optional)</span>
                            
                        </subtask>

                        <div class="wrapper-div-container margin-top-add-task margin-bottom-add-task">
                            <input onkeyup="showButtons()" name="subtaskform" class="input-subtask-addTask" type="text" placeholder="add new subtask" id="subtaskValueID">
                            
                            <div class="cancel-and-confirm-container d_none" id="subtasksInputfieldButtonContainerID">
                                    <img onclick="deleteInputValueSubtask()" class="cancel-icon" src="./img/addTask/cancel.svg">
                                    <span class="cancel-and-confirm-separator"></span>
                                    <img onclick="pasteSubtaskUnderInputfield()" class="confirm-icon" src="./img/addTask/confirm.svg">
                            </div>
                        </div>

                        <div class="subtask-container-window" id="createdSubtasksContainerID"></div>


                        <div class="button-order-addtask-window">
                            <button type="submit" form="addTaskForm" class="button-blue-addtask">
                                Create Task
                                <img class="affirmative-icon-addtask" src="./img/addTask/check.svg" alt="">
                            </button>
                        </div>


                    </form>
            `
}

