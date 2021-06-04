import apiClient from "../apiClient";

export const userLogin = async (data) => {
  try {
    const response = await apiClient.post("/accounts/login/", data);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const userCreate = async (data) => {
  try {
    const response = await apiClient.post("/accounts/register/", data);
    return response;
  } catch (ex) {
    return ex.response;
  }
};
