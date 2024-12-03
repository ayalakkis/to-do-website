document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const taskList = document.getElementById('task-list');
    const currentDate = document.getElementById('current-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newListBtn = document.getElementById('new-list-btn');
    const completedTasks = [];
    let activeListId = 'my-day'; // Keep track of the currently active list
    const lists = {
        'my-day': [],
        'all-tasks': [],
        'completed': []
    };

    // Set today's date automatically
    const today = new Date();
    currentDate.textContent = today.toDateString();

    // Add a task
    addTaskBtn.addEventListener('click', () => {
        const taskName = prompt('Enter task name:');
        if (taskName) {
            const taskItem = createTaskItem(taskName);
            taskList.appendChild(taskItem);
            lists[activeListId].push(taskItem);
        }
    });

    // Add a new list
    newListBtn.addEventListener('click', () => {
        const listName = prompt('Enter new list name:');
        if (listName) {
            const listId = listName.toLowerCase().replace(/\s+/g, '-'); // Generate a unique ID
            lists[listId] = []; // Create a new list in the lists object

            const listItem = document.createElement('li');
            listItem.className = 'menu-item';
            listItem.id = listId;
            listItem.innerHTML = `<span>🗂️</span> ${listName}`;
            listItem.addEventListener('click', () => switchToList(listId, listName));

            menu.appendChild(listItem); // Add the new list to the sidebar
            alert(`List "${listName}" created!`);
        }
    });

    // Switch to a different list
    function switchToList(listId, listName) {
        activeListId = listId;

        // Update the page title
        document.getElementById('page-title').textContent = listName;

        // Highlight the active list in the sidebar
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        document.getElementById(listId).classList.add('active');

        // Clear the task list and show tasks from the selected list
        taskList.innerHTML = '';
        lists[listId].forEach(task => taskList.appendChild(task));
    }

    // Create a task item element
    function createTaskItem(taskName) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.addEventListener('click', () => toggleCompleteTask(taskItem));

        const taskText = document.createElement('span');
        taskText.textContent = taskName;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.border = 'none';
        deleteBtn.style.background = 'none';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            const index = lists[activeListId].indexOf(taskItem);
            if (index !== -1) lists[activeListId].splice(index, 1);
        });

        taskItem.appendChild(circle);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        return taskItem;
    }

    // Toggle task completion
    function toggleCompleteTask(taskItem) {
        if (taskItem.classList.contains('completed')) {
            taskItem.classList.remove('completed');
            const index = lists['completed'].indexOf(taskItem);
            if (index !== -1) lists['completed'].splice(index, 1);
        } else {
            taskItem.classList.add('completed');
            lists['completed'].push(taskItem);
        }
    }

    // Make all default sidebar items clickable
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => switchToList(item.id, item.textContent.trim()));
    });
});
