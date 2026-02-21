import { createContext, useContext, useEffect, useState } from 'react'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById as apiGetTaskById,
} from '../services/tasks'
import { getStoredToken } from '../services/auth'

const TaskContext = createContext(null)

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    const token = getStoredToken()
    if (!token) {
      return
    }

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
    const token = getStoredToken()
    if (token) {
      loadTasks()
    }
  }, [])

  const handleCreateTask = async (task) => {
    const result = await createTask(task)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else if (result?.task) {
      const newTask = {
        ...result.task,
        id: result.task._id || result.task.id,
      }
      setTasks((prevTasks) => [...prevTasks, newTask])
    } else {
      await loadTasks()
    }
  }

  const handleUpdateTask = async (id, updates) => {
    const result = await updateTask(id, updates)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else if (result?.task) {
      const updatedTask = {
        ...result.task,
        id: result.task._id || result.task.id,
      }
      setTasks((prevTasks) =>
        prevTasks.map((t) => (String(t.id) === String(id) ? updatedTask : t))
      )
    } else {
      await loadTasks()
    }
  }

  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id)
    if (Array.isArray(result?.tasks)) {
      setTasks(result.tasks.map((t) => ({ ...t, id: t._id || t.id })))
    } else {
      setTasks((prevTasks) => prevTasks.filter((t) => String(t.id) !== String(id)))
    }
  }

  const getTaskByIdFromState = (id) => tasks.find((task) => String(task.id) === String(id))

  const fetchTaskById = async (id) => {
    try {
      const task = await apiGetTaskById(id)
      setTasks((prevTasks) => {
        const existingIndex = prevTasks.findIndex((t) => String(t.id) === String(id))
        if (existingIndex >= 0) {
          const updated = [...prevTasks]
          updated[existingIndex] = task
          return updated
        }
        return prevTasks
      })
      return task
    } catch (e) {
      throw e
    }
  }

  const value = {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    getTaskById: getTaskByIdFromState,
    fetchTaskById,
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
