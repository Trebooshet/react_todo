import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { getCookie } from '@/utils/cookie'

export const authApi = axios.create({
  baseURL: 'http://localhost:3001',
})

export const refresh = async () => {
  const refreshToken = getCookie('refreshToken')
  if (!refreshToken) throw new Error('No refresh token')
  const resp = await authApi.post('/auth/refresh', { refreshToken })
  return resp.data
}

export const refreshInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config

      if (
        err.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.endsWith('/auth/login') &&
        !originalRequest.url.endsWith('/auth/register') &&
        !originalRequest.url.endsWith('/auth/refresh')
      ) {
        originalRequest._retry = true

        try {
          const data = await refresh()
          const { store } = await import('@/store')

          store.dispatch({ type: 'auth/setToken', payload: data.accessToken })

          document.cookie = `refreshToken=${encodeURIComponent(data.refreshToken)}; path=/; SameSite=Lax`

          apiInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`

          return apiInstance(originalRequest)
        } catch (error) {
          const { store } = await import('@/store')
          store.dispatch({ type: 'auth/logoutUser' })
          return Promise.reject(error)
        }
      }
      return Promise.reject(err)
    },
  )
  return apiInstance
}

export const protectedApi = refreshInterceptor(
  axios.create({
    baseURL: 'http://localhost:3001',
  }),
)
