import React, { useState } from "react";
import type { User } from "../types";

interface Props {
  goLogin: () => void;
}

export default function Register({ goLogin }: Props) {
  const [form, setForm] = useState<User & { confirmPassword?: string; age?: string; gender?: string }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.age || !form.gender) {
      alert("Please fill all fields");
      return;
    }

    // Age validation
    if (Number(form.age) < 18) {
      alert("You must be at least 18 years old to register");
      return;
    }

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: User) => u.email === form.email);

    if (exists) {
      alert("Email already registered");
      return;
    }

    // Store without confirmPassword
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = form;
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    goLogin();
  };

  return (



    <div style={{
      padding: 20, borderRadius: 8,
      height: "100vh",
      width: "100%",
      maxWidth: '500px',
      margin: "0 auto",  // center horizontally
      overflow: "hidden"
    }}>

      <div style={{
        backgroundColor: "white", maxWidth: "400px", margin: "0 auto", padding: "16px", borderRadius: "12px"
      }}>
        <h2 style={{ textAlign: 'center' }}>Mbility Register</h2>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Name</label> */}
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={form.name}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Email</label> */}
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={form.email}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Age</label> */}
          <input
            name="age"
            type="number"
            placeholder="Enter your age"
            onChange={handleChange}
            value={form.age}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Gender</label> */}
          <select
            name="gender"
            onChange={handleChange}
            value={form.gender}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Address</label> */}
          <input
            name="address"
            placeholder="Enter your address"
            onChange={handleChange}
            value={form.address}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={form.password}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          {/* <label>Confirm Password</label> */}
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onChange={handleChange}
            value={form.confirmPassword}
            style={inputStyle}
          />
        </div>
        <button onClick={handleRegister} style={buttonStyle}>Register</button>


        <p
          onClick={goLogin}
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#555",
            cursor: "pointer",
            marginTop: "16px"
          }}
        >
          Already have an account?{" "}
          <span style={{ color: "#007bff", fontWeight: "bold" }}>
            Login
          </span>
        </p>

      </div>


    </div>



  );
}

const inputStyle: React.CSSProperties = {
  display: "block",      // forces to new line
  width: "100%",         // full container width
  padding: "10px",
  marginBottom: "12px",  // space between inputs
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

