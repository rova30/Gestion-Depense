import axios from 'axios';
import { baseUrl } from "./global_config";

export interface Role {
    id: number;
    nom: string;
}
export const getAllRoles = () => {
    return axios.get<Role[]>(baseUrl('roles'));
};
