import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Histogram from "./components/Histogram";
import Submit from "./components/Submit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Submit/>}  />
        <Route path="/histogram" element={<Histogram/>} />
      </Routes>
    </Router>
  );
}
export default App;
