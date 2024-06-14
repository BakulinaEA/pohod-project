import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Registration />}></Route>
  </Routes>
)

export default App
