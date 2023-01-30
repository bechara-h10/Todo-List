import TodoList from "./todolist"
import Project from "./project"
import Todo from "./todo"

let switcher = 0
let currentProject;

class Dom{
  static showProjects(todoList){
    const projectsDiv = document.querySelector('.projects-container')
    const defaultProjectDiv = document.querySelector('.default-project-container')
    defaultProjectDiv.innerText = ''
    projectsDiv.innerText = ''
    todoList.projects.forEach(project => {
      const projectTitle = document.createElement('h3')
      const projectLogo = document.createElement('div')
      projectLogo.classList.add('project-logo')
      if(project.title == 'Inbox' ){
        projectLogo.innerHTML = `<i class="fa-solid fa-inbox"></i>`
        projectTitle.innerText = project.title
        defaultProjectDiv.appendChild(projectLogo)
        defaultProjectDiv.appendChild(projectTitle)
      } else {
        projectLogo.innerHTML = `<i class="fa-solid fa-list-check"></i>`
        const projectDiv = document.createElement('div')
        projectDiv.classList.add('project-container')
        projectTitle.innerText = project.title 
        projectDiv.appendChild(projectLogo)
        projectDiv.appendChild(projectTitle)
        projectsDiv.appendChild(projectDiv)
      }
    })
    const projects = document.querySelectorAll('.project-container')
    projects.forEach(project => project.onclick = (e) => {
      currentProject = project.innerText
      Dom.showProjectContent(todoList,project.innerText)
      console.log(currentProject)
    })
    this.addProjectOption(todoList)
  }

  static showProjectContent(todoList,projectTitle){
    const project = todoList.getProject(projectTitle)[0]
    const projectTitleDiv = document.querySelector('.project-title')
    const todosDiv = document.querySelector('.todos-container')
    projectTitleDiv.innerText = project.title
    todosDiv.innerText = ''
    project.todos.forEach(todo => {
      const todoButton = document.createElement('button')
      const leftPart = document.createElement('div')
      const rightPart = document.createElement('div')
      const todoTitle = document.createElement('p')
      const todoDueDate = document.createElement('p')
      todoTitle.innerText = todo.title
      todoDueDate.innerText = todo.dueDate
      todoButton.classList.add('todo-button')
      leftPart.classList.add('left-part-todo')
      rightPart.classList.add('right-part-todo')
      leftPart.appendChild(todoTitle)
      rightPart.appendChild(todoDueDate)
      todoButton.appendChild(leftPart)
      todoButton.appendChild(rightPart)
      todosDiv.appendChild(todoButton)
    })
    this.addTodoOption(todoList)
  }

  static addProjectOption(todoList){
    const nav = document.querySelector('nav')
    const addProjectDiv = document.querySelector('.add-project-container')
    addProjectDiv.innerText = ''
    const addProjectButton = document.createElement('button')
    addProjectButton.classList.add('add-project-button')
    addProjectButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add Project`
    addProjectDiv.appendChild(addProjectButton)
    nav.appendChild(addProjectDiv)
    addProjectButton.onclick = ()=> {
      switcher = 1
      Dom.displayInputOption(todoList,addProjectDiv)
    }
  }

  static addTodoOption(todoList){
    const content = document.getElementById('content')
    const addTodoDiv = document.querySelector('.add-todo-container')
    addTodoDiv.innerText = ''
    const addTodoButton = document.createElement('button')
    addTodoButton.classList.add('add-todo-button')
    addTodoButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add Todo`
    addTodoDiv.appendChild(addTodoButton)
    addTodoButton.onclick = ()=> {
      switcher = 0
      Dom.displayInputOption(todoList,addTodoDiv)
    }
  }

  static displayInputOption(todoList,element){
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'add'
    const addButton = document.createElement('button')
    const cancelButton = document.createElement('button')
    addButton.innerText = 'Add'
    cancelButton.innerText = 'Cancel'
    addButton.classList.add('add-button')
    cancelButton.classList.add('cancel-button')
    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('buttons-container')
    buttonsContainer.appendChild(addButton)
    buttonsContainer.appendChild(cancelButton)
    cancelButton.onclick = () => {
      if(switcher == 1){
      Dom.addProjectOption(todoList)
      } else {
        Dom.addTodoOption(todoList)
      }
    }
    addButton.onclick = () => {
      if(switcher == 1){
      todoList.addProject(input.value)
      this.showProjects(todoList)
      } else {
        todoList.addTodo(currentProject,input.value)
        this.showProjectContent(todoList,currentProject)
      }
    }
    element.innerText = ''
    element.appendChild(input)
    element.appendChild(buttonsContainer)
  }
}

export default Dom