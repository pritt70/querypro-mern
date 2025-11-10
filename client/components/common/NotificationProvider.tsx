"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProps } from "@/types/enquiry.types";
import { TOAST_CONFIG } from "@/constants/api.constants";

/**
 * NotificationProvider Component
 * Global toast notification provider with theme support
 * Industry-standard notification system component
 */
const NotificationProvider: React.FC<ThemeProps> = ({ darkMode = false }) => {
  return (
    <ToastContainer
      position={TOAST_CONFIG.POSITION}
      autoClose={TOAST_CONFIG.AUTO_CLOSE}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME}
      limit={5}
      className="toast-container-custom"
      style={{
        zIndex: 9999,
      }}
      toastClassName="custom-toast"
      progressClassName="custom-toast-progress"
      closeButton={true}
    />
  );
};

export default NotificationProvider;

