import { Route, Routes } from 'react-router-dom'

import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import VerifyEmail from './pages/VerifyEmail'

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Registration />}></Route>
    <Route path="/email/verify/:code" element={<VerifyEmail />}></Route>
  </Routes>
)

export default App
