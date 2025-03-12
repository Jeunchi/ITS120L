import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/mapua_logo.svg";

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gray-800"
    >
      {/* Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-800 text-yellow-500 py-4 px-6 flex justify-between items-center"
      >
        <h1 className="font-serif font-bold text-3xl md:text-4xl">
          MAPUA MAKATI LIBRARY
        </h1>
        <nav className="flex gap-6">
          <Link to="/records" className="font-medium hover:underline text-lg">
            <p className="text-yellow-500">Records</p>
          </Link>
          <Link to="/Validator" className="font-medium hover:underline text-lg">
            <p className="text-yellow-500">Validator</p>
          </Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex flex-col items-center justify-center p-6"
      >
        <div className="max-w-4xl w-full">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 flex justify-center">
                <div className="grid grid-cols-8 gap-1">
                  {Array(64)
                    .fill()
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-4 h-4 ${
                          [12, 19, 22, 27, 33, 41, 44, 51].includes(i)
                            ? "bg-yellow-500"
                            : [13, 21, 36, 42, 50].includes(i)
                            ? "bg-red-600"
                            : [28, 35, 43].includes(i)
                            ? "bg-white"
                            : Math.random() > 0.7
                            ? "bg-gray-500"
                            : "bg-gray-700"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                      />
                    ))}
                </div>
                <div className="ml-4 text-gray-400 text-sm">
                  <div>1925</div>
                  <div className="text-xs opacity-50">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <div key={i}>
                          {Array(20)
                            .fill()
                            .map((_, j) => (
                              <span key={j}>{Math.round(Math.random())}</span>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 text-center">
                <motion.img
                  src={logo}
                  alt="Mapua Logo"
                  className="w-32 mx-auto"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-800 text-yellow-500 py-4 px-6 flex justify-between"
      >
        <Link
          to="https://library.mapua.edu.ph/About/Default.aspx"
          className="font-medium hover:underline"
        >
          <p className="text-yellow-500">About</p>
        </Link>
        <button onClick={() => navigate("/")} className="font-medium hover:underline">
          Sign Out
        </button>
      </motion.footer>
    </motion.div>
  );
}

export default Home;
