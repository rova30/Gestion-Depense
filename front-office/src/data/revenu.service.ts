import axios from 'axios';
import {baseUrl} from "./global_config";

export interface TypeRevenu {
    id: number;
    nom: string;
}

export const getTotalRevenuDuMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-revenu-du-mois/'+famille_id));
};

export const getTotalRevenuParMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-revenu-par-mois/'+famille_id));
};

export const getAllTypeRevenus = () => {
    return axios.get<TypeRevenu[]>(baseUrl('typerevenus'));
};


export const createRevenu = (famille_id: number | undefined, membre: number | undefined, type_revenu: number, montant: number, date_revenu:string, libelle:string) => {
    const revenuData = { famille: famille_id, membre: membre, type: type_revenu, montant: montant, date: date_revenu, libelle: libelle};
    return axios.post(baseUrl('ajout-revenu'), revenuData);
}


