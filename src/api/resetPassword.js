const { axiosInstance } = require("../utilities/axios")

export const requestReset = (email) => {
	return axiosInstance.post("/authentication/request-password-reset-link", {email})
}

export const verifyResetPasswordLink = (token) => {
	return axiosInstance.post("/authentication/verify-reset-password-link", {}, {
		headers: {
			"Authorization": token
		}
	})
}

export const resetPasswordWithToken = (token, newPassword) => {
	return axiosInstance.post("/authentication/set-new-password-by-reset-token", {password: newPassword}, {
		headers: {
			"Authorization": token
		}
	})
}