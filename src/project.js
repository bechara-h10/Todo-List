import Todo from "./todo"

class Project{
  constructor(title=''){
    this.title = title
    this.todos=[]
  }

  addTodo(todoTitle){
    this.todos.push(new Todo(todoTitle))
  }

  addFullTodo(todoTitle,todoDueDate){
    this.todos.push(new Todo(todoTitle,todoDueDate))
  }

  deleteTodo(todoTitle){
    this.todos = this.todos.filter(todo => todo.title != todoTitle)
  }

  setTitle(title){
    this.title = title
  }

  getTodo(todoTitle){
    const result = this.todos.filter(todo => todo.title == todoTitle ? todo : null)
    return result[0]
  }
  
  getTodos(){
    return this.todos
  }
  
  setTodos(todos){
    this.todo = todos
  }
}

export default Project