import "../App.css";
import heroTruck from "../assets/truck.png"; // truck image
import heroPerson from "../assets/person.jpg"; // person image
import logo from "../assets/logo.png"; // company logo
import bgImage from '../assets/bg.png'
import { Route, Switch, Link, Redirect } from "wouter";



export default function Dashboard() {


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
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav>
          <ul className="nav-menu">
            <li>Products ▾</li>
            <li>Solutions ▾</li>
            <li>Resources ▾</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="header-actions">
          <select className="lang-select">
            <option>Eng</option>
            <option>Esp</option>
          </select>
          <button className="btn login">Login</button>

          <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
            <Link href="/register" style={{ color: "#fff" }}>
              <button className="btn register">Register</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Smarter tools for <span>every carrier</span>
          </h1>
          <p>
            Get access to the largest freight network in North America so you can
            get the best load first – and fast – plus tools to maximize profits.
          </p>
          <button className="btn primary">Read more →</button>
        </div>

        <div className="hero-image">
          <div className="circle">
            <img src={heroPerson} alt="Person" />
          </div>
          <img src={heroTruck} alt="Truck" className="truck" />
        </div>
      </section>
    </div>
  );
}
