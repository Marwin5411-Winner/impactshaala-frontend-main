import { axiosAuthInstance } from "../utilities/axios";

export const listAdmins = async () => {
	try {
    const res = await axiosAuthInstance.get(`/org-admins/list`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}

export const addAdmin = async  (adminInfo) => {
	try {
    const res = await axiosAuthInstance.post(`/org-admins/add`, adminInfo);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}

export const updateAdmin = async (updateInfo) => {
  	try {
    const res = await axiosAuthInstance.put(`/org-admins/update`, updateInfo);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}

export const deleteAdmin = async (id) => {
  try {
    const res = await axiosAuthInstance.delete(`/org-admins/delete/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const disableAdmin = async (id) => {
  try {
    const res = await axiosAuthInstance.post(`/org-admins/disable/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const enableAdmin = async (id) => {
  try {
    const res = await axiosAuthInstance.post(`/org-admins/enable/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}