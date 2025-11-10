"use client";

import React, { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const API_BASE_URL = "http://192.168.0.105:10000";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  _id?: string;
}

interface EnquiryProps {
  darkMode?: boolean;
}

const Enquiry = ({ darkMode = false }: EnquiryProps) => {
  // Debug logging
  console.log("Environment variable REACT_APP_URL:", process.env.REACT_APP_URL);
  console.log("Final API_BASE_URL:", API_BASE_URL);

  const [enquiryList, setEnquiryList] = useState<any[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const saveEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry Saved.");

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    if (!formData.phone.trim()) {
      Swal.fire({
        title: "Phone Number Required",
        text: "Please enter your phone number to continue.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        customClass: {
          popup: darkMode ? "dark-popup" : "",
          title: darkMode ? "text-white" : "",
          htmlContainer: darkMode ? "text-gray-300" : "",
        },
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number (10-15 digits). You can include country code, spaces, dashes, or parentheses.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        customClass: {
          popup: darkMode ? "dark-popup" : "",
          title: darkMode ? "text-white" : "",
          htmlContainer: darkMode ? "text-gray-300" : "",
        },
      });
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your message", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    if (formData._id) {
      axios
        .put(
          `${API_BASE_URL}/api/enquiry/enquiryupdate/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: darkMode ? "dark" : "light",
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getEnquiry();
        })
        .catch((err) => {
          toast.error("Failed to update enquiry!", {
            position: "top-right",
            autoClose: 3000,
            theme: darkMode ? "dark" : "light",
          });
        });
    } else {
      axios
        .post(`${API_BASE_URL}/api/enquiry/enquiryinsert`, formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: darkMode ? "dark" : "light",
          });

          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getEnquiry();
        })
        .catch((err) => {
          console.error("Error saving enquiry:", err);
          toast.error("Failed to save enquiry!", {
            position: "top-right",
            autoClose: 3000,
            theme: darkMode ? "dark" : "light",
          });
        });
    }
  };

  const getEnquiry = () => {
    axios
      .get(`${API_BASE_URL}/api/enquiry/enquirylist`)
      .then((res) => {
        return res.data;
      })
      .then((finalData: any) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiry);
        }
      });
  };

  const getData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const oldData = { ...formData };

    (oldData as any)[inputName] = inputValue;
    setFormData(oldData);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      _id: "",
    });
    toast.info("Form cleared!", {
      position: "top-right",
      autoClose: 2000,
      theme: darkMode ? "dark" : "light",
    });
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  useEffect(() => {
    getEnquiry();
  }, []);

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
        <div
          className={`rounded-2xl shadow-xl border transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700 shadow-gray-900/20"
              : "bg-white border-gray-200 shadow-gray-900/10"
          }`}
        >
          <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Enquiry Form
              </h2>
            </div>

            <form onSubmit={saveEnquiry} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Full Name <span className="text-red-700">*</span>
                </label>
                <input
                  value={formData.name}
                  onChange={getData}
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email Address <span className="text-red-700">*</span>
                </label>
                <input
                  value={formData.email}
                  onChange={getData}
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Phone Number <span className="text-red-700">*</span>
                </label>
                <input
                  value={formData.phone}
                  onChange={getData}
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Message <span className="text-red-700">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={getData}
                  name="message"
                  rows={4}
                  required
                  placeholder="Please describe your enquiry in detail..."
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* Form Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={clearForm}
                  className={`flex-1 border-2 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:ring-gray-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500"
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Clear</span>
                  </span>
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          formData._id
                            ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        }
                      />
                    </svg>
                    <span>{formData._id ? "Update" : "Submit"}</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Enquiry Table */}
        <div className="min-w-0">
          <EnquiryTable
            data={enquiryList}
            getEnquiry={getEnquiry}
            Swal={Swal}
            setFormData={setFormData}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
