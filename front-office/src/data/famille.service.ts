import axios from 'axios';
import { baseUrl } from './global_config';
export interface Famille {
    id: number,
    nom: string,
    responsable: string
}

export const createFamille = (nom: string, responsable:string) => {
    const familleData = { nom: nom, responsable: responsable };
    return axios.post(baseUrl('familles'), familleData, {
        headers: {
            'X-CSRF-TOKEN': document.head
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content'),
        },
    });
};

export const getTotalEnCaisseParFamille = (famille_id: number) => {
    return axios.get(baseUrl('caisse/'+famille_id));
}

export const getFamilleById = (famille_id: number) => {
    return axios.get(baseUrl('famille/'+famille_id));
}