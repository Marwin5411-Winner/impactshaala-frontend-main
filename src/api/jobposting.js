import { axiosAuthInstance } from "../utilities/axios";

export const createJobPosting = async (formData) => {
	try {
    const res = await axiosAuthInstance.post("/internship/job-or-internship-posting/create", formData);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}

export const applyForJob = async (formData) => {
	try {
    const res = await axiosAuthInstance.post("/internship/job-or-internship-posting/apply", formData);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}