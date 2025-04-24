// app/routes/login.tsx
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";   // <- type-only import

export default function Login() {
  const nav = useNavigate(); // za preusmeritev
  const url = "/api/auth/login"; // endpoint

  // ob pošiljanju obrazca
  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // pobereš vrednosti iz obrazca
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const body = {
      email: fd.get("email"),
      password: fd.get("password"),
    };

    // pokličeš backend (napaka = alert)
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      alert("Napačen e-mail ali geslo");
      return;
    }

    // uspeh → shrani token in pojdi na domačo stran
    const { token } = await res.json();
    localStorage.setItem("token", token);
    nav("/");
  }

  /* ====== UI ====== */
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      {/* preprost obrazec */}
      <form
        onSubmit={onSubmit}
        className="w-80 space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-center text-xl font-bold">Prijava</h1>

        <input
          name="email"
          type="email"
          placeholder="E-pošta"
          required
          className="w-full rounded border px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Geslo"
          required
          className="w-full rounded border px-3 py-2"
        />

        <button className="w-full rounded bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700">
          Prijavi me
        </button>
      </form>
    </main>
  );
}
