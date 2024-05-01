document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("newTask")
  const addButton = document.getElementById("addTask")
  const taskList = document.getElementById("taskListItems")
  let tasks = []

  // Функция для добавления новой задачи
  function addTask(taskName, checked = false) {
    const listItem = document.createElement("li")
    listItem.classList.add("task-list-item")

    const label = document.createElement("label")
    label.classList.add("task-list-item-label")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = checked // Устанавливаем состояние флажка

    const span = document.createElement("span")
    span.textContent = taskName

    label.appendChild(checkbox)
    label.appendChild(span)

    const deleteBtn = document.createElement("span")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.title = "Delete Task"
    deleteBtn.textContent = ""

    deleteBtn.addEventListener("click", function () {
      listItem.remove()
      tasks = tasks.filter(function (task) {
        return task.name !== taskName
      })
      saveTasks() // После удаления задачи сохраняем обновленный список задач
    })

    listItem.appendChild(label)
    listItem.appendChild(deleteBtn)

    taskList.appendChild(listItem)
  }

  // Функция для сохранения списка задач в локальное хранилище
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  // Функция для загрузки списка задач из локального хранилища
  function loadTasks() {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      tasks = JSON.parse(storedTasks)
      tasks.forEach(function (task) {
        addTask(task.name, task.checked) // Добавляем задачу с учетом ее состояния
      })
    }
  }

  addButton.addEventListener("click", function () {
    const taskName = input.value.trim()
    if (!taskName) return

    tasks.push({ name: taskName, checked: false }) // Добавляем задачу с изначальным состоянием false
    addTask(taskName)
    saveTasks() // Сохраняем обновленный список задач
  })

  // Обработчик события изменения состояния чекбокса
  taskList.addEventListener("change", function (event) {
    if (event.target.matches("input[type=checkbox]")) {
      const taskName = event.target.nextElementSibling.textContent
      const isChecked = event.target.checked

      // Находим соответствующую задачу и обновляем ее состояние
      tasks.forEach(function (task) {
        if (task.name === taskName) {
          task.checked = isChecked
          saveTasks() // Сохраняем обновленное состояние задач после изменения
        }
      })
    }
  })

  // Инициализация загрузки задач из локального хранилища при загрузке страницы
  loadTasks()
})
