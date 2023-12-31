import axios from 'axios';
import {baseUrl} from "./global_config";

export interface TypeDepense {
    id: number;
    nom: string;
}

export interface DepenseParCategorie {
    famille_id : number,
    typedepense_id: number,
    typedepense: number,
    annee: number,
    total_depense: number
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

export const createDepense = (famille_id: number | undefined, membre: number | undefined, type_depense: number, montant: number, date_depense:string, libelle:string) => {
    const depenseData = { famille: famille_id, membre: membre, type: type_depense, montant: montant, date: date_depense, libelle: libelle};
    return axios.post(baseUrl('ajout-depense'), depenseData);
}

export const getTotalDepenseAnnuelParCategorie = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-annuel-par-categorie/'+famille_id));
}
