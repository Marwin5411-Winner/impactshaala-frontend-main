import { axiosAuthInstance } from "../utilities/axios"


export const getNotificationsAPI = async () => {
  try {
    const res = await axiosAuthInstance.get('/notifications');
    return { data: res.data };
  } catch (err) {
    console.error('Error fetching notifications:', err);
    return { errRes: err.response };
  }
};
