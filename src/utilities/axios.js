import axios from 'axios';
import { getLocalStorage } from './localStorage';

const axiosAuthInstance = axios.create({
	baseURL: process.env.REACT_APP_ENV === "prod" ? 
		process.env.REACT_APP_PROD_BACKEND_URL:
		process.env.REACT_APP_ENV === "stage"?
		process.env.REACT_APP_STAGING_BACKEND_URL:
		process.env.REACT_APP_LOCAL_BACKEND_URL,
})

axiosAuthInstance.interceptors.request.use(
	function(config) {
		const token = getLocalStorage('token');
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	}
)

export {axiosAuthInstance}

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_ENV === "prod" ? 
	process.env.REACT_APP_PROD_BACKEND_URL:
	process.env.REACT_APP_ENV === "stage"?
	process.env.REACT_APP_STAGING_BACKEND_URL:
	process.env.REACT_APP_LOCAL_BACKEND_URL,
})