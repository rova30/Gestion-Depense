import axios from 'axios';
import { baseUrl } from "./global_config";

export interface Sexe {
    id: number;
    nom: string;
}
export const getAllSexes = () => {
    return axios.get<Sexe[]>(baseUrl('sexes'));
};
