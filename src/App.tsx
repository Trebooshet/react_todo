import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { refresh } from '@/api/refreshInterceptor.ts'
import RequireAuth from '@/components/RequireAuth'
import HomePage from '@/pages/HomePage.tsx'
import Layout from '@/pages/Layout.tsx'
import LoginForm from '@/pages/LoginForm.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import ProfilePage from '@/pages/ProfilePage.tsx'
import RegisterForm from '@/pages/RegisterForm.tsx'
import { logoutUser,setToken } from '@/store/authSlice'
import { deleteCookie,getCookie } from '@/utils/cookie'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    async function initAuth() {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) {
        navigate('/login')
        return
      }

      try {
        const { accessToken, refreshToken } = await refresh()
        dispatch(setToken(accessToken))

        document.cookie = `refreshToken=${encodeURIComponent(refreshToken)}; path=/; SameSite=Lax`
        navigate('/')
      } catch (err) {
        dispatch(logoutUser())
        console.error(err)
        deleteCookie('refreshToken')
      }
    }

    void initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/register'} element={<RegisterForm />} />
        <Route element={<RequireAuth />}>
          <Route index element={<HomePage />} />
          <Route path={'/profile'} element={<ProfilePage />} />
        </Route>

        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
