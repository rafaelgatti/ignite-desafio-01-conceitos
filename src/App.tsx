import { Header } from "./components/Header"
import { PlusCircle } from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.newTaskBox}>
          <input
            name='task'
            type="text" 
            placeholder="Adicione uma nova tarefa"
            required
          />

          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
