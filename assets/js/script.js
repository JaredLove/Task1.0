let taskIdCounter = 0;
//submit button within the task form
const buttonEl = document.querySelector("#save-task");
//tasks to do ul
const tasksToDoEl = document.querySelector("#tasks-to-do");
//form 
const formEl = document.querySelector("#task-form");

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

        // package up data as an object
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

        //send the obj as an argument to createTaskEl function
    createTaskEl(taskDataObj);
}

const createTaskEl = function(taskDataObj){

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

    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

        // appending our li element we created and its content to the ul element
    tasksToDoEl.appendChild(listItemEl);

        // increase task counter for next unique id
    taskIdCounter++;

}

const createTaskActions = function(taskId){
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

    const statusChoices = ["To Do", "In Progres", "Completed"];
    for(let i = 0; i < statusChoices.length; i++){
            // create option element
        const statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

            //append the select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

//event listener to listen for the submit
formEl.addEventListener("submit", taskFormHandler);
