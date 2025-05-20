// src/components/Navbar.tsx
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="space-x-4">
        <span className="text-2xl font-bold text-indigo-600" > <Link to="/"> MealApp </Link>  </span> 
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Prijava
        </Link>
        <Link
          to="/register"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Registracija
        </Link>
         <Link
          to="/restaurants"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Lokali
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
