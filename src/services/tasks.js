import { apiRequest } from './http'

function normalizeTask(task) {
  return {
    id: task._id || task.id,
    title: task.title || 'Новая задача',
    topic: task.topic || 'Research',
    date: task.date || '',
    status: task.status || 'Без статуса',
    description: task.description || '',
  }
}

export async function getTasks() {
  const data = await apiRequest('/kanban', {
    method: 'GET',
  })

  const tasks = Array.isArray(data?.tasks) ? data.tasks : []

  return tasks.map(normalizeTask)
}

export async function getTaskById(id) {
  const data = await apiRequest(`/kanban/${id}`, {
    method: 'GET',
  })

  if (!data?.task) {
    throw new Error('Задача не найдена')
  }

  return normalizeTask(data.task)
}

export async function createTask(task) {
  return await apiRequest('/kanban', {
    method: 'POST',
    body: task,
  })
}

export async function updateTask(id, updates) {
  return await apiRequest(`/kanban/${id}`, {
    method: 'PUT',
    body: updates,
  })
}

export async function deleteTask(id) {
  return await apiRequest(`/kanban/${id}`, {
    method: 'DELETE',
  })
}

