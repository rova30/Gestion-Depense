import React, {useEffect, useState} from 'react';
import './Banner.css';
import {
    IonButton,
    IonImg,
IonSpinner
} from "@ionic/react";
import { getMembreByToken, getProfilDuMois, Profil } from '../../data/membre.service';
const Banner: React.FC = () => {
    const [famille, setFamille] = useState(0);
    const [profil, setPofil] = useState<Profil>(Object);
    const [membre, setMembre] = useState(0);
    const [familleChargee, setFamilleChargee] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setMembre(response.data.membre.id);
                setFamille(response.data.membre.famille_id);
                setFamilleChargee(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);

    useEffect(() => {
        if (familleChargee) {
            getProfilDuMois(membre,famille)
                .then(response => {
                    console.log(response.data);
                    setPofil(response.data.profil);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du profil du mois', error);
                });
        }
    }, [famille, familleChargee]);
    if (!familleChargee) {
        return (
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="dots" />
            </div>
        );
    }
    function formatNumber(number:number) {
        // Vérifier si le nombre est supérieur ou égal à 1 million (1,000,000)
        if (number >= 1000000) {
          // Formater pour les millions (M)
          return (number / 1000000).toFixed(0) + 'M';
        } else if (number >= 1000) {
          // Formater pour les milliers (K)
          return (number / 1000).toFixed(0) + 'k';
        } else {
          // Renvoyer le nombre tel quel s'il est inférieur à 1000
          return number;
        }
      }

    return (
        <div id="container-profil">
            <div id="profil-pic">
                <IonImg src={profil.photo} id="pic"/>
            </div>
            <div id="profil-name">
                <h2>{profil.prenom}&nbsp;{profil.nom}</h2>
                <h4>{profil.role}</h4>
            </div>
            <div id="profil-stat">
                <div id="revenu-profil">
                    <h3>{formatNumber(profil.total_revenu)}</h3>
                    <h5>Revenu</h5>
                </div>
                <div id="depense-profil">
                    <h3>{formatNumber(profil.total_depense)}</h3>
                    <h5>Dépense</h5>
                </div>
            </div>
        </div>
    );
};

export default Banner;
