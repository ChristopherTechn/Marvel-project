import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Comics from "./Comics";
import Series from "./Series";
import Tvshows from "./Tvshows";
import Videos from "./Videos";
import Characters from "./Characters";
import spiderMan from './images/spiderMan.jpeg';
import encanto from './images/encanto.jpeg';
import loki from './images/loki.jpeg';
import avengers from './images/avengers.jpeg'
import "./App.css";  // Centralized CSS file

const slides = [
  { title: "Spider-Man: No Way Home", type: "Latest Action Movie", image: spiderMan },
  { title: "Encanto", type: "Latest Kids Movie", image: encanto },
  { title: "Loki", type: "Latest TV Show", image: loki },
  { title: "Avengers", type: "Latest SuperPower Show", image: avengers}
];


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted for:", searchTerm);
  };

  return (
    <div className="app">
      <nav className="nav-bar">
        <div className="nav-left">
          <h1 className="marvel-logo">MARVEL HUB</h1>
        </div>
        <ul className="nav-list">
          <li><Link to="/Characters">Characters</Link></li>
          <li><Link to="/Comics">Comics</Link></li>
          <li><Link to="/Series">Series</Link></li>
          <li><Link to="/Tvshows">TV Shows</Link></li>
          <li><Link to="/Videos">Videos</Link></li>
        </ul>
        <div className="nav-search">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
      </nav>

      <AdvertisementBoard />

      <Routes>
        <Route path="/Characters" element={<Characters searchTerm={searchTerm} />} />
        <Route path="/Comics" element={<Comics searchTerm={searchTerm} />} />
        <Route path="/Series" element={<Series searchTerm={searchTerm} />} />
        <Route path="/Tvshows" element={<Tvshows searchTerm={searchTerm} />} />
        <Route path="/Videos" element={<Videos searchTerm={searchTerm} />} />
      </Routes>

      <Footer />
    </div>
  );
}

function AdvertisementBoard() {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);  
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="advertisement-board">
      <div className="advertisement-slide">
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        <div className="advertisement-info">
          <h3>{slides[currentSlide].title}</h3>
          <p>{slides[currentSlide].type}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h4>Marvel Links</h4>
          <ul>
            <li><a href="https://wwarvel.com" target="_blank" rel="noopener noreferrer">Marvel Home</a></li>
            <li><a href="https://www.mvel.com/characters" target="_blank" rel="noopener noreferrer">Characters</a></li>
            <li><a href="https://www.mvel.com/comics" target="_blank" rel="noopener noreferrer">Comics</a></li>
            <li><a href="https://wwwrvel.com/movies" target="_blank" rel="noopener noreferrer">Movies</a></li>
            <li><a href="https://www.mel.com/tv-shows" target="_blank" rel="noopener noreferrer">TV Shows</a></li>
          </ul>
        </div>
        <div>
          <h4>About Marvel</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Help/FAQs</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facok.com/Marvel" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.tter.com/Marvel" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.insram.com/Marvel" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.yobe.com/Marvel" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Marvel. All rights reserved.
      </p>
    </footer>
  );
}

export default App;
