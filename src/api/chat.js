import { axiosAuthInstance } from "../utilities/axios"

export const reportUser = (userId) => {
	return axiosAuthInstance.post("/chats/report-user/" + userId)	
}

export const blockUser = (userId) => {
	return axiosAuthInstance.post("/chats/block-user/" + userId)
}

export const unblockUser = (userId) => {
	return axiosAuthInstance.post('/chats/unblock-user/' + userId)
}

export const sendMessage = async (message) => {
	try {
    const res = await axiosAuthInstance.post(`/chats/send-message`, message);
    const data = res && res.data;
    return { data };
  } catch (err) {
		console.log(err)
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}