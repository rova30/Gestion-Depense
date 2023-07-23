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

export interface MembreView {
    id: number,
    famille_id: number,
    nom: string,
    prenom: string,
    sexe: string,
    role:string,
    date_naissance: Date,
    photo: string
}

export interface Profil extends MembreView {
    mois: number,
    annee: number,
    login: string,
    total_revenu: number,
    total_depense: number
}

export const createMembre = (famille_id: number | undefined, nom: string, prenom: string, role_id: number, date_naissance: string, sexe_id: number, login: string, mdp: string, confirmation_mdp: string) => {
    const membreData = { famille: famille_id, nom: nom, prenom: prenom, role: role_id, date_naissance: date_naissance, sexe: sexe_id, login: login, mdp: mdp, confirmation_mdp: confirmation_mdp};
    return axios.post<Membre>(baseUrl('membres'), membreData)
};


export const getMembreByToken = (token: string | null) => {
    return axios.get(baseUrl('membre/'+token));
};

export const getAllMembreByFamilleId = (famille_id: number | undefined) => {
    return axios.get<MembreView>(baseUrl('membres/'+famille_id));
}

export const getProfilDuMois = (membre_id: number | undefined, famille_id: number | undefined) => {
    return axios.get(baseUrl('profil/'+membre_id+'/'+famille_id));
}