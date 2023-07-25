import axios from 'axios';
import { baseUrl } from './global_config';
export const loginService = (login:string,mdp:string) => {
    const loginData = {login: login, mdp: mdp};
    return axios.post(baseUrl('login'), loginData);
};