import axios from 'axios';
import {baseUrl} from "./global_config";

export const getTotalDepenseDuMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-depense-du-mois/'+famille_id));
};
