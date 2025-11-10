"use client";

import React, { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import EnquiryDashboard from "@/components/features/enquiry/EnquiryDashboard";
import NotificationProvider from "@/components/common/NotificationProvider";

/**
 * EnquiryPage Component
 * Main page component for the QueryPro application
 * Industry-standard page component with theme management
 */
const EnquiryPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  /**
   * Toggles dark mode theme
   */
  const handleThemeToggle = (): void => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      {/* Application Header */}
      <AppHeader darkMode={darkMode} onThemeToggle={handleThemeToggle} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EnquiryDashboard darkMode={darkMode} />
      </main>

      {/* Notification Provider */}
      <NotificationProvider darkMode={darkMode} />
    </div>
  );
};

export default EnquiryPage;
