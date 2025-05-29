import { type FormEvent, useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Gesli se ne ujemata!');
      return;
    }
    alert(`Registracija: ${email} / ${password}`);
    // tukaj pokličeš API...
  };

  return (
    // was bg-gray-50
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Flex wrapper: form on left, image on right */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Left: the form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-6"
          >
            <h2 className="text-3xl font-semibold text-[#c45a39] text-center md:text-left">
              Registracija
            </h2>

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
          </form>
        </div>
      </div>
    </div>
  );
}