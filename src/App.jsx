import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";
import Sorting from "./pages/Sorting";
import Navs from "./utils/Navs";

const App = () => {
  return (
    <Router>
      <Navs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pathfinding_page" element={<Pathfinding />} />
        <Route path="/sorting_page" element={<Sorting />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
