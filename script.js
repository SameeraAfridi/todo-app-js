console.log("To-Do List App Loaded");

// Get elements (matched with your HTML)
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Add button click event
addBtn.addEventListener("click", addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Add delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => li.remove();

    li.appendChild(delBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
}
