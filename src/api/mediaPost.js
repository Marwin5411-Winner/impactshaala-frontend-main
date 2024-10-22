import { axiosAuthInstance } from "../utilities/axios";

export const createMediaPost = async (info) => {
	try {
    const res = await axiosAuthInstance.post(`/media-post/create`, info);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }  
}

export const getMediaPost = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/media-post/get-media-post/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const listMyMediaPosts = async () => {
	try {
    const res = await axiosAuthInstance.get(`/media-post/list-my-posts`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getRelatedMediaPosts = async  () => {
	try {
    const res = await axiosAuthInstance.get(`/media-post/get-related`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const getProfileMediaPosts = async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/media-post/list-profile-posts/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const deleteMediaPost = async  (id) => {
	try {
    const res = await axiosAuthInstance.delete(`/media-post/delete-my-post/` + id);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const updateMediaPost = async (info, id) => {
	try {
    const res = await axiosAuthInstance.put(`/media-post/update/` + id, info);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const likeMediaPost = async (id, reactionType) => {
  try {
    const res = await axiosAuthInstance.post(`/media-post/like/` + id, { reactionType });
    const data = res && res.data;
    return { data };
  } catch (err) {
    console.log(err);
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
};


export const unlikeMediaPost =  async (id) => {
	try {
    const res = await axiosAuthInstance.get(`/media-post/unlike/` + id);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const mediaPostComment = async (comment, id) => {
	try {
    const res = await axiosAuthInstance.post(`/media-post/comment/${id}`, {text: comment});
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const likeMediaPostComment = async (postId, commentId) => {
  try {
    const res = await axiosAuthInstance.post(`/media-post/like-comment/${postId}`, {commentId});
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const unlikeMediaPostComment = async (postId, commentId) => {
  try {
    const res = await axiosAuthInstance.post(`/media-post/unlike-comment/${postId}`, {commentId});
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }   
}

export const deleteMediaPostComment = async (postId, commentId) => {
	try {
    const res = await axiosAuthInstance.delete(`/media-post/delete-comment?postId=${postId}&commentId=${commentId}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const reportMediaPost = async (id) => {
  try {
    const res = await axiosAuthInstance.post(`/media-post/report/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const saveMediaPost = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/media-post/save/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const saveMediaPostDraft = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/media-post/save/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }    
}

export const unsaveMediaPost = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/media-post/unsave/${id}`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }     
}

export const getSavedPosts = async () => {
  try {
    const res = await axiosAuthInstance.get(`/media-post/get-savedpost`);
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }     
}


// Pin a post
export const pinPost = async (postId) => {
  try {
    const res = await axiosAuthInstance.post('/media-post/pinned-post/pin', { postId });
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
};

// Unpin a post
export const unpinPost = async (postId) => {
  try {
    const res = await axiosAuthInstance.post('/media-post/pinned-post/unpin', { postId });
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
};

// Get pinned posts
export const getPinnedPosts = async () => {
  try {
    const res = await axiosAuthInstance.get('/media-post/pinned-post');
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
};


// router.get('/pinned-post', isUserAuthenticated, getPinnedPosts);
// router.post('/pinned-post/pin', isUserAuthenticated, pinPost);
// router.post('/pinned-post/unpin', isUserAuthenticated, unpinPost);