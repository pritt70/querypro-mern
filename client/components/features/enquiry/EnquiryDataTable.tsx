"use client";

import React, { useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ThemeProps, EnquiryItem, EnquiryFormData } from "@/types/enquiry.types";
import { deleteEnquiry, fetchEnquiryById } from "@/utils/api.utils";
import { TOAST_CONFIG } from "@/constants/api.constants";

interface EnquiryDataTableProps extends ThemeProps {
  data: EnquiryItem[];
  onRefresh: () => void;
  onEdit: (data: EnquiryFormData) => void;
}

/**
 * EnquiryDataTable Component
 * Data table component for displaying and managing enquiries
 * Industry-standard table component with search and CRUD operations
 */
const EnquiryDataTable: React.FC<EnquiryDataTableProps> = ({
  darkMode = false,
  data,
  onRefresh,
  onEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Filters enquiries based on search term
   */
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowerSearchTerm) ||
        item.email?.toLowerCase().includes(lowerSearchTerm) ||
        item.phone?.toLowerCase().includes(lowerSearchTerm) ||
        item.message?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [data, searchTerm]);

  /**
   * Handles enquiry deletion
   */
  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      const result = await Swal.fire({
        title: "Delete Enquiry?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "Cancel",
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        customClass: {
          popup: darkMode ? "dark-popup" : "",
          title: darkMode ? "text-white" : "",
          htmlContainer: darkMode ? "text-gray-300" : "",
        },
      });

      if (result.isConfirmed) {
        try {
          await deleteEnquiry(id);
          toast.success("Enquiry deleted successfully!", {
            position: TOAST_CONFIG.POSITION,
            autoClose: TOAST_CONFIG.AUTO_CLOSE,
            theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
          });
          onRefresh();
        } catch (error) {
          console.error("Error deleting enquiry:", error);
          toast.error("Failed to delete enquiry!", {
            position: TOAST_CONFIG.POSITION,
            autoClose: TOAST_CONFIG.AUTO_CLOSE,
            theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
          });
        }
      }
    },
    [darkMode, onRefresh]
  );

  /**
   * Handles enquiry edit
   */
  const handleEdit = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await fetchEnquiryById(id);
        if (response.status && response.enquiry) {
          onEdit(response.enquiry);
        }
      } catch (error) {
        console.error("Error fetching enquiry:", error);
        toast.error("Failed to load enquiry data!", {
          position: TOAST_CONFIG.POSITION,
          autoClose: TOAST_CONFIG.AUTO_CLOSE,
          theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
        });
      }
    },
    [darkMode, onEdit]
  );

  /**
   * Clears search term
   */
  const handleClearSearch = (): void => {
    setSearchTerm("");
  };

  return (
    <div
      className={`rounded-2xl shadow-xl border transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 shadow-gray-900/20"
          : "bg-white border-gray-200 shadow-gray-900/10"
      }`}
    >
      <div className="p-6 lg:p-8">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? "bg-green-600" : "bg-green-500"
              }`}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Enquiries Table
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {filteredData.length} of {data.length} enquiries
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-64 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Clear search"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr
                className={`border-b-2 ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left py-4 px-4 font-semibold w-1/5 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`text-left py-4 px-4 font-semibold w-1/4 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email
                </th>
                <th
                  className={`text-left py-4 px-4 font-semibold w-1/6 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Phone
                </th>
                <th
                  className={`text-left py-4 px-4 font-semibold w-1/4 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Message
                </th>
                <th
                  className={`text-center py-4 px-4 font-semibold w-1/6 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } transition-colors duration-150`}
                  >
                    <td
                      className={`px-4 py-4 text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.email}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.phone}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm truncate ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      title={item.message}
                    >
                      {item.message}
                    </td>
                    <td className="px-2 py-4 text-center">
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="w-full px-2 py-1 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150"
                          title="Edit enquiry"
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-full px-2 py-1 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 transition-colors duration-150"
                          title="Delete enquiry"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className={`px-6 py-12 text-center ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-lg font-medium">
                          {searchTerm
                            ? "No matching enquiries found"
                            : "No enquiries found"}
                        </p>
                        <p className="text-sm">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Get started by submitting your first enquiry"}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={item._id}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    #{index + 1}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      title="Edit enquiry"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      title="Delete enquiry"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Name:{" "}
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Email:{" "}
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.email}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Phone:{" "}
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.phone}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Message:{" "}
                    </span>
                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`text-center py-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div>
                  <p className="text-lg font-medium">No enquiries found</p>
                  <p className="text-sm">
                    Get started by submitting your first enquiry
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryDataTable;


