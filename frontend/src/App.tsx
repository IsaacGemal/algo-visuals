import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Sorting from './pages/Sorting';
import PathPlanning from './pages/PathPlanning';
import Searches from './pages/Searches';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about" className='mr-4'>About</Link>
        <Link to="/sorting" className='mr-4'>Sorting</Link>
        <Link to="/path" className='mr-4'>Path Planning</Link>
        <Link to="/searches" className='mr-4'>Searches</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/path" element={<PathPlanning />} />
          <Route path="/searches" element={<Searches />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
