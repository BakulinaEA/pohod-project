import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'

const App = () => (
  <Routes>
    <Route path="/" element={<Login />}></Route>
  </Routes>
)

export default App
