import { format,compareAsc} from "date-fns"
import Project from "./project"
import Todo from "./todo"
import Dom from "./dom"

class TodoList {
  constructor(){
    this.projects = []
    this.projects.push(new Project('Inbox'))
    this.projects.push(new Project('Today'))
    this.projects.push(new Project('This Week'))
  }

  getProjects(){
    return this.projects
  }

  addProject(projectTitle){
    this.projects.push(new Project(projectTitle))
  }

  addTodo(projectTitle,todoTitle){
    this.projects.forEach(project => project.title == projectTitle ? project.addTodo(todoTitle) : null)
  }

  deleteProject(projectTitle){
    this.projects = this.projects.filter(project => project.title != projectTitle)
  }

  deleteTodo(projectTitle,todoTitle){
    this.projects.forEach(project => project.title == projectTitle ? project.deleteTodo(todoTitle) : null)
  }

  getProject(projectTitle){
    const result = this.projects.filter(project => project.title == projectTitle ?  project : null )
    return result[0]
  }

  setProjects(projects){
    this.projects = projects
  }

  addToToday(todo){
    const todayProject = this.getProject('Today')
    if(todo.dueDate == format(new Date(),'yyyy-MM-dd')){
      todayProject.addFullTodo(todo.title,todo.dueDate)
    } else {
      todayProject.deleteTodo(todo.title)
    }
  }

  addToThisWeek(todo){
    const thisWeekProject = this.getProject('This Week')
    if(Dom.isDateInThisWeek(todo.dueDate)){
      thisWeekProject.addFullTodo(todo.title,todo.dueDate)
    } else {
      thisWeekProject.deleteTodo(todo.title)
    }
  }

  checkToday(){
    const todayProject = this.getProject('Today')
    todayProject.todos.forEach(todo => {
      if(todo.dueDate != format(new Date(),'yyyy-MM-dd')){
        todayProject.deleteTodo(todo.title)
      }
    })
  }

  checkThisWeek(){
    const thisWeekProject = this.getProject('This Week')
    thisWeekProject.todos.forEach(todo => {
      if(!Dom.isDateInThisWeek(todo.dueDate)){
        thisWeekProject.deleteTodo(todo.title)
      }
    })
  }

}

export default TodoList