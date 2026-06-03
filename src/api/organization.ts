import { Organization } from "@/types/organizations";
import { API_ENDPOINTS } from "@/utils/api";
import axiosInstance from "./axios";

export const fetchOrganizations = async (): Promise<Organization[]> => {
  const res = await axiosInstance.get(API_ENDPOINTS.ORGANIZATION_LIST);
  return res.data;
};

export const createOrganization = async (name: string): Promise<Organization> => {
  const res = await axiosInstance.post(API_ENDPOINTS.ORGANIZATION_LIST, {
    name,
    is_active: false,
  });
  return res.data;
};