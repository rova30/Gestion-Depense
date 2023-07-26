import React, {useEffect, useState} from 'react';
import './Depense.css';
import {
IonSpinner
} from "@ionic/react";
import {getTotalDepenseDuMois} from "../../../data/depense.service";
import {getMembreByToken} from "../../../data/membre.service";
import {BiUpArrowCircle} from 'react-icons/bi';
const Depense: React.FC = () => {

    const [famille, setFamille] = useState(0);
    const [depense, setDepense] = useState(0);
    const [familleChargee, setFamilleChargee] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then((response: { data: { membre: { famille_id: React.SetStateAction<number>; }; }; }) => {
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
                    setDepense(parseFloat(response.data.depense[0].total_depense));
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de la total de dépense du mois', error);
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
            <div id="card-depense">
                <div id="content-depense">
                    <BiUpArrowCircle id="icon-depense"/>
                    <h4>Ar {depense.toLocaleString()}</h4>
                </div>
            </div>
    );
};

export default Depense;
