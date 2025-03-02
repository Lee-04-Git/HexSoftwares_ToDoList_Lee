🚀 Try the Live Demo!

Check out the live demo of my To-Do List App and give it a spin! 🎉
👉 [Live Demo](https://hex-todo-app.netlify.app/)

📌 To-Do List App

Hey there! 👋 Thanks for checking out my To-Do List App. This is a simple and efficient task management tool that allows you to add, edit, delete, and organize your tasks with ease. Below, you'll find instructions on how to set up and use the app. Let's get started! 🚀

🛠 Setting Up the Project

This project was created using Vite, so you'll need to set up a Vite environment first before running the app.

1️⃣ Install Vite and Create a Project Folder

Open your terminal and run the following command to create a new Vite project:

npm create vite@latest your-app

🔗 Vite Documentation : https://vite.dev/guide/

2️⃣ Clone the Repository

Once your Vite project is created, navigate into your project folder and clone my repository:

git clone https://github.com/Lee-04-Git/HexSoftwares_ToDoList_Lee.git

3️⃣ Copy Main Files

Copy all the main files from my repository into your Vite project folder. This ensures that the app runs correctly.

4️⃣ Install Dependencies

Run the following command to install the necessary dependencies:

npm install

5️⃣ Start the App

To run the application, use:

npm run dev

Now, open the provided localhost link in your browser, and you're good to go! 🎉

💚 How to Use the To-Do List App

📝 Add a Task

Use the input field to type a new task.

Click the Add Task button to save it.

🗑 Delete a Task

Click the Delete button in the task modal to remove it.

💾 Save a Task

Your task changes will be saved through the edit modal by clicking the Save Changes button.

🗂 Manage Task Status

There’s a dropdown button that allows you to navigate between the To-Do, Doing, and Done statuses.

🖊 Edit Tasks

Click on a task to open a modal window where you can edit its details or change its status.

📂 Understanding taskFunction.js vs main.js

taskFunction.js

This file contains all the core functions for managing tasks.

It handles adding, editing, deleting, saving, and rendering tasks.

It also includes utility functions like toggleElement to show or hide modals.

The app's state (tasks list) is stored and updated here.

main.js

This file is responsible for initializing the app.

It imports functions from taskFunction.js to set up event listeners.

Handles page load tasks, such as restoring saved tasks and applying filters.

Attaches event listeners to buttons for adding and managing tasks.

🎯 Final Notes

That’s it! Enjoy using the To-Do List App and stay organized. If you run into any issues, feel free to reach out. Happy coding! 🚀
