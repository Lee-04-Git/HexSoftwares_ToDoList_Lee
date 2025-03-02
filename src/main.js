import { getElements, renderTasks, openTaskModal } from "./taskFunctions/taskFunction.js";

// Initialize elements
const elements = getElements();

// Initialize tasks and restore filter selection on page load
window.onload = () => {
  elements.filterDropdown.value =
    localStorage.getItem("selectedTaskStatus") || "To-Do";
  renderTasks(elements);
};

// Update the task list when the filter changes
elements.filterDropdown.addEventListener("change", () => {
  localStorage.setItem("selectedTaskStatus", elements.filterDropdown.value);
  renderTasks(elements);
});

// Attach event listeners for opening and closing modals
elements.addNewTaskBtn.addEventListener("click", () => openTaskModal(elements));
elements.cancelTaskBtn.addEventListener("click", () =>
  toggleElement(elements.newTaskModal, false)
);
