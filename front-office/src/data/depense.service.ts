import axios from 'axios';
import {baseUrl} from "./global_config";

export interface TypeDepense {
    id: number;
    nom: string;
}


export const getTotalDepenseDuMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-du-mois/'+famille_id));
};

export const getTotalDepenseParMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-par-mois/'+famille_id));
};

export const getAllTypeDepenses = () => {
    return axios.get<TypeDepense[]>(baseUrl('typedepenses'));
};

