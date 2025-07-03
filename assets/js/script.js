
    //submit button within the task form
const buttonEl = document.querySelector("#save-task");
    //tasks to do ul
const tasksToDoEl = document.querySelector("#tasks-to-do");
    //form 
const formEl = document.querySelector("#task-form");
    //main element
const pageContentEl = document.querySelector("#page-content");

const tasksInProgressEl = document.querySelector("#tasks-in-progress");

const tasksCompletedEl = document.querySelector("#tasks-completed");

let taskIdCounter = 0;
let tasks = [];

    // event handler when the user submits
const taskFormHandler = function(e){

        //  prevent the default response by the browser to refresh the page
    e.preventDefault();
        // targeting the input element with the name attribute of task-name and getting its value
    const taskNameInput = document.querySelector("input[name='task-name']").value;

        // targeting the select element with the name attribute of task-type and getting its value
    const taskTypeInput = document.querySelector("select[name='task-type']").value;
        
        //check to see if the inputs have a value by checking for truthy
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    
    formEl.reset();

    let isEdit = formEl.hasAttribute("data-task-id");

    if(isEdit){
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else{
            // package up data as an object
        const taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

            //send the obj as an argument to createTaskEl function
        createTaskEl(taskDataObj);
    }
}

const createTaskEl = function(taskDataObj){
    console.log(taskDataObj);
    console.log(taskDataObj.status);
            // creating an li element that will be used to create a list item
    const listItemEl = document.createElement("li");

        // setting the class name of the li element we created with "task-item"
    listItemEl.className = "task-item";

        // add task id as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

            //create div to hold task info and add to list item
    const taskInfoEl = document.createElement("div");

        // give it a class
    taskInfoEl.className = "task-info";

        //add HTML content to div
    taskInfoEl.innerHTML = `<h3 class='task-name'> ${taskDataObj.name} </h3>
                            <span class='task-type'>${taskDataObj.type}</span>`;

        //append the div we created to the li we created
    listItemEl.appendChild(taskInfoEl);

    const taskActionsEl = createTaskActions(taskIdCounter, taskDataObj.status);
    listItemEl.appendChild(taskActionsEl);

    const statusValue = taskDataObj.status;
        if(statusValue === "to do"){
            tasksToDoEl.appendChild(listItemEl);
        }else if(statusValue === "in progress"){
            tasksInProgressEl.appendChild(listItemEl);
        }else if(statusValue === "completed"){
            tasksCompletedEl.appendChild(listItemEl);
        }

        //setting the id key equal to the current counter
    taskDataObj.id = taskIdCounter;
        //using the push method to add the object to the array
    tasks.push(taskDataObj);

    saveTasks();

        // increase task counter for next unique id
    taskIdCounter++;

}

const createTaskActions = function(taskId, taskStatus){
        //create div element for our task actions
    const actionContainerEl = document.createElement("div");
        //give it a class name
    actionContainerEl.className = "task-actions";
        //create the edit button
    const editButtonEl = document.createElement("button");
        //set textcontent to edit
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    const statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    const statusChoices = ["To Do", "In Progress", "Completed"];
    for(let i = 0; i < statusChoices.length; i++){
            // create option element
        const statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
            
            // Set selected option based on task status
        if (statusChoices[i].toLowerCase() === taskStatus.toLowerCase()) {
            statusOptionEl.setAttribute("selected", "selected");
        }
            //append the select
        statusSelectEl.appendChild(statusOptionEl);
    }
    
    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
};

const completeEditTask = function(taskName, taskType, taskId){
        //find matching task list items
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

        //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    saveTasks();
        //remove data task id attribute so new task can be crearted
    formEl.removeAttribute("data-task-id");
        //set back to add task so user knows new task can be added
    document.querySelector("#save-task").textContent = "Add Task";
    alert("Task Updated");

}

const deleteTask = function(taskId){
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
        //using the remove method from the DOM it will remove the task item from the page
    taskSelected.remove();

    let updatedTaskArr = [];

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;

    saveTasks();
}

const editTask = function(taskId){
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    let taskName = taskSelected.querySelector(`h3.task-name`).textContent;
    let taskType = taskSelected.querySelector(`span.task-type`).textContent;

    document.querySelector(`input[name='task-name']`).value = taskName;
    document.querySelector(`select[name='task-type']`).value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId); 
}

const taskStatusChangeHandler = function(event){
        //get the task item's id
    const taskId = event.target.getAttribute("data-task-id");
        //get the currently selected option's value and convert to lowercase
    const statusValue = event.target.value.toLowerCase();
        //find the parent task item element based on id
    const taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }

        saveTasks();
}

const taskButtonHandler = function(event){

    if(event.target.matches(".edit-btn")){
        let taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }else if(event.target.matches(".delete-btn")){

        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

const saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadTasks = function(){
    // get tasks from local storage
    let savedTasks = localStorage.getItem("tasks");
    if(!savedTasks){
        return false;
    }
    //convert tasks from the string format back to an array of objects
        savedTasks = JSON.parse(savedTasks);
            console.log(savedTasks);
    for(let i = 0; i < savedTasks.length; i++){
            //pass each task object into the 'createTaskEl()' function
        createTaskEl(savedTasks[i]);
    }
}

    //event listener to listen for the submit
formEl.addEventListener("submit", taskFormHandler);
    //event listener to listen for clicks within main
pageContentEl.addEventListener("click", taskButtonHandler);
    //event listener to listen for changes 
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();
