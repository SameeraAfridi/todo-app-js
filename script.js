"use strict"; // Enforces stricter rules to help avoid errors

/* =======================
   VARIABLES & SELECTORS
======================= */

// This will hold all tasks as objects in an array
// Example of one task: { id: 123456, text: "Buy milk", status: "todo" }
let tasks = [];

// Save our list elements in variables so we can use them later
const form = document.getElementById("task-form");       // The form where user adds a task
const input = document.getElementById("task-input");     // The text box
const msg = document.getElementById("form-msg");         // Small feedback message

// Lists for each category
const todoList = document.getElementById("todo-list");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

// Counters in headings
const todoCount = document.getElementById("todo-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

/* =======================
   LOCAL STORAGE HELPERS
======================= */

// Save tasks to localStorage (browser remembers even after refresh)
function saveTasks() {
  localStorage.setItem("three_list_tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
function loadTasks() {
  const stored = localStorage.getItem("three_list_tasks");
  if (stored) {
    tasks = JSON.parse(stored); // Convert back from JSON string to array
  }
}

/* =======================
   ADD NEW TASK
======================= */
function addTask(text) {
  const task = {
    id: Date.now(),       // unique id based on current time
    text: text.trim(),    // remove extra spaces
    status: "todo"        // default status
  };
  tasks.push(task);       // Add to our array
  saveTasks();            // Save in browser
  render();               // Show on screen
}

/* =======================
   CHANGE TASK STATUS
======================= */
function setTaskStatus(id, newStatus) {
  const task = tasks.find(t => t.id === id); // find task by id
  if (!task) return; // if not found, stop
  task.status = newStatus; // update status
  saveTasks();
  render();
}

/* =======================
   DELETE TASK
======================= */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id); // keep all except this one
  saveTasks();
  render();
}

/* =======================
   CREATE HTML FOR A TASK
======================= */
function createTaskElement(task) {
  const li = document.createElement("li"); // <li></li>
  li.textContent = task.text; // add task text

  // Create a container for buttons
  const actions = document.createElement("div");
  actions.className = "actions";

  // Depending on status, add different buttons
  if (task.status !== "todo") {
    const todoBtn = document.createElement("button");
    todoBtn.textContent = "To Do";
    todoBtn.className = "todo-btn";
    todoBtn.onclick = () => setTaskStatus(task.id, "todo");
    actions.appendChild(todoBtn);
  }

  if (task.status !== "pending") {
    const pendingBtn = document.createElement("button");
    pendingBtn.textContent = "Pending";
    pendingBtn.className = "pending-btn";
    pendingBtn.onclick = () => setTaskStatus(task.id, "pending");
    actions.appendChild(pendingBtn);
  }

  if (task.status !== "completed") {
    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.className = "completed-btn";
    completedBtn.onclick = () => setTaskStatus(task.id, "completed");
    actions.appendChild(completedBtn);
  }

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => deleteTask(task.id);
  actions.appendChild(deleteBtn);

  // Add actions to list item
  li.appendChild(actions);

  return li;
}

/* =======================
   RENDER FUNCTION
======================= */
function render() {
  // Clear existing list items
  todoList.innerHTML = "";
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  // Counters
  let todoCounter = 0;
  let pendingCounter = 0;
  let completedCounter = 0;

  // Loop through tasks and add to correct list
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);

    if (task.status === "todo") {
      todoList.appendChild(taskElement);
      todoCounter++;
    } else if (task.status === "pending") {
      pendingList.appendChild(taskElement);
      pendingCounter++;
    } else if (task.status === "completed") {
      completedList.appendChild(taskElement);
      completedCounter++;
    }
  });

  // Update counts
  todoCount.textContent = todoCounter;
  pendingCount.textContent = pendingCounter;
  completedCount.textContent = completedCounter;
}

/* =======================
   FORM SUBMIT HANDLER
======================= */
form.addEventListener("submit", e => {
  e.preventDefault(); // stop page from refreshing
  const text = input.value;

  if (text.trim() === "") {
    msg.textContent = "Please enter a task!";
    return;
  }

  addTask(text);
  input.value = ""; // clear input box
  msg.textContent = ""; // clear message
});

/* =======================
   START APP
======================= */
loadTasks(); // load saved tasks
render();    // show them on page