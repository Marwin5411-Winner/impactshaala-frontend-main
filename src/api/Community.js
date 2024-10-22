import { axiosAuthInstance } from '../utilities/axios'; // Adjust the import according to your axios instance setup

// Fetch all community members
export const fetchCommunityMembers = async () => {
  try {
    const response = await axiosAuthInstance.get('/community/members');
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching community members:", error);
    return { errRes: error.response };
  }
};

// Remove a member from the community
export const removeCommunityMember = async (memberId) => {
    try {
      const response = await axiosAuthInstance.delete(`/community/members/${memberId}`);
      return { data: response.data };
    } catch (error) {
      console.error("Error removing community member:", error);
      return { errRes: error.response };
    }
  };


  // Block a member in the community
export const blockCommunityMember = async (memberId) => {
    try {
      const response = await axiosAuthInstance.post(`/community/members/block`, { memberId });
      return { data: response.data };
    } catch (error) {
      console.error("Error blocking community member:", error);
      return { errRes: error.response };
    }
  };

  
  // Highlight/Star a member in the community
export const highlightCommunityMember = async (memberId) => {
    try {
      const response = await axiosAuthInstance.post(`/community/members/highlight`, { memberId });
      return { data: response.data };
    } catch (error) {
      console.error("Error highlighting community member:", error);
      return { errRes: error.response };
    }
  };
  
  