import { axiosAuthInstance } from "../utilities/axios"

export const getMyProfile = () => {
	return axiosAuthInstance.get("/profile/get-profile")
}

export const updateProfile = (data) => {
	return axiosAuthInstance.put("/profile/update-profile", data)
}

export const searchProfiles = async (search) => {
	try {
    const res = await axiosAuthInstance.get(`/profile/search?name=${search.name}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}

export const getProfile = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/profile/get-profile/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}