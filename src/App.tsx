
// import Dashboard from "./pages/Dashboard";
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
//       {<Dashboard  />}
//     </div>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Register from "./pages/Register";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";

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
//         <Route path="/" element={<Dashboard />} />
//       </Routes>
//     </div>
//   );
// }

import { Route, Switch, Redirect } from "wouter";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      

        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/register" component={Register} />
          {/* catch-all redirect */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
    </div>
  );
}
