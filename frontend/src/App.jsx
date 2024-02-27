import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//components
import InputEmployee from "./components/InputTodo";
import ListEmployee from "./components/ListTodo";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#333" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#333";
  }, [darkMode]);

  return (
    <Router>
      <div className="container">
        {/* <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> use Navbar */}
        <Routes>
          <Route path="/" element={<InputEmployee />} />
          <Route path="/list" element={<ListEmployee darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;