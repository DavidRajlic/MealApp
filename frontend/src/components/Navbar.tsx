// src/components/Navbar.tsx
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.ts'

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();


    return (
        <nav className="bg-white p-4 shadow flex items-center">
            <span className="text-2xl font-bold text-[#c45a39]" > <Link to="/"> MealApp </Link>  </span>

            <div className="ml-auto flex items-center gap-6">

                 
                   <Link
                        to="/restaurants"
                        className="text-[#c45a39] hover:text-blue-500 transition"
                    >
                        Lokali
                    </Link>
                     <Link
                        to="/aboutUs"
                        className="text-[#c45a39] hover:text-blue-500 transition"
                    >
                        O nas
                    </Link>
                

                {
                    isLoggedIn && (<Link
                        to="/profile"
                        className="text-[#c45a39] hover:text-blue-500 transition"
                    >
                        Profil
                    </Link>)
                }

                {isLoggedIn ? (
                    <Link
                        to="/"
                        className="hover:text-blue-500 transition"
                    > <span onClick={logout}>  Odjava</span>
                    </Link>

                ) : (
                    <Link
                        to="/login"
                        className="text-[#c45a39] hover:text-blue-500 transition"
                    > <span> Prijava</span>
                    </Link>
                )}

                {
                    !isLoggedIn && (<Link
                        to="/register"
                        className="text-[#c45a39] hover:text-blue-500 transition"
                    >
                        Registracija
                    </Link>)
                }

            </div>
        </nav>

    )
}

export default Navbar
