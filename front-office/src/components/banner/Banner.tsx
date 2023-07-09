import React from 'react';
import './Banner.css';
import {IonButton, IonRow, IonCol} from "@ionic/react";
import { useHistory } from 'react-router-dom';


const Banner: React.FC = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/nouvelle-famille');
    };

    return (
        <div id="container">
            <IonRow>
                <IonCol size="12">
                    <h1>Bienvenue sur Family App</h1>
                </IonCol>
                <IonCol size="6">
                    <IonButton fill="outline" onClick={handleClick}>
                        Nouvelle Famille
                    </IonButton>
                </IonCol>
                <IonCol size="6">
                    <IonButton>
                        Se connecter
                    </IonButton>
                </IonCol>
            </IonRow>
        </div>
    );
};

export default Banner;
