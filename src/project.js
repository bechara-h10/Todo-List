import Todo from "./todo"

class Project{
  constructor(title){
    this.title = title
    this.todos=[]
  }

  addTodo(todoTitle){
    this.todos.push(new Todo(todoTitle))
  }

  deleteTodo(todoTitle){
    this.todos = this.todos.filter(todo => todo.title != todoTitle)
  }

  setTitle(title){
    this.title = title
  }
}

export default Project