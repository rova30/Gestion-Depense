import React, {useEffect, useState} from 'react';
import './Revenu.css';
import {
    IonCard,
    IonSpinner, IonIcon, IonCardHeader, IonCardContent
} from "@ionic/react";
import {getMembreByToken} from "../../../data/membre.service";
import {getTotalRevenuDuMois} from "../../../data/revenu.service";
import { cash } from 'ionicons/icons';


const Revenu: React.FC = () => {
    const [famille, setFamille] = useState(0);
    const [revenu, setRevenu] = useState("");
    const [familleChargee, setFamilleChargee] = useState(false);


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setFamille(response.data.membre.famille_id);
                setFamilleChargee(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);

    useEffect(() => {
        if (familleChargee) {
            getTotalRevenuDuMois(famille)
                .then(response => {
                    console.log(response.data);
                    setRevenu(response.data.revenu[0].total_revenu);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du total de revenu du mois', error);
                });
        }
    }, [famille, familleChargee]);
    if (!familleChargee) {
        return (
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="circular" />
            </div>
        );
    }
    return (
            <div id="card">
                    <div id="label-revenu">
                        <IonIcon id="icon-revenu" icon={cash}></IonIcon>&nbsp;&nbsp;<h3>Revenus du mois</h3>
                    </div>
                <div id="content-revenu"><h4>{revenu} Ar</h4></div>
            </div>
            
    );
};

export default Revenu;
