// import { getServerAuthSession } from "@auth";
// import { IResult } from "@lib/actions";
// import { axios } from "@lib/client";

// const getPolicies = async (): Promise<IResult> => {
//   const session = await getServerAuthSession();
//   try {
//     const response = await axios.get(`/policies/${session?.user?.tenant?.id}`);

//     return { data: response.data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error?.response?.data || error.message };
//   }
// };

// const getTenantPolicies = async (): Promise<IResult> => {
//   const session = await getServerAuthSession();
//   try {
//     const response = await axios.get(`/policies/${session?.user?.tenant?.id}`);

//     return { data: response.data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error?.response?.data || error.message };
//   }
// };

// export { getPolicies, getTenantPolicies };
