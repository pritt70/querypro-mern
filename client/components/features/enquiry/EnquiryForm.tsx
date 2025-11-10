"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ThemeProps } from "@/types/enquiry.types";
import { EnquiryFormData } from "@/types/enquiry.types";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
} from "@/utils/validation.utils";
import { createEnquiry, updateEnquiry } from "@/utils/api.utils";
import { TOAST_CONFIG } from "@/constants/api.constants";

interface EnquiryFormProps extends ThemeProps {
  formData: EnquiryFormData;
  setFormData: (data: EnquiryFormData) => void;
  onEnquiryUpdate: () => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  darkMode = false,
  formData,
  setFormData,
  onEnquiryUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      if (formData._id) {
        await updateEnquiry(formData._id, formData);
        toast.success("Enquiry updated successfully!", {
          position: TOAST_CONFIG.POSITION,
          autoClose: TOAST_CONFIG.AUTO_CLOSE,
          theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
        });
      } else {
        await createEnquiry(formData);
        toast.success("Enquiry submitted successfully!", {
          position: TOAST_CONFIG.POSITION,
          autoClose: TOAST_CONFIG.AUTO_CLOSE,
          theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
        });
      }

      resetForm();
      onEnquiryUpdate();
    } catch (error) {
      console.error("Error saving enquiry:", error);
      toast.error(
        formData._id ? "Failed to update enquiry!" : "Failed to save enquiry!",
        {
          position: TOAST_CONFIG.POSITION,
          autoClose: TOAST_CONFIG.AUTO_CLOSE,
          theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    if (!validateName(formData.name)) {
      toast.error("Please enter a valid name (2-100 characters)", {
        position: TOAST_CONFIG.POSITION,
        autoClose: TOAST_CONFIG.AUTO_CLOSE,
        theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email", {
        position: TOAST_CONFIG.POSITION,
        autoClose: TOAST_CONFIG.AUTO_CLOSE,
        theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: TOAST_CONFIG.POSITION,
        autoClose: TOAST_CONFIG.AUTO_CLOSE,
        theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
      });
      return false;
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
      return false;
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
      return false;
    }

    if (!validateMessage(formData.message)) {
      toast.error("Please enter a valid message (10-1000 characters)", {
        position: TOAST_CONFIG.POSITION,
        autoClose: TOAST_CONFIG.AUTO_CLOSE,
        theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
      });
      return false;
    }

    return true;
  };

  const resetForm = (): void => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      _id: "",
    });
  };

  const handleClear = (): void => {
    resetForm();
    toast.info("Form cleared!", {
      position: TOAST_CONFIG.POSITION,
      autoClose: 2000,
      theme: darkMode ? "dark" : TOAST_CONFIG.DEFAULT_THEME,
    });
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
              xmlns="http://www.w3.org/2000/svg"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Full Name <span className="text-red-700">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              }`}
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email Address <span className="text-red-700">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              }`}
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Phone Number <span className="text-red-700">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+1 (555) 123-4567"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              }`}
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Message <span className="text-red-700">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              required
              placeholder="Please describe your enquiry in detail..."
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              }`}
              disabled={isSubmitting}
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className={`flex-1 border-2 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
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
                  xmlns="http://www.w3.org/2000/svg"
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
              disabled={isSubmitting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                <span>
                  {isSubmitting
                    ? "Processing..."
                    : formData._id
                    ? "Update"
                    : "Submit"}
                </span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
