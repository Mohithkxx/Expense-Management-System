import React from "react";
import { Routes, Route } from "react-router-dom";
import Navber from "./Components/Navber";
import Home from "./Components/Home";
import About from "./Components/About"; 
import Register from "./Components/Register";

function App() {
  return (
    <div>
      <Navber />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
