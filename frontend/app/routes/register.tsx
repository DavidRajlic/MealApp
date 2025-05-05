import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock } from "lucide-react";

export default function Register() {
  const nav = useNavigate();
  const url = "/api/auth/register";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      password: fd.get("password"),
      confirm: fd.get("confirm"),
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.text();
      return alert("Registration failed: " + err);
    }
    nav("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center  bg-[#F1E0C5]">
      <div className="bg-white/75 backdrop-blur-lg p-2 rounded-3xl">
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
          {/* icon side */}
          <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
            <UserPlus className="h-32 w-32 text-white opacity-75" />
          </div>

          {/* form side */}
          <form onSubmit={onSubmit} className="flex-1 p-12 bg-white space-y-8">
            <div>
              <h2 className="text-center text-5xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="mt-3 text-center text-lg text-gray-600">
                Register a new account
              </p>
            </div>

            {/* Name field */}
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <span className="flex-shrink-0 pl-6 pr-4 text-gray-400">
                <UserPlus className="h-6 w-6" />
              </span>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="flex-1 bg-transparent py-4 pr-6 placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>

            {/* Email field */}
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400 transition">
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
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400 transition">
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

            {/* Confirm Password */}
            <div className="flex items-center w-full rounded-full border border-gray-300 bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <span className="flex-shrink-0 pl-6 pr-4 text-gray-400">
                <Lock className="h-6 w-6" />
              </span>
              <input
                name="confirm"
                type="password"
                placeholder="Confirm Password"
                required
                className="flex-1 bg-transparent py-4 pr-6 placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 py-4 text-xl font-semibold text-white hover:from-blue-600 hover:to-purple-600 transition shadow-lg"
            >
              Sign Up
            </button>

            <div className="text-center text-base text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold text-blue-600 hover:underline"
                onClick={() => nav("/login")}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}