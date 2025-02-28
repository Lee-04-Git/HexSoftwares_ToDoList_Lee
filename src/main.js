const elements = {
  addNewTaskBtn: document.getElementById("add-task-btn"),
  newTaskModal: document.getElementById("task-modal"),
  cancelTaskBtn: document.getElementById("cancel-task-btn"),
  taskForm: document.getElementById("task-form"),
  taskTitle: document.getElementById("task-title"),
  taskList: document.getElementById("task-list"),
  taskStatus: document.getElementById("task-status"),

  // Edit task modal elements
  editTaskModal: document.getElementById("edit-task-modal"),
  editTaskForm: document.getElementById("edit-task-form"),
  editTaskTitle: document.getElementById("edit-task-title"),
  editTaskStatus: document.getElementById("edit-task-status"),
  deleteTaskBtn: document.getElementById("delete-task-btn"),
  cancelEditTaskBtn: document.getElementById("cancel-edit-task-btn"),

  // Dropdown for filtering tasks
  filterDropdown: document.getElementById("task-progress"),
};

// Keeps track of tasks
let tasksState = JSON.parse(localStorage.getItem("tasks")) || [];
let lastAddedTaskId = null;
let isDeletingTask = false; // Prevents animations when deleting

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksState));
}

// Show or hide a modal with a quick fade effect
function toggleModal(modal, show) {
  if (show) {
    modal.style.display = "flex";
    modal.classList.add("quick-fade-in");

    setTimeout(() => {
      modal.classList.remove("quick-fade-in");
    }, 200);
  } else {
    modal.style.display = "none";
  }
}

// Display tasks on the page based on the selected filter
function renderTasks() {
  const selectedStatus = elements.filterDropdown.value.toLowerCase();
  elements.taskList.innerHTML = ""; // Clear existing tasks

  tasksState.forEach((task) => {
    if (
      selectedStatus === "all" ||
      selectedStatus === "filter by task status" ||
      task.status.toLowerCase() === selectedStatus
    ) {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task");
      taskCard.setAttribute("data-id", task.id);
      taskCard.setAttribute("data-status", task.status);
      taskCard.innerHTML = `<h3>${task.title}</h3>`;

      taskCard.addEventListener("click", () => openEditModal(task));
      elements.taskList.appendChild(taskCard);

      taskCard.classList.add("quick-fade-in");
      setTimeout(() => {
        taskCard.classList.remove("quick-fade-in");
      }, 200);
    }
  });
}

// Add a new task
function addTask(taskTitle, taskStatus) {
  const task = { id: Date.now(), title: taskTitle, status: taskStatus };
  tasksState.push(task);
  lastAddedTaskId = task.id;
  saveTasksToLocalStorage(); // Save to local storage
  renderTasks();
}

// Open the modal for adding a new task
function openTaskModal() {
  elements.taskTitle.value = "";
  elements.taskStatus.value = "To-Do";
  toggleModal(elements.newTaskModal, true);

  elements.taskForm.onsubmit = (event) => {
    event.preventDefault();
    const taskTitleValue = elements.taskTitle.value.trim();
    const taskStatusValue = elements.taskStatus.value;

    if (taskTitleValue) {
      addTask(taskTitleValue, taskStatusValue);
      toggleModal(elements.newTaskModal, false);
    }
  };
}

// Open the modal for editing a task
function openEditModal(task) {
  elements.editTaskTitle.value = task.title;
  elements.editTaskStatus.value = task.status;

  toggleModal(elements.editTaskModal, true);

  elements.editTaskForm.onsubmit = (event) => {
    event.preventDefault();
    saveTask(task);
  };

  elements.deleteTaskBtn.onclick = () => deleteTask(task.id);
  elements.cancelEditTaskBtn.onclick = () =>
    toggleModal(elements.editTaskModal, false);
}

// Save updates to an existing task
function saveTask(task) {
  const updatedTitle = elements.editTaskTitle.value.trim();
  const updatedStatus = elements.editTaskStatus.value;

  if (updatedTitle) {
    task.title = updatedTitle;
    task.status = updatedStatus;
    saveTasksToLocalStorage(); // Save changes
    renderTasks();
  }

  toggleModal(elements.editTaskModal, false);
}

// Remove a task
function deleteTask(taskId) {
  isDeletingTask = true;
  tasksState = tasksState.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(); // Update local storage
  renderTasks();
  toggleModal(elements.editTaskModal, false);
}

// Load tasks and saved dropdown filter status from local storage
window.onload = function () {
  // Retrieve saved filter status from localStorage or default to "To-Do"
  const savedStatus = localStorage.getItem("selectedTaskStatus") || "To-Do";
  elements.filterDropdown.value = savedStatus;
  renderTasks();
};

// Add event listener to save the selected status in local storage
elements.filterDropdown.addEventListener("change", () => {
  localStorage.setItem("selectedTaskStatus", elements.filterDropdown.value);
  renderTasks();
});

// Add event listeners
elements.addNewTaskBtn.addEventListener("click", openTaskModal);
elements.cancelTaskBtn.addEventListener("click", () =>
  toggleModal(elements.newTaskModal, false)
);
