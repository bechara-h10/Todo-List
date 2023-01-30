import style from './style.css'
import Todo from './todo'
import TodoList from './todolist'
import Project from './project'
import Dom from './dom'

let todoList = new TodoList()

todoList.addTodo('Inbox','Todo1')
todoList.addProject('Project1')
todoList.addTodo('Project1','Todo2')

Dom.showProjects(todoList)




