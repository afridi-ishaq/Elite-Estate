"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
      <div
        className="
          bg-white
          p-10
          rounded-3xl
          shadow-lg
          w-full
          max-w-md
        "
      >
        <h1 className="text-3xl font-bold mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 mb-8">
          Sign in to access the dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#0F4C5C]
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}