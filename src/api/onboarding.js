import { axiosInstance } from "../utilities/axios";

export const checkIfEmailNotTaken = async (email) => {
	try {
		const resp = await axiosInstance.post("/authentication/is-email-taken", {email})
		if(resp.data) {
			return resp.data
		} else return {
			success: false,
			message: "Something went wrong while checking the email"
		};
	} catch(err) {
		if(err.response && err.response.data && err.response.data.message)
			return {
				success: false,
				message: err.response.data.message
			}
		return {
			success: false,
			message: "Something went wrong while checking the email"
		};
	}
}

export const createAccount = async (userDetails) => {
	try {
		const resp = await axiosInstance.post("/authentication/create-account", {...userDetails})
		if(resp.errRes) return resp.errRes
		else return resp.data
	} catch(err) {
		console.log(err)
		return err;
	}
}

export const getUserTypes = async () => {
	return axiosInstance.get('/authentication/list-mst-user-types')
		.then(resp => Promise.resolve(resp.data))
		.catch(err => Promise.reject(err))
}

export const verifyAccountToken = async (token) => {
	return axiosInstance.post("authentication/account-verify-token", {}, {
		headers: {
			"Authorization": token
		}
	})
		.then(resp => Promise.resolve(resp.data))
		.catch(err => Promise.reject(err))
}

export const googleSignup = async (credential, userData) => {
	try {
    const res = await axiosInstance.post("/authentication/oauth-signup", {...userData}, {headers: {"Authorization": credential}})
    const data = res && res.data;
    return { data };
  } catch (err) {
    const errRes = (err && err.response) || err.message || "Network Error";
    return { errRes };
  }
}