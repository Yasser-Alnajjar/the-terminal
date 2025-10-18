import { IResult } from "@lib/actions";
import { axios } from "@lib/client";

const getLogs = async (): Promise<IResult> => {
  try {
    const response = await axios.get("/logs");

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

const addLog = async ({ data }: { data: any }): Promise<IResult> => {
  try {
    const response = await axios.post("/logs", data);

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

export { getLogs, addLog };
