import { axiosAuthInstance } from "../utilities/axios";

export const createPoll = async (info) => {
	try {
    const res = await axiosAuthInstance.post(`/polls/create`, info);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const editPoll = async (id, info) => {
  try {
    const res = await axiosAuthInstance.put(`/polls/update/${id}`, info);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const deletePoll = async (pollId) => {
  try {
    const res = await axiosAuthInstance.delete(`/polls/delete/${pollId}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getRelatedPolls = async () => {
  try {
    const res = await axiosAuthInstance.get(`/polls/get-related`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const getProfilePolls = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/polls/list-profile-polls/` + id);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const getMyPolls = async () => {
  try {
    const res = await axiosAuthInstance.get(`/polls/list-my-polls`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const likePoll = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/polls/like/` + id);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const unlikePoll =  async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/polls/unlike/` + id);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const pollComment = async (comment, id) => {
  try {
    const res = await axiosAuthInstance.post(`/polls/comment/${id}`, {text: comment});
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const deletePollComment = async (postId, commentId) => {
	try {
    const res = await axiosAuthInstance.delete(`/polls/delete-comment?pollId=${postId}&commentId=${commentId}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const reportPoll = async (pollId) => {
	try {
    const res = await axiosAuthInstance.post(`/polls/report/${pollId}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const savePoll = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/polls/save/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const unsavePoll = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/polls/unsave/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const voteOnPoll = async (id, optionId) => {
	try {
    const res = await axiosAuthInstance.post(`/polls/vote/${id}`, {optionId});
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}