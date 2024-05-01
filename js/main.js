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
var w = window.innerWidth,
  h = window.innerHeight,
  canvas = document.getElementById("test"),
  ctx = canvas.getContext("2d"),
  rate = 60,
  arc = 100,
  time,
  count,
  size = 7,
  speed = 20,
  parts = new Array(),
  colors = ["red", "#f57900", "yellow", "#ce5c00", "#5c3566"]
var mouse = { x: 0, y: 0 }

canvas.setAttribute("width", w)
canvas.setAttribute("height", h)

function create() {
  time = 0
  count = 0

  for (var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size,
    }
  }
}

function particles() {
  ctx.clearRect(0, 0, w, h)
  canvas.addEventListener("mousemove", MouseMove, false)
  for (var i = 0; i < arc; i++) {
    var li = parts[i]
    var distanceFactor = DistanceBetween(mouse, parts[i])
    var distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1)
    ctx.beginPath()
    ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false)
    ctx.fillStyle = li.c
    ctx.strokeStyle = li.c
    if (i % 2 == 0) ctx.stroke()
    else ctx.fill()

    li.x = li.x + li.toX * (time * 0.05)
    li.y = li.y + li.toY * (time * 0.05)

    if (li.x > w) {
      li.x = 0
    }
    if (li.y > h) {
      li.y = 0
    }
    if (li.x < 0) {
      li.x = w
    }
    if (li.y < 0) {
      li.y = h
    }
  }
  if (time < speed) {
    time++
  }
  setTimeout(particles, 1000 / rate)
}
function MouseMove(e) {
  mouse.x = e.layerX
  mouse.y = e.layerY

  //context.fillRect(e.layerX, e.layerY, 5, 5);
  //Draw( e.layerX, e.layerY );
}
function DistanceBetween(p1, p2) {
  var dx = p2.x - p1.x
  var dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}
create()
particles()
