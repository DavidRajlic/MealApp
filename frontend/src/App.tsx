import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Restaurants from './pages/Restaurants'

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
