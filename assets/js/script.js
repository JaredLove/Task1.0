//targeting the button element within the DOM
const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const formEl = document.querySelector("#task-form");

const createTaskHandler = function(e){
    e.preventDefault();
    const taskItemEl = document.createElement("li");
    const taskNameEl = document.querySelector("#task-name");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = taskItemEl.textContent;
    tasksToDoEl.appendChild(taskItemEl);
}

formEl.addEventListener("submit", createTaskHandler);
