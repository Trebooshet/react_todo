import { lazy, Suspense,useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'

import { refresh } from '@/api/interceptors.ts'
import RequireAuth from '@/components/RequireAuth'
import HomePage from '@/pages/HomePage.tsx'
import Layout from '@/pages/Layout.tsx'
import LoginForm from '@/pages/LoginForm.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
const ProfilePage = lazy(() => import('@/pages/ProfilePage.tsx'))
// import ProfilePage from '@/pages/ProfilePage.tsx'
import RegisterForm from '@/pages/RegisterForm.tsx'
import { logoutUser, setToken } from '@/store/authSlice'
import { deleteCookie, getCookie } from '@/utils/cookie'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    async function initAuth() {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) {
        if (location.pathname !== '/register') {
          navigate('/login')
        }
        setIsLoaded(true)
        return
      }

      try {
        const { accessToken, refreshToken } = await refresh()
        dispatch(setToken(accessToken))

        document.cookie = `refreshToken=${encodeURIComponent(refreshToken)}`
        // navigate('/')
        if (location.pathname === '/login' || location.pathname === '/register') {
          navigate('/')
        }
      } catch (err) {
        dispatch(logoutUser())
        console.error(err)
        deleteCookie('refreshToken')
      } finally {
        setIsLoaded(true)
      }
    }

    void initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/register'} element={<RegisterForm />} />
        <Route element={<RequireAuth />}>
          <Route index element={<HomePage />} />
          <Route
            path={'/profile'}
            element={
              <Suspense>
                <ProfilePage />
              </Suspense>
            }
          />
        </Route>

        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
