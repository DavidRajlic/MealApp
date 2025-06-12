import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
   const [statusMessage, setStatusMessage] = useState("");
   const API_URL = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: username, email: email, password: password, confirm: confirm}),
      });

      if (res.ok) {

        setStatusMessage(`✅ Registracija uspešna! Dobrodošel, ${username || email}`);
        alert(`Uspešna registracija! Dobrodošel, ${username || email}!`);
        navigate(`/login`);
      } else {
        const error = await res.json();
        setStatusMessage(`❌ Napaka: ${error.message || "Napačni podatki"}`);
      }
    } catch (err) {
      setStatusMessage("❌ Prišlo je do napake pri povezavi s strežnikom.");
    }
   
   
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-6"
          >
            <h2 className="text-3xl font-semibold text-[#c45a39] text-center md:text-left">
              Registracija
            </h2>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Uporabniško ime
              </label>
              <input
                id="username"
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="ime"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c45a39] focus:border-[#c45a39]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@primer.si"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c45a39] focus:border-[#c45a39]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Geslo
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c45a39] focus:border-[#c45a39]"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
                Potrdi geslo
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c45a39] focus:border-[#c45a39]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#c45a39] hover:bg-[#a53f34] text-white uppercase font-semibold py-3 rounded-md transition"
            >
              Registracija
            </button>
            {statusMessage && (
              <p
                className={`mt-2 text-sm ${
                  statusMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
   };

export default Register;