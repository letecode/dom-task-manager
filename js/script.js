let newtask = document.getElementById("newtask")
let form = document.getElementById('form')
let tableBody = document.querySelector('table tbody')
let submitBtn = document.getElementById('btnsubmit')

let editMode = false
let editionTak = null

editModeEnabled(editMode)

let tasks = [
    {
        'id' : 1,
        'title' : 'Nouvelle tâche',
        'isdone' : false
    },
    {
        'id' : 2,
        'title' : 'Nouvelle tâche 2',
        'isdone' : true
    },

    {
        'id' : 3,
        'title' : 'Nouvelle tâche 3',
        'isdone' : true
    },
]

function loadTasksInTable() {
    tableBody.innerHTML = ''

    for (const task of tasks) {
        let temp = `<tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>
                <input type="checkbox" name="" ${task.isdone ? 'checked' : '' } id="">
                <button>Supprimmer</button>
                <button data-title="${task.title}" data-id="${task.id}" onclick="editTask(this)">Modifier</button>
            </td>
        </tr>`

        tableBody.innerHTML += temp
    }
}

loadTasksInTable()

form.addEventListener('submit', function(e){
    e.preventDefault();

    let newTaskValue = newtask.value
    if(editMode) {
        updateTask(newTaskValue)
    } else {
        addTask(newTaskValue);
    }
    
})

function updateTask(value) {
    tasks.find((t) => t.id == editionTak.id).title = value
    loadTasksInTable()

    // init
    editModeEnabled(false)
}

function addTask(value) {
    let newtask = {
        'id' : 2,
        'title' : value,
        'isdone' : false
    }

    tasks.push(newtask) 
    loadTasksInTable()
}

function deleteTask(e){
    e.parentNode.parentNode.remove()
}

function editTask(e) {
    editModeEnabled(true)
    newtask.value = e.dataset.title
    editionTak = tasks.find((t) => t.id == e.dataset.id)
}

function editModeEnabled(enabled) {
    if(enabled) {
        editMode = true
        submitBtn.innerText = "Modifier"
    } else {
        editMode = false
        submitBtn.innerText = "Ajouter"
        editionTak = null
        newtask.value = ''
    }
}