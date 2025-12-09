import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode, form, onChange, onSubmit }) {
  const navigate = useNavigate();

  const isRegister = mode === "Register";

  return (
    <section className="h-screen pt-30 bg-gray-200 flex justify-center">
      <form className="bg-gray-50 w-6/10 h-max flex flex-col gap-8 p-12 rounded-xl">
        <h1 className="text-3xl font-bold mb-12">
          {isRegister ? "Create Account" : "Login"}
        </h1>

        {mode === "Register" && (
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={onChange}
            required
            className="border border-border px-5 py-3 rounded-lg"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={onChange}
          required
          className="border border-border px-5 py-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
          className="border border-border px-5 py-3 rounded-lg"
        />

        <button
          onClick={onSubmit}
          className="bg-brand text-xl text-base font-semibold p-3 rounded-lg mt-10"
        >
          {isRegister? "Sign Up" : "Log In"}
        </button>

        <p>
          <span className="text-muted">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
          </span>
          <a
            onClick={
              isRegister
                ? () => navigate("/login")
                : () => navigate("/register")
            }
            className="text-brand underline"
          >
            {isRegister ? "Log In" : "Sign Up"}
          </a>
        </p>
      </form>
    </section>
  );
}
