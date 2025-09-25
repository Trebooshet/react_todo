import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/utils/hooks.ts'

function RequireAuth() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
