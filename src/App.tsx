import { Route, Switch, Redirect, useLocation } from "wouter";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import type { User } from "./types";

export default function App() {
  const [, navigate] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) as User : null;
  });

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/dashboard">
          {currentUser ? (
            <Dashboard user={currentUser.email} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/login">
          <Login
            onLogin={(user : User) => {
              // ✅ Mock authentication
              localStorage.setItem("loggedInUser", JSON.stringify(user));
              setCurrentUser(user);
              // ✅ Navigate to dashboard after login
              navigate("/dashboard");
            }}
            goRegister={() => navigate("/register")}
          />
        </Route>

        {/* catch-all redirect */}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
