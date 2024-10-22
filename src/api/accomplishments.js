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

export const getMyAccomplishments = async (id) => {
	try {
    console.log(id)
    const res = await axiosAuthInstance.get("/my-accomplishments/" + id)
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getMyCollabAccomplishments = async (id) => {
	try {
    console.log(id)
    const res = await axiosAuthInstance.get("/accomplishment/get-my-accomplishments/")
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

// Create a new accomplishment
export const createMyAccomplishment = async (accomplishmentData) => {
  try {
    const res = await axiosAuthInstance.post('/my-accomplishments', accomplishmentData);
    return { data: res.data, errRes: null };
  } catch (err) {
    const errRes = (err && err.response) || err.message || 'Network Error';
    return { data: null, errRes };
  }
};

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

