class Todo {
  constructor(title,dueDate=new Date()){
    this.title = title
    this.dueDate = dueDate
  }

  setTitle(title){
    this.title = title
  }

  setDueDate(dueDate){
    this.dueDate = dueDate
  }
}

export default Todo