import { axiosInstance } from "../utilities/axios"

export const getCollabKeywords = async () => {
	try {
    const res = await axiosInstance.get("/collabs/collab-keywords")
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}