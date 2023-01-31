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

  addToToday(){
    const todayProject = this.getProject('Today')
    this.projects.forEach(project => {
      project.todos.forEach(todo => {
        if(todo.dueDate == format(new Date(),'yyyy-MM-dd')){
          console.log(todayProject)
          todayProject.addFullTodo(todo.title,todo.dueDate)
        }
      })
    })
  }

  addToThisWeek(){
    const thisWeekProject = this.getProject('This Week')
    this.projects.forEach(project => {
      project.todos.forEach(todo => {
        if(Dom.isDateInThisWeek(todo.dueDate)){
          thisWeekProject.addFullTodo(todo.title,todo.dueDate)
        }
      })
    })
  }

}

export default TodoList