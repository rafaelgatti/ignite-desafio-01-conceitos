import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onDeleteTask: (id: string) => void;
  onCheckTask: (id: string) => void;
}

export function Task({ id, content, isCompleted, onDeleteTask, onCheckTask }: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckTaskCompleted(taskToCheck: string) {
    onCheckTask(taskToCheck);
  }

  return (
    <div className={styles.taskBox}>
      <label className={styles.checkContainer}>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onClick={() => handleCheckTaskCompleted(id)}
        />
        <span className={isCompleted ? styles.checkMark : styles.unCheckMark}></span>
      </label>
      <div className={isCompleted ? styles.textCompleted : ''}>
        {content}
      </div>
      <button onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}