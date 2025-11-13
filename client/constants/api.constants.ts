/**
 * API Configuration Constants
 * Centralized API endpoints and configuration
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://querypro-mern.onrender.com",
  ENDPOINTS: {
    LIST: "/api/enquiry/enquirylist",
    CREATE: "/api/enquiry/enquiryinsert",
    UPDATE: "/api/enquiry/enquiryupdate",
    DELETE: "/api/enquiry/enquiryremove",
    GET_BY_ID: "/api/enquiry/enquiryedit",
  },
} as const;

export const TOAST_CONFIG = {
  POSITION: "top-right" as const,
  AUTO_CLOSE: 4000,
  DEFAULT_THEME: "light" as const,
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[\d\s\-\(\)]{10,15}$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
} as const;


