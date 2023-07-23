import React from 'react';
import './Banner.css';
import {IonButton, IonRow, IonCol, IonImg, IonGrid} from "@ionic/react";
import { useHistory } from 'react-router-dom';

const Banner: React.FC = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/nouvelle-famille');
    };
    const handleLoginClick = () => {
        history.push('/login');
    };




    return (
        <div id="container">
            <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonImg src="assets/icon/SGN_07_19_2023_1689763150131.png"></IonImg>
                </IonCol>
                <IonCol size="6">
                    <IonButton fill="outline" onClick={handleClick} id="banner-button">
                        Nouvelle Famille
                    </IonButton>
                </IonCol>
                <IonCol size="6">
                    <IonButton onClick={handleLoginClick} id="banner-button">
                        Se connecter
                    </IonButton>
                </IonCol>
            </IonRow>
            </IonGrid>
        </div>
    );
};

export default Banner;
