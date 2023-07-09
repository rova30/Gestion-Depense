import axios from 'axios';
import { baseUrl } from './global_config';

export const createFamille = (nom: string) => {
    const familleData = { nom: nom };
    return axios.post(baseUrl('familles'), familleData, {
        headers: {
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content')        },
    });
};
