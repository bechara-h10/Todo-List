import Project from "./project"

class TodoList {
  constructor(){
    this.projects = []
    this.projects.push(new Project('Inbox'))
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
    return result
  }
}

export default TodoList