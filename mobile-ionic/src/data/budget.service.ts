import axios from 'axios';
import {baseUrl} from "./global_config";

export interface Budget {
    typedepense_id: number;
    typedepense: string;
    famille_id: number;
    mois: string;
    montant_budget: number;
    somme_depenses: number;
    reste_budget: number;
}


export const getAllBudgetOfTheMonthByFamilleId = (famille_id: number | undefined) => {
    return axios.get<Budget[]>(baseUrl('budget/'+famille_id));
};

export const createBudget = (famille_id: number | undefined, type: number, montant: number) => {
    const dataBudget = {famille: famille_id, typedepense: type, montant: montant};
    return axios.post(baseUrl('ajout-budget'), dataBudget);
    
}


