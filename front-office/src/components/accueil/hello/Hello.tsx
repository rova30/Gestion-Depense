import React, {useEffect, useState} from 'react';
import './Hello.css';
import {
IonSpinner, IonIcon
} from "@ionic/react";
import {getMembreByToken, Membre} from "../../../data/membre.service";
import { getTotalEnCaisseParFamille } from '../../../data/famille.service';

const Hello: React.FC = () => {

    const [membre, setMembre] = useState<Membre>();
    const [membreChargee, setMembreChargee] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setMembre(response.data.membre);
                setMembreChargee(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);
    if (!membreChargee) {
        return (
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="dots" />
            </div>
        );
    }

    return (
            <div id="card-hello">
                <div id="content-hello">
                    <h3>Hello !</h3>
                    <h4>{membre?.prenom}&nbsp;{membre?.nom}</h4>
                </div>
            </div>
    );
};

export default Hello;
