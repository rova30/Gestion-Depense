import axios from 'axios';
import { baseUrl } from './global_config';
export interface Membre {
    id: number,
    famille_id: number,
    nom: string,
    prenom: string,
    role_id: number,
    date_naissance: Date,
    sexe_id: number,
    login: string,
    mdp: string,
    confirmation_mdp: string
}
export const createMembre = (famille_id: number | undefined, nom: string, prenom: string, role_id: number, date_naissance: string, sexe_id: number, login: string, mdp: string, confirmation_mdp: string) => {
    const membreData = { famille: famille_id, nom: nom, prenom: prenom, role: role_id, date_naissance: date_naissance, sexe: sexe_id, login: login, mdp: mdp, confirmation_mdp: confirmation_mdp};
    return axios.post<Membre>(baseUrl('membres'), membreData, {
        headers: {
            'X-CSRF-TOKEN': document.head
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content'),
        },
    });
};


export const getMembreByToken = (token: string | null) => {
    return axios.get(baseUrl('membre/'+token));
};