import apiClient from "../apiClient";

export const getAllEvents = async () => {
  try {
    const response = await apiClient.get("/events/");
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getEventTypes = async () => {
  try {
    const response = await apiClient.get("/events/event_types/");
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const createEvent = async (data) => {
  try {
    const response = await apiClient.post("/events/", data);
    return response;
  } catch (ex) {
    return ex.response;
  }
};
