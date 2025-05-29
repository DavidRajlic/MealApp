import { type FormEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatusMessage(`✅ Prijava uspešna! Dobrodošel, ${data.username || email}`);
      } else {
        const error = await res.json();
        setStatusMessage(`❌ Napaka: ${error.message || "Napačni podatki"}`);
      }
    } catch (err) {
      setStatusMessage("❌ Prišlo je do napake pri povezavi s strežnikom.");
    }
  };

  return (
    // Outer cream-colored full-screen wrapper
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-12">
        {/* Flex wrapper: form on left, image on right */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Left: your existing form, with upgraded styling */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold text-[#c45a39] mb-4">Prijava</h2>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c45a39] focus:border-[#c45a39]"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#c45a39] hover:bg-[#a53f34] text-white uppercase font-semibold py-3 rounded-md transition"
            >
              Prijavi se
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

          {/* Right: decorative/login illustration */}
          <div className="hidden md:block md:flex-shrink-0">
            <img
              src="/images/login.png"
              alt="Login illustration"
              className="w-40 h-40 object-cover rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
