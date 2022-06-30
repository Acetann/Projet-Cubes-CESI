import axios from 'axios';
import { BASE_URL } from '../../utils/AppConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headers = {};

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    
})