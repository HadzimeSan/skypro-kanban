import { createContext, useContext, useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks'

const TaskContext = createContext(null)

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      setError('')
      const loadedTasks = await getTasks()
      setTasks(loadedTasks)
    } catch (e) {
      setError(e.message || 'Не удалось загрузить задачи')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreateTask = async (task) => {
    const result = await createTask(task)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else {
      loadTasks()
    }
  }

  const handleUpdateTask = async (id, updates) => {
    const result = await updateTask(id, updates)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else {
      loadTasks()
    }
  }

  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else {
      loadTasks()
    }
  }

  const getTaskByIdFromState = (id) => tasks.find((task) => String(task.id) === String(id))

  const value = {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    getTaskById: getTaskByIdFromState,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context
}


