import React, {useEffect, useState} from 'react';
import './Caisse.css';
import {
IonSpinner
} from "@ionic/react";
import {getMembreByToken} from "../../../data/membre.service";
import { getTotalEnCaisseParFamille } from '../../../data/famille.service';
import { formatAmount } from '../../../utils/Util';

const CaisseComponent: React.FC = () => {

    const [famille, setFamille] = useState(0);
    const [caisse, setCaisse] = useState(0);
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
            getTotalEnCaisseParFamille(famille)
                .then(response => {
                    setCaisse(response.data.caisse[0].montant_caisse_total);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de la caisse', error);
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


    return (
            <div id="card-caisse">
                <div id="content-caisse">
                    <h3>Caisse</h3>
                    <h4>Ar {formatAmount(caisse)}</h4>
                </div>
            </div>
    );
};

export default CaisseComponent;
