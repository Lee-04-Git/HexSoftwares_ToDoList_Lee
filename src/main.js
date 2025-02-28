// Select and store all necessary DOM elements
const elements = {
  addNewTaskBtn: document.getElementById("add-task-btn"),
  newTaskModal: document.getElementById("task-modal"),
  cancelTaskBtn: document.getElementById("cancel-task-btn"),
  taskForm: document.getElementById("task-form"),
  taskTitle: document.getElementById("task-title"),
  taskList: document.getElementById("task-list"),
  taskStatus: document.getElementById("task-status"),
  editTaskModal: document.getElementById("edit-task-modal"),
  editTaskForm: document.getElementById("edit-task-form"),
  editTaskTitle: document.getElementById("edit-task-title"),
  editTaskStatus: document.getElementById("edit-task-status"),
  deleteTaskBtn: document.getElementById("delete-task-btn"),
  cancelEditTaskBtn: document.getElementById("cancel-edit-task-btn"),
  filterDropdown: document.getElementById("task-progress"),
};

// Load tasks from local storage or initialize an empty array
let tasksState = JSON.parse(localStorage.getItem("tasks")) || [];
let lastAddedTaskId = null;
let isDeletingTask = false;

// Persist tasks in local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksState));
};

// Show or hide a modal with a fade-in effect
const toggleModal = (modal, show) => {
  modal.style.display = show ? "flex" : "none";
  if (show) {
    modal.classList.add("quick-fade-in");
    setTimeout(() => modal.classList.remove("quick-fade-in"), 200);
  }
};

// Render tasks based on the selected filter
const renderTasks = () => {
  elements.taskList.innerHTML = "";
  const selectedStatus = elements.filterDropdown.value.toLowerCase();

  tasksState.forEach((task) => {
    if (
      selectedStatus === "all" ||
      selectedStatus === "filter by task status" ||
      task.status.toLowerCase() === selectedStatus
    ) {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task");
      taskCard.dataset.id = task.id;
      taskCard.dataset.status = task.status;
      taskCard.innerHTML = `<h3>${task.title}</h3>`;
      taskCard.addEventListener("click", () => openEditModal(task));
      elements.taskList.appendChild(taskCard);

      taskCard.classList.add("quick-fade-in");
      setTimeout(() => taskCard.classList.remove("quick-fade-in"), 200);
    }
  });
};

// Add a new task and update the UI
const addTask = (title, status) => {
  tasksState.push({ id: Date.now(), title, status });
  lastAddedTaskId = tasksState[tasksState.length - 1].id;
  saveTasksToLocalStorage();
  renderTasks();
};

// Open the "Add Task" modal and handle form submission
const openTaskModal = () => {
  elements.taskTitle.value = "";
  elements.taskStatus.value = "To-Do";
  toggleModal(elements.newTaskModal, true);

  elements.taskForm.onsubmit = (e) => {
    e.preventDefault();
    if (elements.taskTitle.value.trim()) {
      addTask(elements.taskTitle.value.trim(), elements.taskStatus.value);
      toggleModal(elements.newTaskModal, false);
    }
  };
};

// Open the "Edit Task" modal and set up event handlers
const openEditModal = (task) => {
  elements.editTaskTitle.value = task.title;
  elements.editTaskStatus.value = task.status;
  toggleModal(elements.editTaskModal, true);

  elements.editTaskForm.onsubmit = (e) => {
    e.preventDefault();
    saveTask(task);
  };
  elements.deleteTaskBtn.onclick = () => deleteTask(task.id);
  elements.cancelEditTaskBtn.onclick = () =>
    toggleModal(elements.editTaskModal, false);
};

// Update task details and re-render the task list
const saveTask = (task) => {
  if (elements.editTaskTitle.value.trim()) {
    task.title = elements.editTaskTitle.value.trim();
    task.status = elements.editTaskStatus.value;
    saveTasksToLocalStorage();
    renderTasks();
  }
  toggleModal(elements.editTaskModal, false);
};

// Remove a task and update the UI
const deleteTask = (taskId) => {
  isDeletingTask = true;
  tasksState = tasksState.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  renderTasks();
  toggleModal(elements.editTaskModal, false);
};

// Initialize tasks and restore filter selection on page load
window.onload = () => {
  elements.filterDropdown.value =
    localStorage.getItem("selectedTaskStatus") || "To-Do";
  renderTasks();
};

// Update the task list when the filter changes
elements.filterDropdown.addEventListener("change", () => {
  localStorage.setItem("selectedTaskStatus", elements.filterDropdown.value);
  renderTasks();
});

// Attach event listeners for opening and closing modals
elements.addNewTaskBtn.addEventListener("click", openTaskModal);
elements.cancelTaskBtn.addEventListener("click", () =>
  toggleModal(elements.newTaskModal, false)
);
