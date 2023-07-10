import React, {useEffect, useState} from 'react';
import './Revenu.css';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent, IonSpinner
} from "@ionic/react";
import {getMembreByToken} from "../../../data/membre.service";
import {getTotalRevenuDuMois} from "../../../data/revenu.service";


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
            <div className="spinner-container" style={{'paddingLeft':'80px'}}>
                <IonSpinner name="circular" />
            </div>
        );
    }
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Revenu mensuel</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{revenu} Ar</IonCardContent>
        </IonCard>
    );
};

export default Revenu;
