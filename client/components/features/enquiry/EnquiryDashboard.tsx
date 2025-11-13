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
  const [loader, setLoader] = useState<boolean>(false);

  const loadEnquiries = useCallback(async (): Promise<void> => {
    setLoader(true);
    try {
      const response = await fetchEnquiries();
      if (response.status && response.enquiry) {
        setEnquiryList(response.enquiry);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  const handleEnquiryUpdate = useCallback((): void => {
    loadEnquiries();
  }, [loadEnquiries]);

  const handleEdit = useCallback((data: EnquiryFormData): void => {
    setFormData(data);
  }, []);

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

        <EnquiryDataTable
          loader={loader}
          darkMode={darkMode}
          data={enquiryList}
          onRefresh={handleEnquiryUpdate}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default EnquiryDashboard;
