//submit button within the task form
const buttonEl = document.querySelector("#save-task");
//tasks to do ul
const tasksToDoEl = document.querySelector("#tasks-to-do");
//form 
const formEl = document.querySelector("#task-form");

// event handler when the user submits
const createTaskHandler = function(e){

        //  prevent the default response by the browser to refresh the page
    e.preventDefault();

        // creating an li element that will be used to create a list item
    const listItemEl = document.createElement("li");

        // setting the class name of the li element we created with "task-item"
    listItemEl.className = "task-item";

        // targeting the input element with the name attribute of task-name and getting its value
    const taskNameInput = document.querySelector("input[name='task-name']").value;

        // targeting the select element with the name attribute of task-type and getting its value
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

        //create div to hold task info and add to list item
    const taskInfoEl = document.createElement("div");

        // give it a class
    taskInfoEl.className = "task-info";

        //add HTML content to div
    taskInfoEl.innerHTML = `<h3 class='task-name'> ${taskNameInput} </h3>
                            <span class='task-type'>${taskTypeInput}</span>`;

        //append the div we created to the li we created
    listItemEl.appendChild(taskInfoEl);

        // appending our li element we created and its content to the ul element
    tasksToDoEl.appendChild(listItemEl);
}

//event listener to listen for the submit
formEl.addEventListener("submit", createTaskHandler);
