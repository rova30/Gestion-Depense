import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Accueil.css';
import Banner from "../../components/banner/Banner";

const Accueil: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Banner />
            </IonContent>
        </IonPage>
    );
};

export default Accueil;
