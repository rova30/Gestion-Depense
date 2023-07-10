import React, {useEffect, useState} from 'react';
import './Depense.css';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent, IonSpinner
} from "@ionic/react";
import {getTotalDepenseDuMois} from "../../../data/depense.service";
import {getMembreByToken} from "../../../data/membre.service";


const Depense: React.FC = () => {

    const [famille, setFamille] = useState(0);
    const [depense, setDepense] = useState("");
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
            getTotalDepenseDuMois(famille)
                .then(response => {
                    console.log(response.data);
                    setDepense(response.data.depense[0].total_depense);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de la total de dépense du mois', error);
                });
        }
    }, [famille, familleChargee]);
    if (!familleChargee) {
        return (
            <div className="spinner-container" style={{'paddingRight':'80px'}}>
                <IonSpinner name="circular" />
            </div>
        );
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Dépénse mensuelle</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{depense} Ar</IonCardContent>
        </IonCard>
    );
};

export default Depense;
