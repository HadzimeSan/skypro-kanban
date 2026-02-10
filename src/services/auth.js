import { apiRequest, saveToken, clearToken, getToken } from './http'

export async function login({ login, password }) {
  const data = await apiRequest('/user/login', {
    method: 'POST',
    body: { login, password },
  })

  const token = data?.user?.token

  if (!token) {
    throw new Error('Сервер не вернул токен')
  }

  saveToken(token)
  return data.user
}

export async function register({ login, name, password }) {
  const data = await apiRequest('/user', {
    method: 'POST',
    body: { login, name, password },
  })

  return data.user
}

export function logout() {
  clearToken()
}

export function getStoredToken() {
  return getToken()
}

