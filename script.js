// Run code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when remove button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = '';

        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function (li) {
            tasks.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            removeButton.onclick = function () {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    // Event listener for add button
    addButton.addEventListener('click', addTask);

    // Allow adding task with Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
