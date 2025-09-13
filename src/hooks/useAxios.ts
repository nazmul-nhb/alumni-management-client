import { baseURL } from '@/config/constants';
import { siteConfig } from '@/config/site';
import type { IErrorResponse } from '@/types/interface';
import { useNavigate } from '@tanstack/react-router';
import axios, { type AxiosError } from 'axios';
import { getFromLocalStorage } from 'nhb-toolbox';
import { useEffect } from 'react';

export const useAxiosPublic = () => {
	return axios.create({ baseURL });
};

export const useAxiosSecure = () => {
	const navigate = useNavigate();

	const axiosInstance = axios.create({ baseURL });

	useEffect(() => {
		// request interceptor to add authorization header for every secure call to the api
		const requestInterceptor = axiosInstance.interceptors.request.use(
			(config) => {
				const token = getFromLocalStorage<string>(siteConfig.token_name);
				// block if there is no token
				if (!token) {
					console.warn('Missing Access Token! Redirecting to Login Page...');
					navigate({ to: '/login' });
					return Promise.reject(new Error('Missing Access Token!'));
				}
				// proceed if token is found
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// response interceptor for handling 401 and 403 status
		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError<IErrorResponse>) => {
				const status = error.response ? error.response.status : null;

				if (status === 401 || status === 403) {
					const errorMsg =
						error.response?.data?.message ?? 'Unauthorized or Forbidden Access!';

					console.error(errorMsg, status);
					navigate({ to: '/' });
					return Promise.reject(new Error(errorMsg));
				}

				console.error('API Request Error: ', error);
				return Promise.reject(error);
			}
		);

		// cleanup function
		return () => {
			axiosInstance.interceptors.request.eject(requestInterceptor);
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, [navigate]);

	return axiosInstance;
};
