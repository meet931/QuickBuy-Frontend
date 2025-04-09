import { post } from "./axiosInstance";

const USER = '/user'

export const signIn = (data: any) => post(`${USER}/login`, data);
export const signUp = (data: any) => post(`${USER}/register`, data);