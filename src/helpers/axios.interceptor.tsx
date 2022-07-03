import axios from 'axios';
import { BASE_URL } from '../../utils/AppConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {};

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers
});

export const axiosWithoutToken = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('currentToken')
        if(token){
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((reject) => {
                reject(error);
            });
        }
    },
);