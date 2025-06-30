//targeting the button element within the DOM
const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = function(){
    const taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);