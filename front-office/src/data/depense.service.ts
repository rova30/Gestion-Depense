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

export const createDepense = (famille_id: number | undefined, membre: number | undefined, type_depense: number, montant: number, date_depense:string) => {
    const depenseData = { famille: famille_id, membre: membre, type: type_depense, montant: montant, date: date_depense};
    return axios.post(baseUrl('ajout-depense'), depenseData);
}

