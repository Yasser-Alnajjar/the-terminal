import { IResult } from "@lib/actions";
import { axios } from "@lib/client";

const getProject = async (id: string): Promise<IResult> => {
  try {
    const response = await axios.get(`/project/${id}`);

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

const getProjectPolicies = async (id: string): Promise<IResult> => {
  try {
    const response = await axios.get(`/project/${id}/policies`);

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};
const getProjectMembers = async (id: string): Promise<IResult> => {
  try {
    const response = await axios.get(`/project/${id}/members`);

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

const getProjectControls = async (id: string): Promise<IResult> => {
  try {
    const response = await axios.get(`/project/${id}/controls`);

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

export {
  getProject,
  getProjectControls,
  getProjectPolicies,
  getProjectMembers,
};
