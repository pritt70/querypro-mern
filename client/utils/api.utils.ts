/**
 * API Utility Functions
 * Centralized API call functions
 */

import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api.constants";
import {
  EnquiryFormData,
  EnquiryApiResponse,
  EnquirySingleResponse,
} from "@/types/enquiry.types";

/**
 * Fetches all enquiries from the API
 * @returns Promise<EnquiryApiResponse>
 */
export const fetchEnquiries = async (): Promise<EnquiryApiResponse> => {
  const response: AxiosResponse<EnquiryApiResponse> = await axios.get(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIST}`
  );
  return response.data;
};

/**
 * Creates a new enquiry
 * @param formData - Enquiry form data
 * @returns Promise<AxiosResponse>
 */
export const createEnquiry = async (
  formData: EnquiryFormData
): Promise<AxiosResponse> => {
  return await axios.post(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE}`,
    formData
  );
};

/**
 * Updates an existing enquiry
 * @param id - Enquiry ID
 * @param formData - Updated enquiry form data
 * @returns Promise<AxiosResponse>
 */
export const updateEnquiry = async (
  id: string,
  formData: EnquiryFormData
): Promise<AxiosResponse> => {
  return await axios.put(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE}/${id}`,
    formData
  );
};

/**
 * Deletes an enquiry
 * @param id - Enquiry ID
 * @returns Promise<AxiosResponse>
 */
export const deleteEnquiry = async (id: string): Promise<AxiosResponse> => {
  return await axios.delete(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DELETE}/${id}`
  );
};

/**
 * Fetches a single enquiry by ID
 * @param id - Enquiry ID
 * @returns Promise<EnquirySingleResponse>
 */
export const fetchEnquiryById = async (
  id: string
): Promise<EnquirySingleResponse> => {
  const response: AxiosResponse<EnquirySingleResponse> = await axios.get(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_BY_ID}/${id}`
  );
  return response.data;
};


