import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import UserDashboard from './pages/Dashboard/UserDashboard'
import OwnerDashboard from './pages/Dashboard/OwnerDashboard'
import NavBar from './components/NavBar'

function App() {
  

  return (
    <>
      {/* <LoginPage/> */}
    
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/owner-dashboard' element={<OwnerDashboard/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
