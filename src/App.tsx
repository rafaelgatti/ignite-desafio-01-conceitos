import { ChangeEvent, FormEvent, useState } from "react"
import { Header } from "./components/Header"
import { Task } from "./components/Task"

import { PlusCircle } from 'phosphor-react'
import uuid from 'react-uuid'
import clipboard from './assets/clipboard.svg'

import styles from './App.module.css'
import './global.css'

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function App() {
//   const tasks = [
//   {
//     id: uuid(),
//     content: 'Estudar TypeScript',
//     isCompleted: true
//   },
//   {
//     id: uuid(),
//     content: 'Desafio 01 - Ignite',
//     isCompleted: false
//   }
// ];

  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      content: 'Estudar TypeScript',
      isCompleted: true
    },
    {
      id: uuid(),
      content: 'Terminar o desafio',
      isCompleted: false
    }
  ]);

  const [newTaskText, setNewTaskText] = useState('')
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
  
    const newTask = [
      {
        id: uuid(),
        content: newTaskText,
        isCompleted: false
      }
    ]
    const newTasks = tasks.concat(newTask);
    setTasks(newTasks);
    setNewTaskText('');
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    });
    setTasks(tasksWithoutDeleteOne);
  }

  function checkTaskCompleted(taskToCheck: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskToCheck) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setTasks(newTasks);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
          <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
            <input
              name='taskText'
              type="text" 
              placeholder="Adicione uma nova tarefa"
              value={newTaskText}
              onChange={handleNewTaskTextChange}
              required
            />

            <button type="submit">
              Criar
              <PlusCircle size={20} />
            </button>
          </form>
          <div className={styles.taskListBox}>
            <header>
              <div className={styles.createdTasks}>
                <span>Tarefas criadas</span>
                <div>{tasks.length}</div>
              </div>
              <div className={styles.completedTasks}>
                <span>Concluídas</span>
                <div>
                  {tasks.length == 0 
                    ? tasks.length 
                    : 
                    <>
                      {tasks.reduce((total, task) => {
                        if (task.isCompleted == true) {
                          total++;
                        }
                        return total;
                      }, 0)} de {tasks.length}
                    </>
                  }
                </div>
              </div>
            </header>
            <div className={styles.taskList}>
              {tasks.length > 0 
              ? <>
                  {tasks.map(task => {
                    return (
                      <Task 
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        isCompleted={task.isCompleted}
                        onCheckTask={checkTaskCompleted}
                        onDeleteTask={deleteTask}
                      />
                    )
                  })}
                </>
              : <div className={styles.taskListContentEmpty}>
                  <img src={clipboard} alt="Clipboard sem tarefas" />
                  <div className={styles.taskListContentText}>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                  </div>              
              </div>
              }          
            </div>
          </div>          
        </main>        
      </div>
    </div>
  )
}

export default App
