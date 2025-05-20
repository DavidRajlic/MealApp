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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Geslo"
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Prijavi se
      </button>

      {statusMessage && (
        <p className="text-sm text-gray-700 mt-2">{statusMessage}</p>
      )}
    </form>
  );
};

export default Login
