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
let tasksState = [];
let lastAddedTaskId = null;
let isDeletingTask = false; // Prevents animations when deleting

// Show or hide a modal with a quick fade effect
function toggleModal(modal, show) {
  if (show) {
    modal.style.display = "flex";
    modal.classList.add("quick-fade-in");

    setTimeout(() => {
      modal.classList.remove("quick-fade-in");
    }, 200); // Matches the task animation timing
  } else {
    modal.style.display = "none";
  }
}

// Display tasks on the page based on the selected filter
function renderTasks() {
  const selectedStatus = elements.filterDropdown.value.toLowerCase();

  elements.taskList.innerHTML = ""; // Clear existing tasks

  tasksState.forEach((task) => {
    // Show all tasks if "All" is selected or if they match the filter
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

      // Add fade-in effect when a new task appears
      taskCard.classList.add("quick-fade-in");
      setTimeout(() => {
        taskCard.classList.remove("quick-fade-in");
      }, 200);
    }
  });
}

// Add a new task to the task list
function addTask(taskTitle, taskStatus) {
  const task = { id: Date.now(), title: taskTitle, status: taskStatus };
  tasksState.push(task);
  lastAddedTaskId = task.id;
  renderTasks();
}

// Open the modal for adding a new task
function openTaskModal() {
  elements.taskTitle.value = "";
  elements.taskStatus.value = "To-Do"; // Reset dropdown to default
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
    renderTasks();
  }

  toggleModal(elements.editTaskModal, false);
}

// Remove a task from the list
function deleteTask(taskId) {
  isDeletingTask = true; // Prevents animations while deleting
  tasksState = tasksState.filter((task) => task.id !== taskId);
  renderTasks();
  toggleModal(elements.editTaskModal, false);
}

// Set the filter dropdown to "To-Do" by default when the page loads
window.onload = function () {
  elements.filterDropdown.value = "To-Do";
  renderTasks();
};

// Add event listeners for UI actions
elements.addNewTaskBtn.addEventListener("click", openTaskModal);
elements.cancelTaskBtn.addEventListener("click", () =>
  toggleModal(elements.newTaskModal, false)
);
elements.filterDropdown.addEventListener("change", renderTasks);
