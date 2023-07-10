import axios from 'axios';
import {baseUrl} from "./global_config";

export const getTotalRevenuDuMois = (famille_id: number | undefined) => {
    return axios.get(baseUrl('total-revenu-du-mois/'+famille_id));
};
