import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";


function App() {

  const [darkMode, setDarkMode] = useState(true);


  return (

    <BrowserRouter>

      <div
        className={
          `app ${darkMode ? "dark" : "light"}`
        }
      >

        {/* ================= NAVBAR ================= */}

        <nav className="navbar">


          {/* LOGO */}

          <Link
            to="/"
            className="logo"
          >

            <span className="logo-icon">
              ✦
            </span>

            Review<span>Sense</span>

          </Link>


          {/* NAVIGATION */}

          <div className="nav-right">

            <div className="nav-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/history">
                History
              </Link>

              <Link to="/dashboard">
                Dashboard
              </Link>

            </div>


            {/* THEME TOGGLE */}

            <button
              className="theme-toggle"
              onClick={() =>
                setDarkMode(!darkMode)
              }
              aria-label="Toggle theme"
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >

              {darkMode
                ? "☀️"
                : "🌙"}

            </button>

          </div>

        </nav>


        {/* ================= ROUTES ================= */}

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />


          <Route
            path="/history"
            element={<History />}
          />


          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>


        {/* ================= FOOTER ================= */}

        <footer>

          <p>
            © 2026 ReviewSense · NLP Sentiment Analysis Project
          </p>

        </footer>

      </div>

    </BrowserRouter>

  );
}


export default App;