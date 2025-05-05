import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import avatar from "./user.jpg";

export default function Login() {
  const nav = useNavigate();
  const url = "/api/auth/login";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    if (!res.ok) return alert("Invalid credentials");
    const { token } = await res.json();
    localStorage.setItem("token", token);
    nav("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1E0C5]">
      <div className="bg-white/75 backdrop-blur-lg p-2 rounded-3xl">
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
          {/* avatar side */}
          <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400">
            <img
              src={avatar}
              alt="User Avatar"
              className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* form side */}
          <form onSubmit={onSubmit} className="flex-1 p-12 bg-white space-y-8">
            <div>
              <h2 className="text-center text-5xl font-bold text-gray-800">
                Welcome Back!
              </h2>
              <p className="mt-3 text-center text-lg text-gray-600">
                Please log in to your account
              </p>
            </div>

            {/* Email field */}
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-purple-400 transition">
              <span className="flex-shrink-0 pl-6 pr-4 text-gray-400">
                <Mail className="h-6 w-6" />
              </span>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="flex-1 bg-transparent py-4 pr-6 placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>

            {/* Password field */}
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-purple-400 transition">
              <span className="flex-shrink-0 pl-6 pr-4 text-gray-400">
                <Lock className="h-6 w-6" />
              </span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="flex-1 bg-transparent py-4 pr-6 placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-green-400 to-teal-500 py-4 text-xl font-semibold text-white hover:from-green-500 hover:to-teal-600 transition shadow-lg"
            >
              Log In
            </button>

            <div className="flex justify-between items-center text-base text-gray-500">
              <button type="button" className="hover:underline">
                Forgot Password?
              </button>
              <button
                type="button"
                className="text-purple-600 hover:underline"
                onClick={() => nav("/register")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}