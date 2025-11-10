/**
 * QueryPro System - Type Definitions
 * Industry-standard TypeScript interfaces and types
 */

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  _id?: string;
}

export interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnquiryApiResponse {
  status: boolean;
  enquiry: EnquiryItem[];
  message?: string;
}

export interface EnquirySingleResponse {
  status: boolean;
  enquiry: EnquiryItem;
  message?: string;
}

export interface ThemeProps {
  darkMode?: boolean;
}

export interface ToastConfig {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoClose?: number;
  theme?: "dark" | "light";
}


