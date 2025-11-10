"use client";

import { useState } from "react";
import Header from "./Header";
import Enquiry from "./Enquiry";
import ToastProvider from "./ToastProvider";

export default function HomeContent() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      {/* Header with Dark Mode Toggle */}
      <Header
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Enquiry darkMode={darkMode} />
      </main>

      {/* Toast Container with Dark Theme Support */}
      <ToastProvider darkMode={darkMode} />
    </div>
  );
}

