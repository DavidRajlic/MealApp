// src/pages/Register.tsx
import { type FormEvent, useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      alert('Gesli se ne ujemata!')
      return
    }
    alert(`Registracija: ${email} / ${password}`)
    // tukaj pokličeš API...
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registracija</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Geslo</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Potrdi geslo</span>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Registracija
        </button>
      </form>
    </div>
  )
}
