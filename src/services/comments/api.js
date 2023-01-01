import axios from "axios";
import { API_ENDPOINTS } from "../../constants";

export const getComments = () => {
  return axios.get(`${API_ENDPOINTS.GET_COMMENTS}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postComments = (body) => {
  return axios.post(`${API_ENDPOINTS.POST_COMMENTS}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const postReply = (id, body) => {
  return axios.post(`${API_ENDPOINTS.POST_COMMENTS}/${id}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
