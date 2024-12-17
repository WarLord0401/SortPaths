import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // For navigation if you're using React Router
import logo from "../P.png";
const Navs = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const navbarRef = useRef(null); // Reference to the navbar

  const handleCloseNavbar = useCallback(() => {
    setIsNavbarCollapsed(true);
  }, []);

  const handleToggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  useEffect(() => {
    // Handle clicks outside the navbar to close the menu
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarCollapsed(true);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]); // Add dependencies appropriately

  return (
    <nav
      className="bg-blue-800 fixed top-0 left-0 w-full shadow-md"
      ref={navbarRef}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-8" />
          <Link
            to="/"
            className="text-2xl font-bold text-gray-100 hover:text-blue-500"
          >
            SORTPATHS
          </Link>
        </div>

        {/* Button to toggle navbar visibility on mobile */}
        <button
          className="lg:hidden p-2 text-gray-100 focus:outline-none"
          aria-controls="navbarNav"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
          onClick={handleToggleNavbar}
        >
          <span className="block w-6 h-0.5 bg-gray-200 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-200 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-200"></span>
        </button>

        {/* Navbar collapse state controlled by isNavbarCollapsed */}
        <div
          className={`lg:flex ${
            isNavbarCollapsed ? "hidden" : "block"
          } absolute lg:static bg-gray-400 w-full lg:w-auto left-0 top-full lg:flex-row py-4 lg:py-0 lg:bg-transparent transition-all duration-300 ease-in-out`}
          id="navbarNav"
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 pl-5 lg:items-center mx-auto">
            <li>
              <Link
                className="text-lg text-gray-200 hover:text-blue-500"
                to="/"
                onClick={handleCloseNavbar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-lg text-gray-200 hover:text-blue-500"
                to="/pathfinding_page"
                onClick={handleCloseNavbar}
              >
                Pathfinder Visualizer
              </Link>
            </li>
            <li>
              <Link
                className="text-lg text-gray-200 hover:text-blue-500"
                to="/sorting_page"
                onClick={handleCloseNavbar}
              >
                Sorting Visualizer
              </Link>
            </li>
            <li>
              <Link
                className="text-lg text-gray-200 hover:text-blue-500"
                to="/about"
                onClick={handleCloseNavbar}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-lg text-gray-200 hover:text-blue-500"
                to="/contact"
                onClick={handleCloseNavbar}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navs;
