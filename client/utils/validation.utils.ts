/**
 * Validation Utility Functions
 * Reusable validation logic for form inputs
 */

import { VALIDATION_RULES } from "@/constants/api.constants";

/**
 * Validates email address format
 * @param email - Email address to validate
 * @returns boolean - True if email is valid
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    return false;
  }
  return VALIDATION_RULES.EMAIL_REGEX.test(email.trim());
};

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns boolean - True if phone is valid
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== "string") {
    return false;
  }
  const cleanedPhone = phone.replace(/\s/g, "");
  return VALIDATION_RULES.PHONE_REGEX.test(cleanedPhone);
};

/**
 * Validates name field
 * @param name - Name to validate
 * @returns boolean - True if name is valid
 */
export const validateName = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  const trimmedName = name.trim();
  return (
    trimmedName.length >= VALIDATION_RULES.MIN_NAME_LENGTH &&
    trimmedName.length <= VALIDATION_RULES.MAX_NAME_LENGTH
  );
};

/**
 * Validates message field
 * @param message - Message to validate
 * @returns boolean - True if message is valid
 */
export const validateMessage = (message: string): boolean => {
  if (!message || typeof message !== "string") {
    return false;
  }
  const trimmedMessage = message.trim();
  return (
    trimmedMessage.length >= VALIDATION_RULES.MIN_MESSAGE_LENGTH &&
    trimmedMessage.length <= VALIDATION_RULES.MAX_MESSAGE_LENGTH
  );
};


