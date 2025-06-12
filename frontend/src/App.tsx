import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Restaurants from './pages/Restaurants'
import Restaurant from './pages/Restaurant'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'

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
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
