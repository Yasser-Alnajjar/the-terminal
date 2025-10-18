import { IResult } from "@lib/actions";
import { axios } from "@lib/client";

const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IResult> => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data || error.message };
  }
};

export { Login };
