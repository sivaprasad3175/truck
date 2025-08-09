import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import bgImage from './assets/bg.jpg'


export default function App() {
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState<string | null>(
    localStorage.getItem("loggedInUser")
  );

  const handleLogin = (email: string) => {
    setCurrentUser(email);
    localStorage.setItem("loggedInUser", email);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("loggedInUser");
    setPage("login");
  };

  return (
    <div style={{
    height: "100vh",
    width: "100%",
    margin: "0 auto", // center horizontally
    overflow: "hidden",
backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover", // make it cover entire container
    backgroundPosition: "center", // center the image
    backgroundRepeat: "no-repeat" // avoid tiling

    }}>
      {!currentUser && page === "login" && (
        <Login onLogin={handleLogin} goRegister={() => setPage("register")} />
      )}
      {!currentUser && page === "register" && (
        <Register goLogin={() => setPage("login")} />
      )}
      {currentUser && <Dashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}
