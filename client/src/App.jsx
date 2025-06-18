import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AllTools from './pages/AllTools.jsx';
import Favorites from './pages/Favorites.jsx';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand" to="/">AI Tools</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">All Tools</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<AllTools />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
