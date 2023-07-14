import axios from 'axios';
import {baseUrl} from "./global_config";

export interface Transaction {
    famille_id: number;
    nom: string;
    prenom: string;
    type_transaction: string;
    type: string;
    montant: number;
    date_transaction: string;
}


export const getAllTransactionByFamilleId = (famille_id: number | undefined) => {
    return axios.get<Transaction[]>(baseUrl('transactions/'+famille_id));
};



