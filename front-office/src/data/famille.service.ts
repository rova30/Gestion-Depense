import axios from 'axios';
import { baseUrl } from './global_config';
export interface Famille {
    id: number,
    nom: string
}
export const createFamille = (nom: string) => {
    const familleData = { nom: nom };
    return axios.post<Famille>(baseUrl('familles'), familleData, {
        headers: {
            'X-CSRF-TOKEN': document.head
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content'),
        },
    });
};