export const getElements = () => ({
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
  loader: document.getElementById("loader"),
});

export let tasksState = JSON.parse(localStorage.getItem("tasks")) || [];

export const saveTasksToLocalStorage = () =>
  localStorage.setItem("tasks", JSON.stringify(tasksState));

export const toggleElement = (element, show) => {
  element.style.display = show ? "flex" : "none";
  if (show) {
    element.classList.add("quick-fade-in");
    setTimeout(() => element.classList.remove("quick-fade-in"), 150);
  }
};

export const renderTasks = (elements) => {
  toggleElement(elements.loader, true);
  setTimeout(() => {
    elements.taskList.innerHTML = "";
    const selectedStatus = elements.filterDropdown.value.toLowerCase();
    const filteredTasks = tasksState.filter(
      (task) =>
        selectedStatus === "all" ||
        selectedStatus === "filter by task status" ||
        task.status.toLowerCase() === selectedStatus
    );

    if (filteredTasks.length === 0) {
      const noTasksMessage = document.createElement("div");
      noTasksMessage.classList.add("no-tasks-message");
      noTasksMessage.textContent = "Add a task...";
      elements.taskList.appendChild(noTasksMessage);
    } else {
      filteredTasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task");
        taskCard.dataset.id = task.id;
        taskCard.dataset.status = task.status;
        taskCard.innerHTML = `<h3>${task.title}</h3>`;
        taskCard.addEventListener("click", () => openEditModal(task, elements));
        elements.taskList.appendChild(taskCard);
        taskCard.classList.add("quick-fade-in");
        setTimeout(() => taskCard.classList.remove("quick-fade-in"), 150);
      });
    }
    toggleElement(elements.loader, false);
  }, 300);
};

export const addTask = (title, status, elements) => {
  tasksState.push({ id: Date.now(), title, status });
  saveTasksToLocalStorage();
  renderTasks(elements);
};

export const openTaskModal = (elements) => {
  elements.taskTitle.value = "";
  elements.taskStatus.value = "To-Do";
  toggleElement(elements.newTaskModal, true);
  elements.cancelTaskBtn.addEventListener("click", () =>
    toggleElement(elements.newTaskModal, false)
  );
  elements.taskForm.onsubmit = (e) => {
    e.preventDefault();
    if (elements.taskTitle.value.trim()) {
      addTask(
        elements.taskTitle.value.trim(),
        elements.taskStatus.value,
        elements
      );
      toggleElement(elements.newTaskModal, false);
    }
  };
};

export const openEditModal = (task, elements) => {
  elements.editTaskTitle.value = task.title;
  elements.editTaskStatus.value = task.status;
  toggleElement(elements.editTaskModal, true);
  elements.editTaskForm.onsubmit = (e) => {
    e.preventDefault();
    saveTask(task, elements);
  };
  elements.deleteTaskBtn.onclick = () => deleteTask(task.id, elements);
  elements.cancelEditTaskBtn.addEventListener("click", () =>
    toggleElement(elements.editTaskModal, false)
  );
};

export const saveTask = (task, elements) => {
  if (elements.editTaskTitle.value.trim()) {
    task.title = elements.editTaskTitle.value.trim();
    task.status = elements.editTaskStatus.value;
    saveTasksToLocalStorage();
    renderTasks(elements);
  }
  toggleElement(elements.editTaskModal, false);
};

export const deleteTask = (taskId, elements) => {
  tasksState = tasksState.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  renderTasks(elements);
  toggleElement(elements.editTaskModal, false);
};
