import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Bienvenue.css';
import Banner from "../../components/banner/Banner";

const Bienvenue: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Banner />
            </IonContent>
        </IonPage>
    );
};

export default Bienvenue;
