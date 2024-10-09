import { axiosAuthInstance } from "../utilities/axios"

export const searchUserProfiles = (searchQuery) => {
    return axiosAuthInstance.get("/search", {
      params: {
        search: searchQuery
      }
    });
  };

