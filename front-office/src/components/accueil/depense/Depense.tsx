import React, {useEffect, useState} from 'react';
import './Depense.css';
import {
    IonCard,
    IonCardHeader,
    IonCardContent, IonSpinner, IonIcon
} from "@ionic/react";
import {getTotalDepenseDuMois} from "../../../data/depense.service";
import {getMembreByToken} from "../../../data/membre.service";
import { wallet} from 'ionicons/icons';

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
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="circular" />
            </div>
        );
    }

    return (
            <div id="card">
                    <div id="label-depense">
                        <IonIcon id="icon-depense" icon={wallet}></IonIcon>&nbsp;&nbsp;<h3>Dépenses du mois</h3>
                    </div>
                <div id="content-depense"><h4>{depense} Ar</h4></div>
            </div>
    );
};

export default Depense;
