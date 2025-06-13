import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.ts';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white p-4 shadow">
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#c45a39]">
                    <Link to="/">MealApp</Link>
                </span>

                <button
                    className="lg:hidden text-[#c45a39] focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <div className="hidden lg:flex gap-6 items-center ml-auto">
                    <Link to="/restaurants" className="text-[#c45a39] hover:text-blue-500 transition">Lokali</Link>
                    <Link to="/aboutUs" className="text-[#c45a39] hover:text-blue-500 transition">O nas</Link>

                    {isLoggedIn && (
                        <Link to="/profile" className="text-[#c45a39] hover:text-blue-500 transition">Profil</Link>
                    )}

                    {isLoggedIn ? (
                        <button onClick={logout} className="text-[#c45a39] hover:text-blue-500 transition">
                            Odjava
                        </button>
                    ) : (
                        <Link to="/login" className="text-[#c45a39] hover:text-blue-500 transition">Prijava</Link>
                    )}

                    {!isLoggedIn && (
                        <Link to="/register" className="text-[#c45a39] hover:text-blue-500 transition">Registracija</Link>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="flex flex-col gap-4 mt-4 lg:hidden">
                    <Link to="/restaurants" className="text-[#c45a39] hover:text-blue-500" onClick={toggleMenu}>Lokali</Link>
                    <Link to="/aboutUs" className="text-[#c45a39] hover:text-blue-500" onClick={toggleMenu}>O nas</Link>

                    {isLoggedIn && (
                        <Link to="/profile" className="text-[#c45a39] hover:text-blue-500" onClick={toggleMenu}>Profil</Link>
                    )}

                    {isLoggedIn ? (
                        <button onClick={() => { logout(); toggleMenu(); }} className="mr-auto text-[#c45a39] hover:text-blue-500">
                            Odjava
                        </button>
                    ) : (
                        <Link to="/login" className="text-[#c45a39] hover:text-blue-500" onClick={toggleMenu}>Prijava</Link>
                    )}

                    {!isLoggedIn && (
                        <Link to="/register" className="text-[#c45a39] hover:text-blue-500" onClick={toggleMenu}>Registracija</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
