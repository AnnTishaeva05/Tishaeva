import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
