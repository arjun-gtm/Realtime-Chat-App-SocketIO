import React from 'react'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ChatPage from './pages/ChatPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivateRoute from './routes/PrivateRoutes'
import AdminRoute from './routes/AdminRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<HomePage/>}> </Route>
        <Route path={'/login'} element={<LoginPage/>}> </Route>
        <Route path={'/register'} element={<RegisterPage/>}> </Route>
        <Route
          path={'/chat'}
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path={'/admin'}
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App