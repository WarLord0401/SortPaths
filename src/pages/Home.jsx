import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../P.png"; // Make sure to replace with your logo

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header with Logo and Navbar */}

      <header className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img src={logo} alt="Logo" className="w-64 h-auto mb-6" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="flex space-x-6">
            <Link
              to="/sorting_page"
              className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition"
            >
              Sorting Algorithms
            </Link>
            <Link
              to="/pathfinding_page"
              className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition"
            >
              Pathfinding Algorithms
            </Link>
            <Link
              to="/about"
              className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition"
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      </header>

      {/* Main section */}
      <section className="text-center px-6 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to the Pathfinding & Sorting Visualization App
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl text-gray-700 mb-4">
            This project visualizes major sorting algorithms (Bubble Sort, Merge
            Sort, Quick Sort...) and pathfinding algorithms (Dijkstra's,
            A*,...). Learn and explore the power of algorithms through
            interactive visualizations.
          </p>
          <p className="text-lg text-gray-600">
            Try each algorithm in action to see how they work step by step!
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
