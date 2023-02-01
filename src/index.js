import style from './style.css'
import Todo from './todo'
import TodoList from './todolist'
import Project from './project'
import Dom from './dom'
import Storage from './storage'

const todoList = Storage.getTodoList()
todoList.checkToday()
todoList.checkThisWeek()
Dom.showProjects(todoList)




