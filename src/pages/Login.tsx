import { useState } from "react";
import type { User } from "../types";
import logo from "../assets/logo.png";

interface Props {
  onLogin: (email: string) => void;
  goRegister: () => void;
}

export default function Login({ onLogin, goRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      alert("Login successful");
      onLogin(email);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{
      padding: 20, borderRadius: 8,
      height: "100vh",
      width: "100%",
      maxWidth: '500px',
      margin: "0 auto",  // center horizontally
      overflow: "hidden",
    }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          maxWidth: "400px",
          margin: "0 auto", // center horizontally
          borderRadius: "12px"
        }}
      >

        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="App Logo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              marginBottom: "10px",
              display: "block",       // make sure it's treated as a block element
              marginLeft: "auto",     // center horizontally
              marginRight: "auto"     // center horizontally
            }}
          />
          <h2>Sign In</h2>
        </div>


        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "bold"
            }}
          >
            Email
          </label>
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

        </div>

        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "bold"
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
        <p
          onClick={goRegister}
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#555",
            cursor: "pointer",
            marginTop: "16px"
          }}
        >
          Don’t have an account?{" "}
          <span style={{ color: "#007bff", fontWeight: "bold" }}>
            Sign up
          </span>
        </p>


      </div>

    </div>
  );
}
