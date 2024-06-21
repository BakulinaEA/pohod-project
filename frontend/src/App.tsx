import { Route, Routes } from 'react-router-dom'

import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'

const App = () => (
  <Routes>
    <Route path="/*" element={<Login />}></Route>
    <Route path="/register" element={<Registration />}></Route>
    <Route path="/email/verify/:code" element={<VerifyEmail />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
    {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
    {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
  </Routes>
)

// npm run dev 

export default App
