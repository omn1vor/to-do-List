
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTask);
}

function saveTasks() {
    const taskElements = document.getElementById('task-list').children;
    const tasks = [];
    [...taskElements].forEach(listItem => {
        tasks.push({
            text: listItem.querySelector('.task').textContent,
            closed: listItem.querySelector('.task').classList.contains('closed-task')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createNewTask() {
    const taskElement = document.getElementById('input-task');
    const taskText = taskElement.value;

    if (!taskText) {
        return;
    }
    taskElement.value = '';

    const task = {
        text: taskText,
        closed: false
    };
    addTask(task);
}

function addTask(task) {
    const li = document.createElement('li');

    let element = document.createElement('input');
    element.type = 'checkbox';
    element.checked = task.closed;
    element.onclick = event => toggleClosedTask(event);
    li.appendChild(element);

    element = document.createElement('span');
    element.className = 'task';
    element.textContent = task.text;
    if (task.closed) {
        element.classList.add('closed-task');
    }
    li.appendChild(element);

    element = document.createElement('button');
    element.className = 'delete-btn';
    element.textContent = '-';
    element.title = 'Remove task';
    element.onclick = event => deleteTask(event);
    li.appendChild(element);

    const list = document.getElementById('task-list');
    list.appendChild(li);

    saveTasks();
}

function deleteTask(event) {
    const li = event.target.parentElement;
    const list = li.parentElement;
    list.removeChild(li);

    saveTasks();
}

function toggleClosedTask(event) {
    event.target.parentElement.querySelector('.task').classList.toggle('closed-task');
    saveTasks();
}

loadTasks();