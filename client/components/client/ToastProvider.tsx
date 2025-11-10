"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  darkMode?: boolean;
}

export default function ToastProvider({ darkMode = false }: ToastProviderProps) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "dark" : "light"}
      className="!mt-20 !mr-4"
      style={{
        zIndex: 9999,
        fontSize: "14px",
      }}
      toastClassName={() =>
        `relative flex p-4 min-h-12 rounded-xl justify-between overflow-hidden cursor-pointer shadow-xl border-l-4 ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600 border-l-blue-500"
            : "bg-white text-gray-900 border-gray-100 border-l-blue-500 shadow-gray-900/10"
        }`
      }
      progressClassName={() => `${darkMode ? "bg-blue-400" : "bg-blue-500"}`}
    />
  );
}


