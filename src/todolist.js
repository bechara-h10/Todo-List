import { format,compareAsc} from "date-fns"
import Project from "./project"

class TodoList {
  constructor(){
    this.projects = []
    this.projects.push(new Project('Inbox'))
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

  addToTodayAndThisWeek(){
    const todayProject = this.getProject('Today')
    const thisWeekProject = this.getProject('This Week')
    this.projects.forEach(project => {
      project.todos.forEach(todo => {
        console.log(format(new Date(),'yyyy-MM-dd'))
        if(todo.dueDate == format(new Date(),'yyyy-MM-dd')){
          todayProject.addTodo(todo.title)
          const todayTodo = todayProject.getTodo(todo.title)
          todayTodo.dueDate = todo.dueDate
          console.log(todayProject)
        } else if(TodoList.isDateInThisWeek(todo.dueDate)){
          thisWeekProject.addTodo(todo.title)
          const thisWeekTodo = thisWeekProject.getTodo(todo.title)
          thisWeekTodo.dueDate = todo.dueDate
          console.log(thisWeekProject)
        }
      })
    })
  }

   static isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  
    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  
    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

}

export default TodoList