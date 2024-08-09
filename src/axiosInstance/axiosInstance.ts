import axios from "axios";

const token = import.meta.env.VITE_AUTH_TOKEN;

const axiosInstance = axios.create({
	baseURL: "https://api.spacetraders.io/v2",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export default axiosInstance;
