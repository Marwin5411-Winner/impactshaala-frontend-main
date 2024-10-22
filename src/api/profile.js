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

// Send a friend request
export const sendFriendRequest = async (receiverId) => {
  try {
    const res = await axiosAuthInstance.post("/community/send-friend-request", { receiverId });
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.respons) || err.message || "Network Error";
    return { errRes };
  }
};

// Get received friend requests
export const getReceivedFriendRequests = async () => {
  try {
    const res = await axiosAuthInstance.get("/community/received-friend-requests");
    const data = res && res.data;
    return { data };
  } catch (err) {
    console.log(err)
    const errRes = (err && err) || err.message || "Network Error";
    console.log(errRes)
    return { errRes };
  }
};


// Get received friend requests
export const acceptFriendRequest = async (requestId) => {
  try {
    const res = await axiosAuthInstance.post("/community/accept-friend-request", { requestId });
    const data = res && res.data;
    return { data };
  } catch (err) {
    console.log(err)
    const errRes = (err && err) || err.message || "Network Error";
    console.log(errRes)
    return { errRes };
  }
};