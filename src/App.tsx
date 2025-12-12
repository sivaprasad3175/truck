import { Route, Switch, useLocation } from "wouter";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import type { User } from "./types";
import { Typography } from "@mui/material";



export default function App() {
  const [location, navigate] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const testUsers = [
  {
    name: "Test Driver",
    email: "Driver@mbility.co",
    password: "driver123",
    role: "Driver",
  },
  {
    name: "Test Dispatcher",
    email: "Dispatch@mbility.co",
    password: "dispatch123",
    role: "Dispatcher",
  },
  {
    name: "Test Broker",
    email: "Broker@mbility.co",
    password: "broker123",
    role: "Broker",
  },
  {
    name: "Test Vendor",
    email: "Vendor@mbility.co",
    password: "vendor123",
    role: "Vendor",
  },
  {
    name: "Test Regulator",
    email: "Regulator@mbility.co",
    password: "regulator123",
    role: "Regulator",
  },
  {
    name: "Test Shipper",
    email: "Shipper@mbility.co",
    password: "shipper123",
    role: "Shipper",
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(testUsers));
}

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    // If not logged in and on protected route, redirect to login
    if (!currentUser && location.startsWith("/dashboard")) {
      navigate("/login");
    }
  }, [currentUser, location, navigate]);

  function Search() {
    return <Typography variant="h4">Search Page</Typography>;
  }

  function MyLoads() {
    return <Typography variant="h4">My Loads Page</Typography>;
  }

  function RightNow() {
    return <Typography variant="h4">Right Now Page</Typography>;
  }

  function MobilitySelect() {
    return <Typography variant="h4">Mobility Select Page</Typography>;
  }

  function Compliance() {
    return <Typography variant="h4">Compliance & Safety Page</Typography>;
  }

  function MobiTracELD() {
    return <Typography variant="h4">MobiTrac ELD Page</Typography>;
  }

  function CalendarPage() {
    return <Typography variant="h4">Calendar Page</Typography>;
  }

  function Reports() {
    return <Typography variant="h4">Reports Page</Typography>;
  }

  function Documents() {
    return <Typography variant="h4">Documents Page</Typography>;
  }

  function TrackMyStuff() {
    return <Typography variant="h4">Track My Stuff Page</Typography>;
  }

  function PaymentGateway() {
    return <Typography variant="h4">Payment Gateway Page</Typography>;
  }

  function ChatPage() {
    return <Typography variant="h4">Chat Page</Typography>;
  }

  function LiveSupport() {
    return <Typography variant="h4">Live Support Page</Typography>;
  }

  function Tools() {
    return <Typography variant="h4">Tools Page</Typography>;
  }

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />

        <Route path="/login">
          <Login
            onLogin={(user: User) => {
              localStorage.setItem("loggedInUser", JSON.stringify(user));
              setCurrentUser(user);
              navigate("/dashboard");
            }}
            goRegister={() => navigate("/register")}
          />
        </Route>

        <Route path="/dashboard">
          {currentUser ? (
            <Dashboard
              key={Date.now()}    // Force re-mount every time user clicks "Dashboard"
              user={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            null
          )}
        </Route>


        <Route path="/search" component={Search} />
        <Route path="/my-loads" component={MyLoads} />
        <Route path="/right-now" component={RightNow} />
        <Route path="/mobility-select" component={MobilitySelect} />
        <Route path="/compliance-safety" component={Compliance} />
        <Route path="/mobitrac-eld" component={MobiTracELD} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/reports" component={Reports} />
        <Route path="/documents" component={Documents} />
        <Route path="/track-my-stuff" component={TrackMyStuff} />
        <Route path="/payment-gateway" component={PaymentGateway} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/live-support" component={LiveSupport} />
        <Route path="/tools" component={Tools} />

        {/* Fallback */}
        <Route>
          {() => {
            navigate("/");
            return null;
          }}
        </Route>
      </Switch>
    </div>
  );
}