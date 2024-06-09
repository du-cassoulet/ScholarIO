"use client";

import React, { useState, type FormEvent } from "react";
import styles from "./page.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function login(event: FormEvent) {
    event.preventDefault();

    const email: string = (event.target as any).email.value;
    const password: string = (event.target as any).password.value;

    if (email === "") {
      setErrors({ email: "Veuillez saisir votre adresse email", password: "" });
      return;
    }

    if (password === "") {
      setErrors({ email: "", password: "Veuillez saisir votre mot de passe" });
      return;
    }

    const res = await fetch("http://127.0.0.1:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.status === 401) {
      setErrors({ email: "", password: "Email ou mot de passe incorrect" });
      return;
    }

    if (!res.ok) {
      setErrors({ email: "", password: "Erreur inconnue" });
      return;
    }

    setErrors({ email: "", password: "" });
    window.location.reload();
  }

  return (
    <form className={styles.form} onSubmit={login}>
      <div className={styles.field}>
        <label htmlFor="email">Adresse Email</label>
        <div>
          <input type="email" id="email" />
        </div>
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Mot de Passe</label>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p>{errors.password}</p>}
      </div>
      <p>
        <a href="/forgot-password">Mot de passe oublié ?</a>
      </p>
      <div className={styles.actions}>
        <button type="submit">Se connecter</button>
      </div>
    </form>
  );
}
