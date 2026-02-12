const API_BASE_URL = 'https://wedev-api.sky.pro/api'

export async function apiRequest(path = '', { method = 'GET', body, token, headers = {} } = {}) {
  const authToken = token ?? getToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders({ hasBody: Boolean(body), authToken, extra: headers }),
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await response.json()
  } catch (e) {
    // ignore json parse errors for empty bodies
  }

  if (!response.ok) {
    const message = data?.message || data?.error || 'Не удалось выполнить запрос'
    const error = new Error(message)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

function buildHeaders({ hasBody, authToken, extra }) {
  const base = {}

  if (authToken) {
    base.Authorization = `Bearer ${authToken}`
  }

  return {
    ...base,
    ...extra,
  }
}

export function saveToken(token) {
  try {
    localStorage.setItem('kanbanToken', token)
  } catch {
    // ignore storage errors
  }
}

export function getToken() {
  try {
    return localStorage.getItem('kanbanToken')
  } catch {
    return null
  }
}

export function clearToken() {
  try {
    localStorage.removeItem('kanbanToken')
  } catch {
    // ignore
  }
}


