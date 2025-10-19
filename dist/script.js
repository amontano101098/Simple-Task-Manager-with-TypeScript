"use strict";
class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById("taskInput");
        this.descInput = document.getElementById("taskDescription");
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.taskList = document.getElementById("taskList");
        this.loadTasks();
        this.addEventListeners();
    }
    addEventListeners() {
        this.addTaskBtn.addEventListener("click", () => this.addTask());
    }
    addTask() {
        const title = this.taskInput.value.trim();
        const description = this.descInput.value.trim();
        if (title === "" && description === "") {
            alert("Please enter both a task title and description!");
            return;
        }
        else if (title === "") {
            alert("Please enter a task title!");
            return;
        }
        else if (description === "") {
            alert("Please enter a task description!");
            return;
        }
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            done: false,
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTask(newTask);
        this.taskInput.value = "";
        this.descInput.value = "";
        alert("✅ Task added successfully!");
    }
    renderTask(task) {
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");
        listItem.setAttribute("data-id", task.id);
        const textContainer = document.createElement("div");
        textContainer.classList.add("task-text");
        const titleElem = document.createElement("h3");
        titleElem.textContent = task.title;
        const descElem = document.createElement("p");
        descElem.textContent = task.description;
        if (task.done) {
            titleElem.classList.add("done");
            descElem.classList.add("done");
        }
        textContainer.appendChild(titleElem);
        textContainer.appendChild(descElem);
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-group");
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("done-btn");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        doneBtn.addEventListener("click", () => this.toggleDone(task.id, titleElem, descElem));
        editBtn.addEventListener("click", () => this.editTask(task.id, titleElem, descElem));
        deleteBtn.addEventListener("click", () => this.deleteTask(task.id, listItem));
        buttonContainer.appendChild(doneBtn);
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        listItem.appendChild(textContainer);
        listItem.appendChild(buttonContainer);
        this.taskList.appendChild(listItem);
    }
    toggleDone(id, titleElem, descElem) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task)
            return;
        task.done = !task.done;
        titleElem.classList.toggle("done");
        descElem.classList.toggle("done");
        this.saveTasks();
    }
    editTask(id, titleElem, descElem) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task)
            return;
        const newTitle = prompt("Edit Task Title:", task.title);
        if (newTitle === null || newTitle.trim() === "") {
            alert("Task title cannot be empty!");
            return;
        }
        const newDesc = prompt("Edit Task Description:", task.description);
        if (newDesc === null || newDesc.trim() === "") {
            alert("Task description cannot be empty!");
            return;
        }
        // Update task
        task.title = newTitle.trim();
        task.description = newDesc.trim();
        // Update UI
        titleElem.textContent = task.title;
        descElem.textContent = task.description;
        this.saveTasks();
        alert("✅ Task updated successfully!");
    }
    deleteTask(id, listItem) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
        listItem.remove();
    }
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadTasks() {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            this.tasks = JSON.parse(stored);
            this.tasks.forEach((task) => this.renderTask(task));
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new TaskManager();
});
