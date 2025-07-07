import React, { useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden sm:block">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Dashboard</h2>
            <nav className="space-y-4 text-gray-700 dark:text-gray-300">
              <a href="#" className="block hover:text-blue-500">Home</a>
              <a href="#" className="block hover:text-blue-500">Analytics</a>
              <a href="#" className="block hover:text-blue-500">Problems</a>
              <a href="#" className="block hover:text-blue-500">Settings</a>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <button onClick={toggleSidebar} className="sm:hidden">
                <Menu className="w-5 h-5 text-gray-700 dark:text-white" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back</h1>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-white" />
                )}
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 text-gray-900 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">📊 Total Problems: 120</div>
              <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">✅ Solved: 80</div>
              <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">🔥 Streak: 5 Days</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
