import { FC, lazy, Suspense } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import PageLoader from '@/components/ui/spinner'

const Login = lazy(() => import('@/views/Login'))
const Registration = lazy(() => import('@/views/Registration'))
const Dashboard = lazy(() => import('@/views/Dashboard'))

const Router: FC = () => {
  const loggedIn = true
  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          )
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<PageLoader />}>
            <Registration />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          loggedIn ? (
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* <Route
        path="/*"
        element={
          <Suspense fallback={<Loading />}>
            <PageNotFound />
          </Suspense>
        }
      /> */}
    </Routes>
  )
}

export default Router
