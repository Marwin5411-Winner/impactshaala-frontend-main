import { axiosInstance } from "../utilities/axios";

export const login = (loginCredentials) => {
	return axiosInstance.post("/authentication/login-to-account", loginCredentials)
}

export const googleLogin = async (credential) => {
	try {
    const res = await axiosInstance.get("/authentication/oauth-verify", {
			headers: {
				"Authorization": credential
			}
		})
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}