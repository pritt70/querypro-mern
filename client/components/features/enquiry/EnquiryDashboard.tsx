"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ThemeProps,
  EnquiryFormData,
  EnquiryItem,
} from "@/types/enquiry.types";
import { fetchEnquiries } from "@/utils/api.utils";
import EnquiryForm from "./EnquiryForm";
import EnquiryDataTable from "./EnquiryDataTable";

/**
 * EnquiryDashboard Component
 * Main dashboard component for QueryPro
 * Industry-standard dashboard component with proper state management
 */
const EnquiryDashboard: React.FC<ThemeProps> = ({ darkMode = false }) => {
  const [enquiryList, setEnquiryList] = useState<EnquiryItem[]>([]);
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Fetches enquiries from API
   */
  const loadEnquiries = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetchEnquiries();
      if (response.status && response.enquiry) {
        setEnquiryList(response.enquiry);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles enquiry list refresh
   */
  const handleEnquiryUpdate = useCallback((): void => {
    loadEnquiries();
  }, [loadEnquiries]);

  /**
   * Handles form data edit
   */
  const handleEdit = useCallback((data: EnquiryFormData): void => {
    setFormData(data);
  }, []);

  /**
   * Initial load
   */
  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          User QueryPro
        </h1>
        <p
          className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Manage and track customer enquiries efficiently
        </p>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 lg:gap-8">
        {/* Enquiry Form */}
        <EnquiryForm
          darkMode={darkMode}
          formData={formData}
          setFormData={setFormData}
          onEnquiryUpdate={handleEnquiryUpdate}
        />

        {/* Enquiry Table */}
        <div className="min-w-0">
          {isLoading ? (
            <div
              className={`rounded-2xl shadow-xl border p-12 text-center ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Loading enquiries...
                </p>
              </div>
            </div>
          ) : (
            <EnquiryDataTable
              darkMode={darkMode}
              data={enquiryList}
              onRefresh={handleEnquiryUpdate}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryDashboard;
