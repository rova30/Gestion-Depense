import React, {useEffect, useState} from 'react';
import './Revenu.css';
import {
    IonSpinner, IonIcon
} from "@ionic/react";
import {getMembreByToken} from "../../../data/membre.service";
import {getTotalRevenuDuMois} from "../../../data/revenu.service";
import {BiDownArrowCircle} from 'react-icons/bi';


const Revenu: React.FC = () => {
    const [famille, setFamille] = useState(0);
    const [revenu, setRevenu] = useState(0);
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
                    setRevenu(parseFloat(response.data.revenu[0].total_revenu));
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du total de revenu du mois', error);
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
            <div id="card-revenu">
                <div id="content-revenu">
                    <BiDownArrowCircle id="icon-revenu"/>
                    <h4>Ar {revenu.toLocaleString()}</h4>
                </div>
            </div>
            
    );
};

export default Revenu;
