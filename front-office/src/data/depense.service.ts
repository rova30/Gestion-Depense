import axios from 'axios';
import {baseUrl} from "./global_config";

export const getTotalDepenseDuMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-du-mois/'+famille_id));
};

export const getTotalDepenseParMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-par-mois/'+famille_id));
};



