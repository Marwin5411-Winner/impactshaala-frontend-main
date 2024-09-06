import { axiosAuthInstance } from "../utilities/axios";

export const createAccomplishment = async (body) => {
	try {
    const res = await axiosAuthInstance.post("/accomplishment/create", body)
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getMyAccomplishments = async () => {
	try {
    const res = await axiosAuthInstance.get("/accomplishment/get-my-accomplishments")
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getProfileAccomplishments = async (id) => {
	try {
    const res = await axiosAuthInstance.get("/accomplishment/get-profile-accomplishments/" + id)
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}