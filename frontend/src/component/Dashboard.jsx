import React from "react";

const Dashboard = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4">👤 Dashboard</h1>
      <p className="text-lg">
        Welcome back, <span className="font-semibold text-blue-500">{username}</span>! 🎉
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is your personalized dashboard. You can view stats, progress, and more here.
      </p>
    </div>
  );
};

export default Dashboard;
