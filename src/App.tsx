
// import Home from "./pages/Home";
// import bgImage from './assets/bg.png'


// export default function App() {
//   // const [page, setPage] = useState("login");
//   // const [currentUser, setCurrentUser] = useState<string | null>(
//   //   localStorage.getItem("loggedInUser")
//   // );

//   // const handleLogin = (email: string) => {
//   //   setCurrentUser(email);
//   //   localStorage.setItem("loggedInUser", email);
//   // };

//   // const handleLogout = () => {
//   //   setCurrentUser(null);
//   //   localStorage.removeItem("loggedInUser");
//   //   setPage("login");
//   // };

//   return (
//     <div style={{
//     height: "100vh",
//     width: "100%",
//     margin: "0 auto", // center horizontally
//     overflow: "hidden",
// backgroundImage: `url(${bgImage})`,
//     backgroundSize: "cover", // make it cover entire container
//     backgroundPosition: "center", // center the image
//     backgroundRepeat: "no-repeat" // avoid tiling

//     }}>
//       {<Home  />}
//     </div>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Register from "./pages/Register";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// export default function App() {

//   // this one working
//   return (
//     <div>
//       <h1>Hello React App is Working ✅</h1>
//       <span>hello</span>
//     </div>
//   );
//   // this one not working fix it 
//   return (
//     <div style={{ padding: "20px", background: "#fff", minHeight: "100vh" }}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </div>
//   );
// }

import { Route, Switch, Redirect, useLocation } from "wouter";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";


export default function App() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login
            onLogin={(email: string, password: string) => {
              // TODO: Implement login logic here
              // Example: authenticate user and redirect
              console.log("Login with", email, password);
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

